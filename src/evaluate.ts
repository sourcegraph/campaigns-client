import { requestGraphQL } from './sourcegraph'
import { createPatch } from 'diff'
import { ChangesetSpec } from './types/changeset_spec.schema'
import { getZipArchive } from './zipArchive'
import { evaluateOnCriteria } from './onCriteria'
import { FunctionalCampaignSpec } from '.'

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

export const evaluateCampaignSpec = async (campaignSpec: FunctionalCampaignSpec): Promise<ChangesetSpec[]> => {
    const repos = await evaluateOnCriteria(campaignSpec.on)

    const changesetSpecs: ChangesetSpec[] = (
        await Promise.all(
            repos.map(
                async ({ repository: repoName, branch }): Promise<ChangesetSpec | null> => {
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

                    const { fileFilter, editFile } = campaignSpec.steps[0]

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

                    if (filePatches.length === 0) {
                        return null
                    }

                    const changesetSpec: ChangesetSpec = {
                        title: campaignSpec.changesetTemplate.title,
                        body: campaignSpec.changesetTemplate.body || '',
                        baseRepository: repo.id,
                        baseRef: repo.defaultBranch.name,
                        baseRev: repo.defaultBranch.target.oid,
                        headRepository: repo.id,
                        headRef: `refs/heads/${campaignSpec.changesetTemplate.branch}`,
                        published: false,
                        commits: [
                            {
                                message: campaignSpec.changesetTemplate.commit.message,
                                authorName: campaignSpec.changesetTemplate.commit.author.name,
                                authorEmail: campaignSpec.changesetTemplate.commit.author.email,
                                diff: filePatches.filter(p => p !== null).join(''),
                            },
                        ],
                    }
                    return changesetSpec
                }
            )
        )
    ).filter((c): c is ChangesetSpec => !!c)
    return changesetSpecs
}
