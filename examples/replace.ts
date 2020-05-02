/**
 * Run with:
 *
 * TS_NODE_COMPILER_OPTIONS='{"module":"commonjs"}' NODE_OPTIONS='--use-openssl-ca' SOURCEGRAPH_URL=https://sourcegraph.test:3443 SOURCEGRAPH_TOKEN=token ts-node -T examples/replace.ts
 */

import { executeCampaign } from '../src'

const main = async (): Promise<void> => {
    const REPO = 'github.com/sqs-test/my-sample-repo-1'

    const previewURL = await executeCampaign(
        [REPO],
        path => path.endsWith('.md'),
        (_path, text) => text.replace(/[ae]/g, 'x')
    )
    console.log(previewURL)
}
main().catch(err => {
    console.error(err)
    process.exit(1)
})
