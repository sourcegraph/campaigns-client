interface SuccessGraphQLResult<T extends GQL.IQuery | GQL.IMutation> {
    data: T
    errors: undefined
}

interface ErrorGraphQLResult {
    data: undefined
    errors: GQL.IGraphQLResponseError[]
}

type GraphQLResult<T extends GQL.IQuery | GQL.IMutation> = SuccessGraphQLResult<T> | ErrorGraphQLResult

interface ErrorLike {
    message: string
    name?: string
}

const isErrorLike = (val: unknown): val is ErrorLike =>
    typeof val === 'object' && val !== null && ('stack' in val || 'message' in val) && !('__typename' in val)

/**
 * Converts an ErrorLike to a proper Error if needed, copying all properties
 *
 * @param value An Error, object with ErrorLike properties, or other value.
 */
const asError = (value: unknown): Error => {
    if (value instanceof Error) {
        return value
    }
    if (isErrorLike(value)) {
        return Object.assign(new Error(value.message), value)
    }
    return new Error(String(value))
}

/**
 * Creates an aggregate error out of multiple provided error likes
 *
 * @param errors The errors or ErrorLikes to aggregate
 */
const createAggregateError = (errors: ErrorLike[] = []): Error =>
    errors.length === 1
        ? asError(errors[0])
        : Object.assign(new Error(errors.map(e => e.message).join('\n')), {
              name: 'AggregateError' as const,
              errors: errors.map(asError),
          })

function isErrorGraphQLResult<T extends GQL.IQuery | GQL.IMutation>(
    result: GraphQLResult<T>
): result is ErrorGraphQLResult {
    return !!(result as ErrorGraphQLResult).errors && (result as ErrorGraphQLResult).errors.length > 0
}

function dataOrThrowErrors<T extends GQL.IQuery | GQL.IMutation>(result: GraphQLResult<T>): T {
    if (isErrorGraphQLResult(result)) {
        throw createAggregateError(result.errors)
    }
    return result.data
}

export const SOURCEGRAPH_URL = (process.env.SOURCEGRAPH_URL || 'https://sourcegraph.com').replace(/\/$/, '')
export const SOURCEGRAPH_AUTH_HEADERS: HeadersInit = process.env.SOURCEGRAPH_TOKEN
    ? {
          Authorization: `token ${process.env.SOURCEGRAPH_TOKEN || ''}`,
      }
    : {}

type RequestGraphQL = (query: string, variables: { [name: string]: unknown }) => Promise<unknown>
let extensionHostRequestGraphQL: RequestGraphQL
try {
    /* eslint-disable @typescript-eslint/no-var-requires */
    /* eslint-disable @typescript-eslint/no-require-imports */
    const sourcegraph = require('sourcegraph')
    /* eslint-enable @typescript-eslint/no-var-requires */
    /* eslint-enable @typescript-eslint/no-require-imports */
    extensionHostRequestGraphQL = (query, variables) =>
        sourcegraph.commands.executeCommand('queryGraphQL', query, variables)
} catch (err) {
    /* noop */
}

const nodeRequestGraphQL: RequestGraphQL = async (query, variables) => {
    const resp = await fetch(`${SOURCEGRAPH_URL}/.api/graphql`, {
        method: 'POST',
        headers: {
            ...SOURCEGRAPH_AUTH_HEADERS,
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ query, variables }),
    })
    if (resp.ok) {
        return resp.json() as Promise<unknown>
    }
    throw new Error(`HTTP ${resp.status} from GraphQL request`)
}

export const requestGraphQL = async <T extends GQL.IQuery | GQL.IMutation>(
    query: string,
    variables: { [name: string]: unknown }
): Promise<T> => {
    const result = (await (extensionHostRequestGraphQL || nodeRequestGraphQL)(query, variables)) as GraphQLResult<T>
    return dataOrThrowErrors<T>(result)
}
