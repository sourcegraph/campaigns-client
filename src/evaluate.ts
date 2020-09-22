import { requestGraphQL } from './sourcegraph'
import { createPatch } from 'diff'
import { createCampaignSpec } from './api'
import { ChangesetSpec } from './types/changeset_spec.schema'
import { CampaignSpec, OnQueryOrRepository, OnRepository } from './types/campaign_spec.schema'
import { getZipArchive } from './zipArchive'
import { evaluateOnCriteria, repositoriesMatchingQuery } from './onCriteria'

const getRepository = async (repositoryName: string): Promise<GQL.IRepository | null> =>
    (
        await requestGraphQL<GQL.IQuery>(
            `
query GetRepository($repositoryName: String!) {
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

export const evaluateCampaignSpec = async (
    campaignSpec: CampaignSpec,
    fileFilter: (path: string) => boolean,
    editFile: (path: string, text: string) => string | null
): Promise<ChangesetSpec[]> => {
    const repos = await evaluateOnCriteria(campaignSpec.on)

    const changesetSpecs: ChangesetSpec[] = await Promise.all(
        repos.map(async ({ repository: repoName, branch }) => {
            // TODO(sqs): support branch
            if (branch) {
                // TODO
            }
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

            const changesetSpec: ChangesetSpec = {
                title: 'TODO',
                body: 'TODO',
                baseRepository: repo.id,
                baseRef: repo.defaultBranch.name,
                baseRev: repo.defaultBranch.target.oid,
                headRepository: repo.id,
                headRef: 'TODO',
                published: false,
                commits: [
                    {
                        message: 'TODO',
                        authorName: 'TODO',
                        authorEmail: 'TODO',
                        diff: filePatches.filter(p => p !== null).join('\n'),
                    },
                ],
            }
            return changesetSpec
        })
    )

    const { applyURL } = await createCampaignSpec({ namespaceName: 'TODO', campaignSpec, changesetSpecs })
    return applyURL
}
