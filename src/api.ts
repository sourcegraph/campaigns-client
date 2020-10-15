import { requestGraphQL } from './sourcegraph'
import { CampaignSpec } from './types/campaign_spec.schema'
import { ChangesetSpec } from './types/changeset_spec.schema'

type GQLID = string

export const createCampaignSpec = async ({
    namespaceName,
    campaignSpec,
    changesetSpecs,
}: {
    namespaceName: string
    campaignSpec: CampaignSpec
    changesetSpecs: ChangesetSpec[]
}): Promise<Pick<GQL.ICampaignSpec, 'id' | 'applyURL' | 'diffStat'>> => {
    const namespace = (
        await requestGraphQL<GQL.IQuery & { namespaceByName: null | { id: GQLID } }>(
            `
        query NamespaceByName($name: String!) {
            namespaceByName(name: $name) {
                id
            }
        }`,
            { name: namespaceName }
        )
    ).namespaceByName?.id
    if (!namespace) {
        throw new Error(`namespace not found: ${JSON.stringify(namespaceName)}`)
    }

    const changesetSpecIDs = await Promise.all(
        changesetSpecs.map(
            async changesetSpec =>
                (
                    await requestGraphQL<GQL.IMutation>(
                        `
        mutation CreateChangesetSpec($changesetSpec: String!) {
            createChangesetSpec(changesetSpec: $changesetSpec) {
                ... on HiddenChangesetSpec { id }
                ... on VisibleChangesetSpec { id }
            }
        }`,
                        { changesetSpec: JSON.stringify(changesetSpec) }
                    )
                ).createChangesetSpec.id
        )
    )

    return (
        await requestGraphQL<GQL.IMutation>(
            `
    mutation CreateCampaignSpec($namespace: ID!, $campaignSpec: String!, $changesetSpecs: [ID!]!) {
        createCampaignSpec(namespace: $namespace, campaignSpec: $campaignSpec, changesetSpecs: $changesetSpecs) {
            id
            applyURL
            diffStat {
                added
                changed
                deleted
            }
        }
    }`,
            { namespace, campaignSpec: JSON.stringify(campaignSpec), changesetSpecs: changesetSpecIDs }
        )
    ).createCampaignSpec
}
