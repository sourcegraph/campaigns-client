import { requestGraphQL } from './sourcegraph'
import { CampaignSpec, OnQueryOrRepository, OnRepository } from './types/campaign_spec.schema'

const uniqueRepositoryBranches = (all: OnRepository[]): OnRepository[] => {
    const uniq = new Map<string, OnRepository>(all.map(e => [e.repository + ':' + e.branch, e]))
    return Array.from(uniq.values())
}

const repositoriesMatchingQuery = async (query: string): Promise<OnRepository[]> => {
    const results =
        (
            await requestGraphQL<GQL.IQuery>(
                `
    query FindMatches($query: String!) {
        search(query: $query, version: V2) {
            results {
                results {
                    __typename
                    ... on FileMatch {
                        repository {
                            name
                            defaultBranch {
                                name
                            }
                        }
                    }
                }
            }
        }
    }`,
                { query }
            )
        ).search?.results.results || []

    // TODO(sqs): actually use the revspec of the search result, not the repo's default branch

    const all: OnRepository[] = results
        .filter((m): m is GQL.IFileMatch => m.__typename === 'FileMatch')
        .map(m => ({ repository: m.repository.name, branch: m.repository.defaultBranch?.name }))
    return uniqueRepositoryBranches(all)
}

const isOnRepository = (on: OnQueryOrRepository): on is OnRepository => 'repository' in on

export const evaluateOnCriteria = async (onEntries: CampaignSpec['on']): Promise<OnRepository[]> => {
    if (!onEntries) {
        throw new Error('campaign spec must have exactly 1 "on" entry')
    }
    const all = await Promise.all(
        onEntries.map(async on =>
            isOnRepository(on) ? [on] : await repositoriesMatchingQuery(on.repositoriesMatchingQuery)
        )
    )
    return uniqueRepositoryBranches(all.flat())
}
