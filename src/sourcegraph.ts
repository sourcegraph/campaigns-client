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

export const requestGraphQL = async <T extends GQL.IQuery | GQL.IMutation>(
    query: string,
    variables: { [name: string]: unknown }
): Promise<T> => {
    const resp = await fetch('https://sourcegraph.com/.api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({ query, variables }),
    })
    if (resp.ok) {
        const result: GraphQLResult<T> = await resp.json()
        return dataOrThrowErrors<T>(result)
    }
    throw new Error(`HTTP ${resp.status} from GraphQL request`)
}
