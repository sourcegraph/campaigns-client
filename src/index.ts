import { requestGraphQL, SOURCEGRAPH_AUTH_HEADERS } from './sourcegraph'
import 'isomorphic-fetch'
import JSZip from 'jszip'
import { createPatch } from 'diff'
import { createPatchSet } from './patchSet'

const getRepository = async (repositoryName: string): Promise<GQL.IRepository | null> =>
    (
        await requestGraphQL<GQL.IQuery>(
            `
query GetRepositoryId($repositoryName: String!) {
    repository(name: $repositoryName) {
        id
        defaultBranch {
            name
            target {
                oid
                commit {
                    tree {
                        rawZipArchiveURL
                    }
                }
            }
        }
    }
}`,
            { repositoryName }
        )
    ).repository

const getZipArchive = async (zipArchiveURL: string): Promise<JSZip> => {
    const resp = await fetch(zipArchiveURL, {
        headers: {
            ...SOURCEGRAPH_AUTH_HEADERS,
            Accept: 'application/zip',
        },
    })
    if (!resp.ok) {
        throw new Error(`HTTP ${resp.status} for ${zipArchiveURL}`)
    }

    const isBrowser = typeof window !== 'undefined' || typeof importScripts !== 'undefined'
    const nodeBuffer = await (isBrowser ? resp.blob() : (resp as any).buffer())
    const jszip = new JSZip()
    return jszip.loadAsync(nodeBuffer)
}

export const executeCampaign = async (
    repoNames: string[],
    fileFilter: (path: string) => boolean,
    editFile: (path: string, text: string) => string | null
): Promise<string> => {
    const patches: GQL.IPatchInput[] = await Promise.all(
        repoNames.map(async repoName => {
            const repo = await getRepository(repoName)
            if (!repo) {
                throw new Error('repo not found')
            }
            if (!repo.defaultBranch) {
                throw new Error('repo has no default branch')
            }

            const rawZipArchiveURL = repo.defaultBranch.target.commit?.tree?.rawZipArchiveURL
            if (!rawZipArchiveURL) {
                throw new Error('no raw archive URL')
            }
            const archive = await getZipArchive(rawZipArchiveURL)

            // Make edits.
            const filePatches = await Promise.all(
                archive
                    .filter((path, obj) => !obj.dir && fileFilter(path))
                    .map(async obj => {
                        const oldText = await obj.async('text')
                        const newText = editFile(obj.name, oldText)
                        if (newText === null) {
                            return null
                        }
                        return createPatch(obj.name, oldText, newText)
                    })
            )
            return {
                repository: repo.id,
                baseRef: repo.defaultBranch.name,
                baseRevision: repo.defaultBranch.target.oid,
                patch: filePatches.filter(p => p !== null).join('\n'),
            }
        })
    )

    const { previewURL } = await createPatchSet(patches)
    return previewURL
}
