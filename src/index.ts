import { CampaignSpec, GitCommitAuthor } from './types/campaign_spec.schema'
import { evaluateCampaignSpec } from './evaluate'
import { createCampaignSpec } from './api'

/**
 * A campaign spec, except with JavaScript functions instead of Docker/command steps.
 */
export interface FunctionalCampaignSpec
    extends Required<Pick<CampaignSpec, 'name' | 'description' | 'on' | 'changesetTemplate'>> {
    steps: [FunctionalStep]
    changesetTemplate: Required<CampaignSpec>['changesetTemplate'] & {
        commit: { author: GitCommitAuthor }
    }
}

export interface FunctionalStep {
    fileFilter: (path: string) => boolean
    editFile: (path: string, text: string) => string | null
}

export const evaluateAndCreateCampaignSpec = async (
    namespaceName: string,
    campaignSpec: FunctionalCampaignSpec
): Promise<Pick<GQL.ICampaignSpec, 'id' | 'applyURL' | 'diffStat'>> => {
    const changesetSpecs = await evaluateCampaignSpec(campaignSpec)
    return createCampaignSpec({
        namespaceName,
        campaignSpec: {
            ...campaignSpec,
            steps: [{ container: 'sourcegraph/campaigns-client', run: '# (JavaScript function)' }],
        },
        changesetSpecs,
    })
}
