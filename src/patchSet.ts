import { requestGraphQL } from './sourcegraph'

export const createPatchSet = async (patches: GQL.IPatchInput[]): Promise<Pick<GQL.IPatchSet, 'id' | 'previewURL'>> =>
    (
        await requestGraphQL<GQL.IMutation>(
            `
    mutation CreatePatchSet($patches: [PatchInput!]!) {
        createPatchSetFromPatches(patches: $patches) {
            id
            previewURL
        }
    }`,
            { patches }
        )
    ).createPatchSetFromPatches
