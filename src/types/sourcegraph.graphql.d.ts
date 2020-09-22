// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  /**
   * A query.
   */
  interface IQuery {
    __typename: 'Query';

    /**
     * The root of the query.
     * @deprecated "this will be removed."
     */
    root: IQuery;

    /**
     * Looks up a node by ID.
     */
    node: Node | null;

    /**
     * A list of campaigns.
     */
    campaigns: ICampaignConnection;

    /**
     * Looks up a campaign by namespace and campaign name.
     */
    campaign: ICampaign | null;

    /**
     * Looks up a repository by either name or cloneURL.
     */
    repository: IRepository | null;

    /**
     * Looks up a repository by either name or cloneURL. When the repository does not exist on the server
     * and "disablePublicRepoRedirects" is "false" in the site configuration, it returns a Redirect to
     * an external Sourcegraph URL that may have this repository instead. Otherwise, this query returns
     * null.
     */
    repositoryRedirect: RepositoryRedirect | null;

    /**
     * Lists external services under given namespace.
     * If no namespace is given, it returns all external services.
     */
    externalServices: IExternalServiceConnection;

    /**
     * List all repositories.
     */
    repositories: IRepositoryConnection;

    /**
     * Looks up a Phabricator repository by name.
     */
    phabricatorRepo: IPhabricatorRepo | null;

    /**
     * The current user.
     */
    currentUser: IUser | null;

    /**
     * Looks up a user by username or email address.
     */
    user: IUser | null;

    /**
     * List all users.
     */
    users: IUserConnection;

    /**
     * Looks up an organization by name.
     */
    organization: IOrg | null;

    /**
     * List all organizations.
     */
    organizations: IOrgConnection;

    /**
     * Renders Markdown to HTML. The returned HTML is already sanitized and
     * escaped and thus is always safe to render.
     */
    renderMarkdown: string;

    /**
     * EXPERIMENTAL: Syntax highlights a code string.
     */
    highlightCode: string;

    /**
     * Looks up an instance of a type that implements SettingsSubject (i.e., something that has settings). This can
     * be a site (which has global settings), an organization, or a user.
     */
    settingsSubject: SettingsSubject | null;

    /**
     * The settings for the viewer. The viewer is either an anonymous visitor (in which case viewer settings is
     * global settings) or an authenticated user (in which case viewer settings are the user's settings).
     */
    viewerSettings: ISettingsCascade;

    /**
     * DEPRECATED
     * @deprecated "use viewerSettings instead"
     */
    viewerConfiguration: IConfigurationCascade;

    /**
     * The configuration for clients.
     */
    clientConfiguration: IClientConfigurationDetails;

    /**
     * Fetch search filter suggestions for autocompletion.
     */
    searchFilterSuggestions: ISearchFilterSuggestions;

    /**
     * Runs a search.
     */
    search: ISearch | null;

    /**
     * All saved searches configured for the current user, merged from all configurations.
     */
    savedSearches: Array<ISavedSearch>;

    /**
     * All repository groups for the current user, merged from all configurations.
     */
    repoGroups: Array<IRepoGroup>;

    /**
     * (experimental) All version contexts.
     */
    versionContexts: Array<IVersionContext>;

    /**
     * (experimental) Return the parse tree of a search query.
     */
    parseSearchQuery: any | null;

    /**
     * The current site.
     */
    site: ISite;

    /**
     * Retrieve responses to surveys.
     */
    surveyResponses: ISurveyResponseConnection;

    /**
     * The extension registry.
     */
    extensionRegistry: IExtensionRegistry;

    /**
     * Queries that are only used on Sourcegraph.com.
     *
     * FOR INTERNAL USE ONLY.
     */
    dotcom: IDotcomQuery;

    /**
     * FOR INTERNAL USE ONLY: Lists all status messages
     */
    statusMessages: Array<StatusMessage>;

    /**
     * Look up a namespace by ID.
     */
    namespace: Namespace | null;

    /**
     * The repositories a user is authorized to access with the given permission.
     * This isn’t defined in the User type because we store permissions for users
     * that don’t yet exist (i.e. late binding). Only one of "username" or "email"
     * is required to identify a user.
     */
    authorizedUserRepositories: IRepositoryConnection;

    /**
     * Returns a list of usernames or emails that have associated pending permissions.
     * The returned list can be used to query authorizedUserRepositories for pending permissions.
     */
    usersWithPendingPermissions: Array<string>;

    /**
     * (experimental) The LSIF API may change substantially in the near future as we
     * continue to adjust it for our use cases. Changes will not be documented in the
     * CHANGELOG during this time.
     * The repository's LSIF uploads.
     */
    lsifUploads: ILSIFUploadConnection;

    /**
     * (experimental) The LSIF API may change substantially in the near future as we
     * continue to adjust it for our use cases. Changes will not be documented in the
     * CHANGELOG during this time.
     * The repository's LSIF uploads.
     */
    lsifIndexes: ILSIFIndexConnection;
  }

  interface INodeOnQueryArguments {
    id: string;
  }

  interface ICampaignsOnQueryArguments {
    /**
     * Returns the first n campaigns from the list.
     * @default 50
     */
    first?: number | null;

    /**
     * Opaque pagination cursor.
     */
    after?: string | null;

    /**
     * Only return campaigns in this state.
     */
    state?: CampaignState | null;

    /**
     * Only include campaigns that the viewer can administer.
     */
    viewerCanAdminister?: boolean | null;
  }

  interface ICampaignOnQueryArguments {
    /**
     * The namespace where the campaign lives.
     */
    namespace: string;

    /**
     * The campaigns name.
     */
    name: string;
  }

  interface IRepositoryOnQueryArguments {
    /**
     * Query the repository by name, for example "github.com/gorilla/mux".
     */
    name?: string | null;

    /**
     * Query the repository by a Git clone URL (format documented here: https://git-scm.com/docs/git-clone_git_urls_a_id_urls_a)
     * by checking for a code host configuration that matches the clone URL.
     * Will not actually check the code host to see if the repository actually exists.
     */
    cloneURL?: string | null;

    /**
     * An alias for name. DEPRECATED: use name instead.
     */
    uri?: string | null;
  }

  interface IRepositoryRedirectOnQueryArguments {
    /**
     * Query the repository by name, for example "github.com/gorilla/mux".
     */
    name?: string | null;

    /**
     * Query the repository by a Git clone URL (format documented here: https://git-scm.com/docs/git-clone_git_urls_a_id_urls_a)
     * by checking for a code host configuration that matches the clone URL.
     * Will not actually check the code host to see if the repository actually exists.
     */
    cloneURL?: string | null;
  }

  interface IExternalServicesOnQueryArguments {
    /**
     * The namespace to scope returned external services.
     * Currently, this can only be used for a user.
     */
    namespace?: string | null;

    /**
     * Returns the first n external services from the list.
     */
    first?: number | null;

    /**
     * Opaque pagination cursor.
     */
    after?: string | null;
  }

  interface IRepositoriesOnQueryArguments {
    /**
     * Returns the first n repositories from the list.
     */
    first?: number | null;

    /**
     * Return repositories whose names match the query.
     */
    query?: string | null;

    /**
     * Return repositories whose names are in the list.
     */
    names?: Array<string> | null;

    /**
     * Include cloned repositories.
     * @default true
     */
    cloned?: boolean | null;

    /**
     * Include repositories that are not yet cloned and for which cloning is not in progress.
     * @default true
     */
    notCloned?: boolean | null;

    /**
     * Include repositories that have a text search index.
     * @default true
     */
    indexed?: boolean | null;

    /**
     * Include repositories that do not have a text search index.
     * @default true
     */
    notIndexed?: boolean | null;

    /**
     * Sort field.
     * @default "REPOSITORY_NAME"
     */
    orderBy?: RepositoryOrderBy | null;

    /**
     * Sort direction.
     * @default false
     */
    descending?: boolean | null;
  }

  interface IPhabricatorRepoOnQueryArguments {
    /**
     * The name, for example "github.com/gorilla/mux".
     */
    name?: string | null;

    /**
     * An alias for name. DEPRECATED: use name instead.
     */
    uri?: string | null;
  }

  interface IUserOnQueryArguments {
    /**
     * Query the user by username.
     */
    username?: string | null;

    /**
     * Query the user by verified email address.
     */
    email?: string | null;
  }

  interface IUsersOnQueryArguments {
    /**
     * Returns the first n users from the list.
     */
    first?: number | null;

    /**
     * Return users whose usernames or display names match the query.
     */
    query?: string | null;

    /**
     * Return only users with the given tag.
     */
    tag?: string | null;

    /**
     * Returns users who have been active in a given period of time.
     */
    activePeriod?: UserActivePeriod | null;
  }

  interface IOrganizationOnQueryArguments {
    name: string;
  }

  interface IOrganizationsOnQueryArguments {
    /**
     * Returns the first n organizations from the list.
     */
    first?: number | null;

    /**
     * Return organizations whose names or display names match the query.
     */
    query?: string | null;
  }

  interface IRenderMarkdownOnQueryArguments {
    markdown: string;
    options?: IMarkdownOptions | null;
  }

  interface IHighlightCodeOnQueryArguments {
    code: string;
    fuzzyLanguage: string;
    disableTimeout: boolean;
    isLightTheme: boolean;
  }

  interface ISettingsSubjectOnQueryArguments {
    id: string;
  }

  interface ISearchOnQueryArguments {
    /**
     * The version of the search syntax being used.
     * All new clients should use the latest version.
     * @default "V1"
     */
    version?: SearchVersion | null;

    /**
     * PatternType controls the search pattern type, if and only if it is not specified in the query string using
     * the patternType: field.
     */
    patternType?: SearchPatternType | null;

    /**
     * The search query (such as "foo" or "repo:myrepo foo").
     * @default ""
     */
    query?: string | null;

    /**
     * (experimental) Optionally specify the versionContext. If not specified the
     * default version context is used (all repositories on the default branch).
     */
    versionContext?: string | null;

    /**
     * (experimental) Sourcegraph 3.9 added support for cursor-based paginated
     * search requests when this field is specified. For details, see
     * https://docs.sourcegraph.com/api/graphql/search
     *
     * When specified, indicates that this request should be paginated and
     * to fetch results starting at this cursor.
     *
     * A future request can be made for more results by passing in the
     * 'SearchResults.pageInfo.endCursor' that is returned.
     */
    after?: string | null;

    /**
     * (experimental) Sourcegraph 3.9 added support for cursor-based paginated
     * search requests when this field is specified. For details, see
     * https://docs.sourcegraph.com/api/graphql/search
     *
     * When specified, indicates that this request should be paginated and
     * the first N results (relative to the cursor) should be returned. i.e.
     * how many results to return per page. It must be in the range of 0-5000.
     */
    first?: number | null;
  }

  interface IParseSearchQueryOnQueryArguments {
    /**
     * The search query (such as "repo:myrepo foo").
     * @default ""
     */
    query?: string | null;

    /**
     * The parser to use for this query.
     * @default "literal"
     */
    patternType?: SearchPatternType | null;
  }

  interface ISurveyResponsesOnQueryArguments {
    /**
     * Returns the first n survey responses from the list.
     */
    first?: number | null;
  }

  interface INamespaceOnQueryArguments {
    id: string;
  }

  interface IAuthorizedUserRepositoriesOnQueryArguments {
    /**
     * The username.
     */
    username?: string | null;

    /**
     * One of the email addresses.
     */
    email?: string | null;

    /**
     * Permission that the user has on the repositories.
     * @default "READ"
     */
    perm?: RepositoryPermission | null;

    /**
     * Number of repositories to return after the given cursor.
     */
    first: number;

    /**
     * Opaque pagination cursor.
     */
    after?: string | null;
  }

  interface ILsifUploadsOnQueryArguments {
    /**
     * An (optional) search query that searches over the state, repository name,
     * commit, root, and indexer properties.
     */
    query?: string | null;

    /**
     * The state of returned uploads.
     */
    state?: LSIFUploadState | null;

    /**
     * When specified, shows only uploads that are latest for the given repository.
     */
    isLatestForRepo?: boolean | null;

    /**
     * When specified, indicates that this request should be paginated and
     * the first N results (relative to the cursor) should be returned. i.e.
     * how many results to return per page. It must be in the range of 0-5000.
     */
    first?: number | null;

    /**
     * When specified, indicates that this request should be paginated and
     * to fetch results starting at this cursor.
     *
     * A future request can be made for more results by passing in the
     * 'LSIFUploadConnection.pageInfo.endCursor' that is returned.
     */
    after?: string | null;
  }

  interface ILsifIndexesOnQueryArguments {
    /**
     * An (optional) search query that searches over the state, repository name,
     * and commit properties.
     */
    query?: string | null;

    /**
     * The state of returned uploads.
     */
    state?: LSIFIndexState | null;

    /**
     * When specified, indicates that this request should be paginated and
     * the first N results (relative to the cursor) should be returned. i.e.
     * how many results to return per page. It must be in the range of 0-5000.
     */
    first?: number | null;

    /**
     * When specified, indicates that this request should be paginated and
     * to fetch results starting at this cursor.
     * A future request can be made for more results by passing in the
     * 'LSIFIndexConnection.pageInfo.endCursor' that is returned.
     */
    after?: string | null;
  }

  /**
   * An object with an ID.
   */
  type Node =
    | ICampaign
    | IUser
    | IOrg
    | IOrganizationInvitation
    | IAccessToken
    | IExternalAccount
    | ICampaignSpec
    | IRepository
    | IGitCommit
    | IExternalService
    | IGitRef
    | ILSIFUpload
    | ILSIFIndex
    | ISavedSearch
    | IVersionContext
    | IRegistryExtension
    | IProductSubscription
    | IProductLicense
    | IChangesetEvent
    | IExternalChangeset
    | IVisibleChangesetSpec
    | IHiddenChangesetSpec
    | IHiddenExternalChangeset;

  /**
   * An object with an ID.
   */
  interface INode {
    __typename: 'Node';

    /**
     * The ID of the node.
     */
    id: string;
  }

  /**
   * The state of the campaign
   */
  const enum CampaignState {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
  }

  /**
   * A list of campaigns.
   */
  interface ICampaignConnection {
    __typename: 'CampaignConnection';

    /**
     * A list of campaigns.
     */
    nodes: Array<ICampaign>;

    /**
     * The total number of campaigns in the connection.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * A campaign is a set of related changes to apply to code across one or more repositories.
   */
  interface ICampaign {
    __typename: 'Campaign';

    /**
     * The unique ID for the campaign.
     */
    id: string;

    /**
     * The namespace where this campaign is defined.
     */
    namespace: Namespace;

    /**
     * The name of the campaign.
     */
    name: string;

    /**
     * The description (as Markdown).
     */
    description: string | null;

    /**
     * The user that created the initial spec. In an org, this will be different from the namespace, or null if the user was deleted.
     */
    specCreator: IUser | null;

    /**
     * The user who created the campaign initially by applying the spec for the first time, or null if the user was deleted.
     */
    initialApplier: IUser | null;

    /**
     * The user who last updated the campaign by applying a spec to this campaign.
     * If the campaign hasn't been updated, the lastApplier is the initialApplier, or null if the user was deleted.
     */
    lastApplier: IUser | null;

    /**
     * Whether the current user can edit or delete this campaign.
     */
    viewerCanAdminister: boolean;

    /**
     * The URL to this campaign.
     */
    url: string;

    /**
     * The date and time when the campaign was created.
     */
    createdAt: any;

    /**
     * The date and time when the campaign was updated. That can be by applying a spec, or by an internal process.
     * For reading the time the campaign spec was changed last, see lastAppliedAt.
     */
    updatedAt: any;

    /**
     * The date and time when the campaign was last updated with a new spec.
     */
    lastAppliedAt: any;

    /**
     * The date and time when the campaign was closed. If set, applying a spec for this campaign will fail with an error.
     */
    closedAt: any | null;

    /**
     * The changesets in this campaign that already exist on the code host.
     */
    changesets: IChangesetConnection;

    /**
     * The changeset counts over time, in 1-day intervals backwards from the point in time given in
     * the "to" parameter.
     */
    changesetCountsOverTime: Array<IChangesetCounts>;

    /**
     * The diff stat for all the changesets in the campaign.
     */
    diffStat: IDiffStat;

    /**
     * The current campaign spec this campaign reflects.
     */
    currentSpec: ICampaignSpec;
  }

  interface IChangesetsOnCampaignArguments {
    /**
     * @default 50
     */
    first?: number | null;

    /**
     * Opaque pagination cursor.
     */
    after?: string | null;

    /**
     * Only include changesets with any of the given reconciler states.
     */
    reconcilerState?: Array<ChangesetReconcilerState> | null;

    /**
     * Only include changesets with the given publication state.
     */
    publicationState?: ChangesetPublicationState | null;

    /**
     * Only include changesets with the given external state.
     */
    externalState?: ChangesetExternalState | null;

    /**
     * Only include changesets with the given review state.
     */
    reviewState?: ChangesetReviewState | null;

    /**
     * Only include changesets with the given check state.
     */
    checkState?: ChangesetCheckState | null;

    /**
     * Only return changesets that have been published by this campaign. Imported changesets will be omitted.
     */
    onlyPublishedByThisCampaign?: boolean | null;
  }

  interface IChangesetCountsOverTimeOnCampaignArguments {
    /**
     * Only include changeset counts up to this point in time (inclusive). Defaults to Campaign.createdAt.
     */
    from?: any | null;

    /**
     * Only include changeset counts up to this point in time (inclusive). Defaults to the
     * current time.
     */
    to?: any | null;
  }

  /**
   * A namespace is a container for certain types of data and settings, such as a user or organization.
   */
  type Namespace = IUser | IOrg;

  /**
   * A namespace is a container for certain types of data and settings, such as a user or organization.
   */
  interface INamespace {
    __typename: 'Namespace';

    /**
     * The globally unique ID of this namespace.
     */
    id: string;

    /**
     * The name of this namespace's component. For a user, this is the username. For an organization,
     * this is the organization name.
     */
    namespaceName: string;

    /**
     * The URL to this namespace.
     */
    url: string;
  }

  /**
   * A user.
   */
  interface IUser {
    __typename: 'User';

    /**
     * The unique ID for the user.
     */
    id: string;

    /**
     * The user's username.
     */
    username: string;

    /**
     * The user's primary email address.
     * Only the user and site admins can access this field.
     * @deprecated "use emails instead"
     */
    email: string;

    /**
     * The display name chosen by the user.
     */
    displayName: string | null;

    /**
     * The URL of the user's avatar image.
     */
    avatarURL: string | null;

    /**
     * The URL to the user's profile on Sourcegraph.
     */
    url: string;

    /**
     * The URL to the user's settings.
     */
    settingsURL: string | null;

    /**
     * The date when the user account was created on Sourcegraph.
     */
    createdAt: any;

    /**
     * The date when the user account was last updated on Sourcegraph.
     */
    updatedAt: any | null;

    /**
     * Whether the user is a site admin.
     * Only the user and site admins can access this field.
     */
    siteAdmin: boolean;

    /**
     * Whether the user account uses built in auth.
     */
    builtinAuth: boolean;

    /**
     * The latest settings for the user.
     * Only the user and site admins can access this field.
     */
    latestSettings: ISettings | null;

    /**
     * All settings for this user, and the individual levels in the settings cascade (global > organization > user)
     * that were merged to produce the final merged settings.
     * Only the user and site admins can access this field.
     */
    settingsCascade: ISettingsCascade;

    /**
     * DEPRECATED
     * @deprecated "Use settingsCascade instead. This field is a deprecated alias for it and will be removed in a future release."
     */
    configurationCascade: IConfigurationCascade;

    /**
     * The organizations that this user is a member of.
     */
    organizations: IOrgConnection;

    /**
     * This user's organization memberships.
     */
    organizationMemberships: IOrganizationMembershipConnection;

    /**
     * Tags associated with the user. These are used for internal site management and feature selection.
     * Only the user and site admins can access this field.
     */
    tags: Array<string>;

    /**
     * The user's usage statistics on Sourcegraph.
     */
    usageStatistics: IUserUsageStatistics;

    /**
     * The user's events on Sourcegraph.
     */
    eventLogs: IEventLogsConnection;

    /**
     * The user's email addresses.
     * Only the user and site admins can access this field.
     */
    emails: Array<IUserEmail>;

    /**
     * The user's access tokens (which grant to the holder the privileges of the user). This consists
     * of all access tokens whose subject is this user.
     * Only the user and site admins can access this field.
     */
    accessTokens: IAccessTokenConnection;

    /**
     * A list of external accounts that are associated with the user.
     */
    externalAccounts: IExternalAccountConnection;

    /**
     * The user's currently active session.
     * Only the currently authenticated user can access this field. Site admins are not able to access sessions for
     * other users.
     */
    session: ISession;

    /**
     * Whether the viewer has admin privileges on this user. The user has admin privileges on their own user, and
     * site admins have admin privileges on all users.
     */
    viewerCanAdminister: boolean;

    /**
     * Whether the viewer can change the username of this user.
     * The user can change their username unless auth.disableUsernameChanges is set.
     * Site admins can always change the username of any user.
     */
    viewerCanChangeUsername: boolean;

    /**
     * The user's survey responses.
     * Only the user and site admins can access this field.
     */
    surveyResponses: Array<ISurveyResponse>;

    /**
     * The URL to view this user's customer information (for Sourcegraph.com site admins).
     * Only Sourcegraph.com site admins may query this field.
     * FOR INTERNAL USE ONLY.
     */
    urlForSiteAdminBilling: string | null;

    /**
     * The unique numeric ID for the user.
     * FOR INTERNAL USE ONLY.
     */
    databaseID: number;

    /**
     * The name of this user namespace's component. For users, this is the username.
     */
    namespaceName: string;

    /**
     * The permissions information of the user over repositories.
     * It is null when there is no permissions data stored for the user.
     */
    permissionsInfo: IPermissionsInfo | null;

    /**
     * A list of campaigns applied under this user's namespace.
     */
    campaigns: ICampaignConnection;
  }

  interface IEventLogsOnUserArguments {
    /**
     * Returns the first n event logs from the list.
     */
    first?: number | null;

    /**
     * Only return events matching this event name
     */
    eventName?: string | null;
  }

  interface IAccessTokensOnUserArguments {
    /**
     * Returns the first n access tokens from the list.
     */
    first?: number | null;
  }

  interface IExternalAccountsOnUserArguments {
    /**
     * Returns the first n external accounts from the list.
     */
    first?: number | null;
  }

  interface ICampaignsOnUserArguments {
    /**
     * Returns the first n campaigns from the list.
     * @default 50
     */
    first?: number | null;

    /**
     * Opaque pagination cursor.
     */
    after?: string | null;

    /**
     * Only return campaigns in this state.
     */
    state?: CampaignState | null;

    /**
     * Only include campaigns that the viewer can administer.
     */
    viewerCanAdminister?: boolean | null;
  }

  /**
   * SettingsSubject is something that can have settings: a site ("global settings", which is different from "site
   * configuration"), an organization, or a user.
   */
  type SettingsSubject = IUser | IOrg | ISite | IDefaultSettings;

  /**
   * SettingsSubject is something that can have settings: a site ("global settings", which is different from "site
   * configuration"), an organization, or a user.
   */
  interface ISettingsSubject {
    __typename: 'SettingsSubject';

    /**
     * The ID.
     */
    id: string;

    /**
     * The latest settings.
     */
    latestSettings: ISettings | null;

    /**
     * The URL to the settings.
     */
    settingsURL: string | null;

    /**
     * Whether the viewer can modify the subject's settings.
     */
    viewerCanAdminister: boolean;

    /**
     * All settings for this subject, and the individual levels in the settings cascade (global > organization > user)
     * that were merged to produce the final merged settings.
     */
    settingsCascade: ISettingsCascade;

    /**
     * DEPRECATED
     * @deprecated "Use settingsCascade instead. This field is a deprecated alias for it and will be removed in a future release."
     */
    configurationCascade: IConfigurationCascade;
  }

  /**
   * Settings is a version of a configuration settings file.
   */
  interface ISettings {
    __typename: 'Settings';

    /**
     * The ID.
     */
    id: number;

    /**
     * The subject that these settings are for.
     */
    subject: SettingsSubject;

    /**
     * The author, or null if there is no author or the authoring user was deleted.
     */
    author: IUser | null;

    /**
     * The time when this was created.
     */
    createdAt: any;

    /**
     * The stringified JSON contents of the settings. The contents may include "//"-style comments and trailing
     * commas in the JSON.
     */
    contents: any;

    /**
     * DEPRECATED: This field will be removed in a future release.
     * The configuration.
     * @deprecated "use the contents field instead"
     */
    configuration: IConfiguration;
  }

  /**
   * DEPRECATED: Use the contents field on the parent type instead. This type will be removed in a future release.
   */
  interface IConfiguration {
    __typename: 'Configuration';

    /**
     * DEPRECATED: This field will be removed in a future release.
     * The raw JSON contents, encoded as a string.
     * @deprecated "use the contents field on the parent type instead"
     */
    contents: any;

    /**
     * DEPRECATED: This field is always empty. It will be removed in a future release.
     * @deprecated "use client-side JSON Schema validation instead"
     */
    messages: Array<string>;
  }

  /**
   * The configurations for all of the relevant settings subjects, plus the merged settings.
   */
  interface ISettingsCascade {
    __typename: 'SettingsCascade';

    /**
     * The other settings subjects that are applied with lower precedence than this subject to
     * form the final merged settings. For example, a user in 2 organizations would have the following
     * settings subjects: site (global settings), org 1, org 2, and the user.
     */
    subjects: Array<SettingsSubject>;

    /**
     * The effective final merged settings as (stringified) JSON, merged from all of the subjects.
     */
    final: string;

    /**
     * DEPRECATED: This field will be removed in a future release.
     * The effective final merged settings, merged from all of the subjects.
     * @deprecated "use final instead"
     */
    merged: IConfiguration;
  }

  /**
   * DEPRECATED: Renamed to SettingsCascade.
   */
  interface IConfigurationCascade {
    __typename: 'ConfigurationCascade';

    /**
     * DEPRECATED
     * @deprecated "use SettingsCascade.subjects instead"
     */
    subjects: Array<SettingsSubject>;

    /**
     * DEPRECATED
     * @deprecated "use SettingsCascade.final instead"
     */
    merged: IConfiguration;
  }

  /**
   * A list of organizations.
   */
  interface IOrgConnection {
    __typename: 'OrgConnection';

    /**
     * A list of organizations.
     */
    nodes: Array<IOrg>;

    /**
     * The total count of organizations in the connection. This total count may be larger
     * than the number of nodes in this object when the result is paginated.
     */
    totalCount: number;
  }

  /**
   * An organization, which is a group of users.
   */
  interface IOrg {
    __typename: 'Org';

    /**
     * The unique ID for the organization.
     */
    id: string;

    /**
     * The organization's name. This is unique among all organizations on this Sourcegraph site.
     */
    name: string;

    /**
     * The organization's chosen display name.
     */
    displayName: string | null;

    /**
     * The date when the organization was created.
     */
    createdAt: any;

    /**
     * A list of users who are members of this organization.
     */
    members: IUserConnection;

    /**
     * The latest settings for the organization.
     * Only organization members and site admins can access this field.
     */
    latestSettings: ISettings | null;

    /**
     * All settings for this organization, and the individual levels in the settings cascade (global > organization)
     * that were merged to produce the final merged settings.
     * Only organization members and site admins can access this field.
     */
    settingsCascade: ISettingsCascade;

    /**
     * DEPRECATED
     * @deprecated "Use settingsCascade instead. This field is a deprecated alias for it and will be removed in a future release."
     */
    configurationCascade: IConfigurationCascade;

    /**
     * A pending invitation for the viewer to join this organization, if any.
     */
    viewerPendingInvitation: IOrganizationInvitation | null;

    /**
     * Whether the viewer has admin privileges on this organization. Currently, all of an organization's members
     * have admin privileges on the organization.
     */
    viewerCanAdminister: boolean;

    /**
     * Whether the viewer is a member of this organization.
     */
    viewerIsMember: boolean;

    /**
     * The URL to the organization.
     */
    url: string;

    /**
     * The URL to the organization's settings.
     */
    settingsURL: string | null;

    /**
     * The name of this user namespace's component. For organizations, this is the organization's name.
     */
    namespaceName: string;

    /**
     * A list of campaigns initially applied in this organization.
     */
    campaigns: ICampaignConnection;
  }

  interface ICampaignsOnOrgArguments {
    /**
     * Returns the first n campaigns from the list.
     * @default 50
     */
    first?: number | null;

    /**
     * Opaque pagination cursor.
     */
    after?: string | null;

    /**
     * Only return campaigns in this state.
     */
    state?: CampaignState | null;

    /**
     * Only include campaigns that the viewer can administer.
     */
    viewerCanAdminister?: boolean | null;
  }

  /**
   * A list of users.
   */
  interface IUserConnection {
    __typename: 'UserConnection';

    /**
     * A list of users.
     */
    nodes: Array<IUser>;

    /**
     * The total count of users in the connection. This total count may be larger
     * than the number of nodes in this object when the result is paginated.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * Pagination information. See https://facebook.github.io/relay/graphql/connections.htm#sec-undefined.PageInfo.
   */
  interface IPageInfo {
    __typename: 'PageInfo';

    /**
     * When paginating forwards, the cursor to continue.
     */
    endCursor: string | null;

    /**
     * When paginating forwards, are there more items?
     */
    hasNextPage: boolean;
  }

  /**
   * An invitation to join an organization as a member.
   */
  interface IOrganizationInvitation {
    __typename: 'OrganizationInvitation';

    /**
     * The ID of the invitation.
     */
    id: string;

    /**
     * The organization that the invitation is for.
     */
    organization: IOrg;

    /**
     * The user who sent the invitation.
     */
    sender: IUser;

    /**
     * The user who received the invitation.
     */
    recipient: IUser;

    /**
     * The date when this invitation was created.
     */
    createdAt: any;

    /**
     * The most recent date when a notification was sent to the recipient about this invitation.
     */
    notifiedAt: any | null;

    /**
     * The date when this invitation was responded to by the recipient.
     */
    respondedAt: any | null;

    /**
     * The recipient's response to this invitation, or no response (null).
     */
    responseType: OrganizationInvitationResponseType | null;

    /**
     * The URL where the recipient can respond to the invitation when pending, or null if not pending.
     */
    respondURL: string | null;

    /**
     * The date when this invitation was revoked.
     */
    revokedAt: any | null;
  }

  /**
   * The recipient's possible responses to an invitation to join an organization as a member.
   */
  const enum OrganizationInvitationResponseType {
    /**
     * The invitation was accepted by the recipient.
     */
    ACCEPT = 'ACCEPT',

    /**
     * The invitation was rejected by the recipient.
     */
    REJECT = 'REJECT',
  }

  /**
   * A list of organization memberships.
   */
  interface IOrganizationMembershipConnection {
    __typename: 'OrganizationMembershipConnection';

    /**
     * A list of organization memberships.
     */
    nodes: Array<IOrganizationMembership>;

    /**
     * The total count of organization memberships in the connection. This total count may be larger than the number
     * of nodes in this object when the result is paginated.
     */
    totalCount: number;
  }

  /**
   * An organization membership.
   */
  interface IOrganizationMembership {
    __typename: 'OrganizationMembership';

    /**
     * The organization.
     */
    organization: IOrg;

    /**
     * The user.
     */
    user: IUser;

    /**
     * The time when this was created.
     */
    createdAt: any;

    /**
     * The time when this was updated.
     */
    updatedAt: any;
  }

  /**
   * UserUsageStatistics describes a user's usage statistics.
   * This information is visible to all viewers.
   */
  interface IUserUsageStatistics {
    __typename: 'UserUsageStatistics';

    /**
     * The number of search queries that the user has performed.
     */
    searchQueries: number;

    /**
     * The number of page views that the user has performed.
     */
    pageViews: number;

    /**
     * The number of code intelligence actions that the user has performed.
     */
    codeIntelligenceActions: number;

    /**
     * The number of find-refs actions that the user has performed.
     */
    findReferencesActions: number;

    /**
     * The last time the user was active (any action, any platform).
     */
    lastActiveTime: string | null;

    /**
     * The last time the user was active on a code host integration.
     */
    lastActiveCodeHostIntegrationTime: string | null;
  }

  /**
   * A list of event logs.
   */
  interface IEventLogsConnection {
    __typename: 'EventLogsConnection';

    /**
     * A list of event logs.
     */
    nodes: Array<IEventLog>;

    /**
     * The total count of event logs in the connection. This total count may be larger than the number of nodes
     * in this object when the result is paginated.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * A single user event that has been logged.
   */
  interface IEventLog {
    __typename: 'EventLog';

    /**
     * The name of the event.
     */
    name: string;

    /**
     * The user who executed the event, if one exists.
     */
    user: IUser | null;

    /**
     * The randomly generated unique user ID stored in a browser cookie.
     */
    anonymousUserID: string;

    /**
     * The URL when the event was logged.
     */
    url: string;

    /**
     * The source of the event.
     */
    source: EventSource;

    /**
     * The additional argument information.
     */
    argument: string | null;

    /**
     * The Sourcegraph version when the event was logged.
     */
    version: string;

    /**
     * The timestamp when the event was logged.
     */
    timestamp: any;
  }

  /**
   * The product sources where events can come from.
   */
  const enum EventSource {
    WEB = 'WEB',
    CODEHOSTINTEGRATION = 'CODEHOSTINTEGRATION',
    BACKEND = 'BACKEND',
  }

  /**
   * A user's email address.
   */
  interface IUserEmail {
    __typename: 'UserEmail';

    /**
     * The email address.
     */
    email: string;

    /**
     * Whether the email address is the user's primary email address. Currently this is defined as the earliest
     * email address associated with the user, preferring verified emails to unverified emails.
     */
    isPrimary: boolean;

    /**
     * Whether the email address has been verified by the user.
     */
    verified: boolean;

    /**
     * Whether the email address is pending verification.
     */
    verificationPending: boolean;

    /**
     * The user associated with this email address.
     */
    user: IUser;

    /**
     * Whether the viewer has privileges to manually mark this email address as verified (without the user going
     * through the normal verification process). Only site admins have this privilege.
     */
    viewerCanManuallyVerify: boolean;
  }

  /**
   * A list of access tokens.
   */
  interface IAccessTokenConnection {
    __typename: 'AccessTokenConnection';

    /**
     * A list of access tokens.
     */
    nodes: Array<IAccessToken>;

    /**
     * The total count of access tokens in the connection. This total count may be larger than the number of nodes
     * in this object when the result is paginated.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * An access token that grants to the holder the privileges of the user who created it.
   */
  interface IAccessToken {
    __typename: 'AccessToken';

    /**
     * The unique ID for the access token.
     */
    id: string;

    /**
     * The user whose privileges the access token grants.
     */
    subject: IUser;

    /**
     * The scopes that define the allowed set of operations that can be performed using this access token.
     */
    scopes: Array<string>;

    /**
     * A user-supplied descriptive note for the access token.
     */
    note: string;

    /**
     * The user who created the access token. This is either the subject user (if the access token
     * was created by the same user) or a site admin (who can create access tokens for any user).
     */
    creator: IUser;

    /**
     * The date when the access token was created.
     */
    createdAt: any;

    /**
     * The date when the access token was last used to authenticate a request.
     */
    lastUsedAt: any | null;
  }

  /**
   * A list of external accounts.
   */
  interface IExternalAccountConnection {
    __typename: 'ExternalAccountConnection';

    /**
     * A list of external accounts.
     */
    nodes: Array<IExternalAccount>;

    /**
     * The total count of external accounts in the connection. This total count may be larger than the number of nodes
     * in this object when the result is paginated.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * An external account associated with a user.
   */
  interface IExternalAccount {
    __typename: 'ExternalAccount';

    /**
     * The unique ID for the external account.
     */
    id: string;

    /**
     * The user on Sourcegraph.
     */
    user: IUser;

    /**
     * The type of the external service where the external account resides.
     */
    serviceType: string;

    /**
     * An identifier for the external service where the external account resides.
     */
    serviceID: string;

    /**
     * An identifier for the client of the external service where the external account resides. This distinguishes
     * among multiple authentication providers that access the same service with different parameters.
     */
    clientID: string;

    /**
     * An identifier for the external account (typically equal to or derived from the ID on the external service).
     */
    accountID: string;

    /**
     * The creation date of this external account on Sourcegraph.
     */
    createdAt: any;

    /**
     * The last-updated date of this external account on Sourcegraph.
     */
    updatedAt: any;

    /**
     * A URL that, when visited, re-initiates the authentication process.
     */
    refreshURL: string | null;

    /**
     * Provider-specific data about the external account.
     * Only site admins may query this field.
     */
    accountData: any | null;
  }

  /**
   * An active user session.
   */
  interface ISession {
    __typename: 'Session';

    /**
     * Whether the user can sign out of this session on Sourcegraph.
     */
    canSignOut: boolean;
  }

  /**
   * An individual response to a user satisfaction (NPS) survey.
   */
  interface ISurveyResponse {
    __typename: 'SurveyResponse';

    /**
     * The unique ID of the survey response
     */
    id: string;

    /**
     * The user who submitted the survey (if they were authenticated at the time).
     */
    user: IUser | null;

    /**
     * The email that the user manually entered (if they were NOT authenticated at the time).
     */
    email: string | null;

    /**
     * User's likelihood of recommending Sourcegraph to a friend, from 0-10.
     */
    score: number;

    /**
     * The answer to "What is the most important reason for the score you gave".
     */
    reason: string | null;

    /**
     * The answer to "What can Sourcegraph do to provide a better product"
     */
    better: string | null;

    /**
     * The time when this response was created.
     */
    createdAt: any;
  }

  /**
   * Permissions information of a repository or a user.
   */
  interface IPermissionsInfo {
    __typename: 'PermissionsInfo';

    /**
     * The permission levels that a user has on the repository.
     */
    permissions: Array<RepositoryPermission>;

    /**
     * The last complete synced time, the value is updated only after a user- or repo-
     * centric sync of permissions. It is null when the complete sync never happened.
     */
    syncedAt: any | null;

    /**
     * The last updated time of permissions, the value is updated whenever there is a
     * change to the database row (i.e. incremental update).
     */
    updatedAt: any;
  }

  /**
   * Different repository permission levels.
   */
  const enum RepositoryPermission {
    READ = 'READ',
  }

  /**
   * The reconciler state of a changeset on Sourcegraph
   */
  const enum ChangesetReconcilerState {
    /**
     * The changeset is enqueued for the reconciler to process it.
     */
    QUEUED = 'QUEUED',

    /**
     * The changeset reconciler is currently computing the delta between the
     * If a delta exists, the reconciler tries to update the state of the
     * changeset on the code host and on Sourcegraph to the desired state.
     */
    PROCESSING = 'PROCESSING',

    /**
     * The changeset reconciler ran into a problem while processing the
     * changeset.
     */
    ERRORED = 'ERRORED',

    /**
     * The changeset is not enqueued for processing.
     */
    COMPLETED = 'COMPLETED',
  }

  /**
   * The publication state of a changeset on Sourcegraph
   */
  const enum ChangesetPublicationState {
    /**
     * The changeset has not yet been created on the code host.
     */
    UNPUBLISHED = 'UNPUBLISHED',

    /**
     * The changeset has been created on the code host.
     */
    PUBLISHED = 'PUBLISHED',
  }

  /**
   * The state of a changeset on the code host on which it's hosted.
   */
  const enum ChangesetExternalState {
    OPEN = 'OPEN',
    CLOSED = 'CLOSED',
    MERGED = 'MERGED',
    DELETED = 'DELETED',
  }

  /**
   * The review state of a changeset.
   */
  const enum ChangesetReviewState {
    APPROVED = 'APPROVED',
    CHANGES_REQUESTED = 'CHANGES_REQUESTED',
    PENDING = 'PENDING',
    COMMENTED = 'COMMENTED',
    DISMISSED = 'DISMISSED',
  }

  /**
   * The state of checks (e.g., for continuous integration) on a changeset.
   */
  const enum ChangesetCheckState {
    PENDING = 'PENDING',
    PASSED = 'PASSED',
    FAILED = 'FAILED',
  }

  /**
   * A list of changesets.
   */
  interface IChangesetConnection {
    __typename: 'ChangesetConnection';

    /**
     * A list of changesets.
     */
    nodes: Array<Changeset>;

    /**
     * The total number of changesets in the connection.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;

    /**
     * Stats on all the changesets that are in this connection. Pagination has no effect on the stats.
     */
    stats: IChangesetConnectionStats;
  }

  /**
   * A changeset on a codehost.
   */
  type Changeset = IExternalChangeset | IHiddenExternalChangeset;

  /**
   * A changeset on a codehost.
   */
  interface IChangeset {
    __typename: 'Changeset';

    /**
     * The unique ID for the changeset.
     */
    id: string;

    /**
     * The campaigns that contain this changeset.
     */
    campaigns: ICampaignConnection;

    /**
     * The publication state of the changeset.
     */
    publicationState: ChangesetPublicationState;

    /**
     * The reconciler state of the changeset.
     */
    reconcilerState: ChangesetReconcilerState;

    /**
     * The external state of the changeset, or null when not yet published to the code host.
     */
    externalState: ChangesetExternalState | null;

    /**
     * The date and time when the changeset was created.
     */
    createdAt: any;

    /**
     * The date and time when the changeset was updated.
     */
    updatedAt: any;

    /**
     * The date and time when the next changeset sync is scheduled, or null if none is scheduled.
     */
    nextSyncAt: any | null;
  }

  interface ICampaignsOnChangesetArguments {
    /**
     * Returns the first n campaigns from the list.
     * @default 50
     */
    first?: number | null;

    /**
     * Opaque pagination cursor.
     */
    after?: string | null;

    /**
     * Only return campaigns in this state.
     */
    state?: CampaignState | null;

    /**
     * Only include campaigns that the viewer can administer.
     */
    viewerCanAdminister?: boolean | null;
  }

  /**
   * Used in the campaign page for the overview component.
   */
  interface IChangesetConnectionStats {
    __typename: 'ChangesetConnectionStats';

    /**
     * The count of unpublished changesets.
     */
    unpublished: number;

    /**
     * The count of externalState: OPEN changesets.
     */
    open: number;

    /**
     * The count of externalState: MERGED changesets.
     */
    merged: number;

    /**
     * The count of externalState: CLOSED changesets.
     */
    closed: number;

    /**
     * The count of all changesets. Equal to totalCount of the connection.
     */
    total: number;
  }

  /**
   * The counts of changesets in certain states at a specific point in time.
   */
  interface IChangesetCounts {
    __typename: 'ChangesetCounts';

    /**
     * The point in time these counts were recorded.
     */
    date: any;

    /**
     * The total number of changesets.
     */
    total: number;

    /**
     * The number of merged changesets.
     */
    merged: number;

    /**
     * The number of closed changesets.
     */
    closed: number;

    /**
     * The number of open changesets (independent of review state).
     */
    open: number;

    /**
     * The number of changesets that are both open and approved.
     */
    openApproved: number;

    /**
     * The number of changesets that are both open and have requested changes.
     */
    openChangesRequested: number;

    /**
     * The number of changesets that are both open and are pending review.
     */
    openPending: number;
  }

  /**
   * Statistics about a diff.
   */
  interface IDiffStat {
    __typename: 'DiffStat';

    /**
     * Number of additions.
     */
    added: number;

    /**
     * Number of changes.
     */
    changed: number;

    /**
     * Number of deletions.
     */
    deleted: number;
  }

  /**
   * A campaign spec is an immutable description of the desired state of a campaign. To create a
   * campaign spec, use the createCampaignSpec mutation.
   */
  interface ICampaignSpec {
    __typename: 'CampaignSpec';

    /**
     * The unique ID for a campaign spec.
     *
     * The ID is unguessable (i.e., long and randomly generated, not sequential).
     * Consider a campaign to fix a security vulnerability: the campaign author may prefer
     * to prepare the campaign, including the description in private so that the window
     * between revealing the problem and merging the fixes is as short as possible.
     */
    id: string;

    /**
     * The original YAML or JSON input that was used to create this campaign spec.
     */
    originalInput: string;

    /**
     * The parsed JSON value of the original input. If the original input was YAML, the YAML is
     * converted to the equivalent JSON.
     */
    parsedInput: any;

    /**
     * The CampaignDescription that describes this campaign.
     */
    description: ICampaignDescription;

    /**
     * The specs for changesets associated with this campaign.
     */
    changesetSpecs: IChangesetSpecConnection;

    /**
     * The user who created this campaign spec (or null if the user no longer exists).
     */
    creator: IUser | null;

    /**
     * The date when this campaign spec was created.
     */
    createdAt: any;

    /**
     * The namespace (either a user or organization) of the campaign spec.
     */
    namespace: Namespace;

    /**
     * The date, if any, when this campaign spec expires and is automatically purged. A campaign spec
     * never expires if it has been applied.
     */
    expiresAt: any | null;

    /**
     * The URL of a web page that allows applying this campaign spec and
     * displays a preview of which changesets will be created by applying it.
     */
    applyURL: string;

    /**
     * When true, the viewing user can apply this spec.
     */
    viewerCanAdminister: boolean;

    /**
     * The diff stat for all the changeset specs in the campaign spec.
     */
    diffStat: IDiffStat;

    /**
     * The campaign this spec will update when applied. If it's null, the
     * campaign doesn't yet exist.
     */
    appliesToCampaign: ICampaign | null;
  }

  interface IChangesetSpecsOnCampaignSpecArguments {
    /**
     * @default 50
     */
    first?: number | null;
    after?: string | null;
  }

  /**
   * A CampaignDescription describes a campaign.
   */
  interface ICampaignDescription {
    __typename: 'CampaignDescription';

    /**
     * The name as parsed from the input.
     */
    name: string;

    /**
     * The description as parsed from the input.
     */
    description: string;
  }

  /**
   * A list of changeset specs.
   */
  interface IChangesetSpecConnection {
    __typename: 'ChangesetSpecConnection';

    /**
     * The total number of changeset specs in the connection.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;

    /**
     * A list of changeset specs.
     */
    nodes: Array<ChangesetSpec>;
  }

  /**
   * A changeset spec is an immutable description of the desired state of a changeset in a campaign. To
   * create a changeset spec, use the createChangesetSpec mutation.
   */
  type ChangesetSpec = IVisibleChangesetSpec | IHiddenChangesetSpec;

  /**
   * A changeset spec is an immutable description of the desired state of a changeset in a campaign. To
   * create a changeset spec, use the createChangesetSpec mutation.
   */
  interface IChangesetSpec {
    __typename: 'ChangesetSpec';

    /**
     * The type of changeset spec.
     */
    type: ChangesetSpecType;

    /**
     * The date, if any, when this changeset spec expires and is automatically purged. A changeset
     * spec never expires (and this field is null) if its campaign spec has been applied.
     */
    expiresAt: any | null;
  }

  /**
   * The type of the changeset spec.
   */
  const enum ChangesetSpecType {
    /**
     * References an existing changeset on a code host to be imported.
     */
    EXISTING = 'EXISTING',

    /**
     * References a branch and a patch to be applied to create the changeset from.
     */
    BRANCH = 'BRANCH',
  }

  /**
   * A repository is a Git source control repository that is mirrored from some origin code host.
   */
  interface IRepository {
    __typename: 'Repository';

    /**
     * The repository's unique ID.
     */
    id: string;

    /**
     * The repository's name, as a path with one or more components. It conventionally consists of
     * the repository's hostname and path (joined by "/"), minus any suffixes (such as ".git").
     * Examples:
     * - github.com/foo/bar
     * - my-code-host.example.com/myrepo
     * - myrepo
     */
    name: string;

    /**
     * DEPRECATED: Use name.
     * @deprecated "Use name."
     */
    uri: string;

    /**
     * The repository's description.
     */
    description: string;

    /**
     * The primary programming language in the repository.
     */
    language: string;

    /**
     * DEPRECATED: This field is unused in known clients.
     * The date when this repository was created on Sourcegraph.
     */
    createdAt: any;

    /**
     * DEPRECATED: This field is unused in known clients.
     * The date when this repository's metadata was last updated on Sourcegraph.
     */
    updatedAt: any | null;

    /**
     * Returns information about the given commit in the repository, or null if no commit exists with the given rev.
     */
    commit: IGitCommit | null;

    /**
     * Information and status related to mirroring, if this repository is a mirror of another repository (e.g., on
     * some code host). In this case, the remote source repository is external to Sourcegraph and the mirror is
     * maintained by the Sourcegraph site (not the other way around).
     */
    mirrorInfo: IMirrorRepositoryInfo;

    /**
     * Information about this repository from the external service that it originates from (such as GitHub, GitLab,
     * Phabricator, etc.).
     */
    externalRepository: IExternalRepository;

    /**
     * Whether the repository is a fork.
     */
    isFork: boolean;

    /**
     * Whether the repository has been archived.
     */
    isArchived: boolean;

    /**
     * Whether the repository is private.
     */
    isPrivate: boolean;

    /**
     * Lists all external services which yield this repository.
     */
    externalServices: IExternalServiceConnection;

    /**
     * Whether the repository is currently being cloned.
     * @deprecated "use Repository.mirrorInfo.cloneInProgress instead"
     */
    cloneInProgress: boolean;

    /**
     * Information about the text search index for this repository, or null if text search indexing
     * is not enabled or supported for this repository.
     */
    textSearchIndex: IRepositoryTextSearchIndex | null;

    /**
     * The URL to this repository.
     */
    url: string;

    /**
     * The URLs to this repository on external services associated with it.
     */
    externalURLs: Array<IExternalLink>;

    /**
     * The repository's default Git branch (HEAD symbolic ref). If the repository is currently being cloned or is
     * empty, this field will be null.
     */
    defaultBranch: IGitRef | null;

    /**
     * The repository's Git refs.
     */
    gitRefs: IGitRefConnection;

    /**
     * The repository's Git branches.
     */
    branches: IGitRefConnection;

    /**
     * The repository's Git tags.
     */
    tags: IGitRefConnection;

    /**
     * A Git comparison in this repository between a base and head commit.
     */
    comparison: IRepositoryComparison;

    /**
     * The repository's contributors.
     */
    contributors: IRepositoryContributorConnection;

    /**
     * Whether the viewer has admin privileges on this repository.
     */
    viewerCanAdminister: boolean;

    /**
     * Base64 data uri to an icon.
     */
    icon: string;

    /**
     * A markdown string that is rendered prominently.
     */
    label: IMarkdown;

    /**
     * A markdown string of that is rendered less prominently.
     */
    detail: IMarkdown;

    /**
     * The result previews of the result.
     */
    matches: Array<ISearchResultMatch>;

    /**
     * (experimental) The LSIF API may change substantially in the near future as we
     * continue to adjust it for our use cases. Changes will not be documented in the
     * CHANGELOG during this time.
     * The repository's LSIF uploads.
     */
    lsifUploads: ILSIFUploadConnection;

    /**
     * (experimental) The LSIF API may change substantially in the near future as we
     * continue to adjust it for our use cases. Changes will not be documented in the
     * CHANGELOG during this time.
     * The repository's LSIF uploads.
     */
    lsifIndexes: ILSIFIndexConnection;

    /**
     * A list of authorized users to access this repository with the given permission.
     * This API currently only returns permissions from the Sourcegraph provider, i.e.
     * "permissions.userMapping" in site configuration.
     */
    authorizedUsers: IUserConnection;

    /**
     * The permissions information of the repository for the authenticated user.
     * It is null when there is no permissions data stored for the repository.
     */
    permissionsInfo: IPermissionsInfo | null;
  }

  interface ICommitOnRepositoryArguments {
    /**
     * The Git revision specifier (revspec) for the commit.
     */
    rev: string;

    /**
     * Optional input revspec used to construct non-canonical URLs and other "friendly" field values. Used by
     * clients that must ensure consistency of revision resolution within a session/request (so they use full
     * SHAs) but also preserve the user input rev (for user friendliness).
     */
    inputRevspec?: string | null;
  }

  interface IExternalServicesOnRepositoryArguments {
    /**
     * Returns the first n external services from the list.
     */
    first?: number | null;
  }

  interface IGitRefsOnRepositoryArguments {
    /**
     * Returns the first n Git refs from the list.
     */
    first?: number | null;

    /**
     * Return Git refs whose names match the query.
     */
    query?: string | null;

    /**
     * Return only Git refs of the given type.
     * Known issue: It is only supported to retrieve Git branch and tag refs, not
     * other Git refs.
     */
    type?: GitRefType | null;

    /**
     * Ordering for Git refs in the list.
     */
    orderBy?: GitRefOrder | null;

    /**
     * Ordering is an expensive operation that doesn't scale for lots of
     * references. If this is true we fallback on not ordering. This should
     * never be false in interactive API requests.
     * @default true
     */
    interactive?: boolean | null;
  }

  interface IBranchesOnRepositoryArguments {
    /**
     * Returns the first n Git branches from the list.
     */
    first?: number | null;

    /**
     * Return Git branches whose names match the query.
     */
    query?: string | null;

    /**
     * Ordering for Git branches in the list.
     */
    orderBy?: GitRefOrder | null;

    /**
     * Ordering is an expensive operation that doesn't scale for lots of
     * references. If this is true we fallback on not ordering. This should
     * never be false in interactive API requests.
     * @default true
     */
    interactive?: boolean | null;
  }

  interface ITagsOnRepositoryArguments {
    /**
     * Returns the first n Git tags from the list.
     */
    first?: number | null;

    /**
     * Return Git tags whose names match the query.
     */
    query?: string | null;
  }

  interface IComparisonOnRepositoryArguments {
    /**
     * The base of the diff ("old" or "left-hand side"), or "HEAD" if not specified.
     */
    base?: string | null;

    /**
     * The head of the diff ("new" or "right-hand side"), or "HEAD" if not specified.
     */
    head?: string | null;

    /**
     * Attempt to fetch missing revisions from remote if they are not found
     * @default true
     */
    fetchMissing?: boolean | null;
  }

  interface IContributorsOnRepositoryArguments {
    /**
     * The Git revision range to compute contributors in.
     */
    revisionRange?: string | null;

    /**
     * The date after which to count contributions.
     */
    after?: string | null;

    /**
     * Return contributors to files in this path.
     */
    path?: string | null;

    /**
     * Returns the first n contributors from the list.
     */
    first?: number | null;
  }

  interface ILsifUploadsOnRepositoryArguments {
    /**
     * An (optional) search query that searches over the state, repository name,
     * commit, root, and indexer properties.
     */
    query?: string | null;

    /**
     * The state of returned uploads.
     */
    state?: LSIFUploadState | null;

    /**
     * When specified, shows only uploads that are latest for the given repository.
     */
    isLatestForRepo?: boolean | null;

    /**
     * When specified, indicates that this request should be paginated and
     * the first N results (relative to the cursor) should be returned. i.e.
     * how many results to return per page. It must be in the range of 0-5000.
     */
    first?: number | null;

    /**
     * When specified, indicates that this request should be paginated and
     * to fetch results starting at this cursor.
     * A future request can be made for more results by passing in the
     * 'LSIFUploadConnection.pageInfo.endCursor' that is returned.
     */
    after?: string | null;
  }

  interface ILsifIndexesOnRepositoryArguments {
    /**
     * An (optional) search query that searches over the state, repository name,
     * and commit properties.
     */
    query?: string | null;

    /**
     * The state of returned uploads.
     */
    state?: LSIFIndexState | null;

    /**
     * When specified, indicates that this request should be paginated and
     * the first N results (relative to the cursor) should be returned. i.e.
     * how many results to return per page. It must be in the range of 0-5000.
     */
    first?: number | null;

    /**
     * When specified, indicates that this request should be paginated and
     * to fetch results starting at this cursor.
     * A future request can be made for more results by passing in the
     * 'LSIFIndexConnection.pageInfo.endCursor' that is returned.
     */
    after?: string | null;
  }

  interface IAuthorizedUsersOnRepositoryArguments {
    /**
     * Permission that the user has on this repository.
     * @default "READ"
     */
    permission?: RepositoryPermission | null;

    /**
     * Number of users to return after the given cursor.
     */
    first: number;

    /**
     * Opaque pagination cursor.
     */
    after?: string | null;
  }

  /**
   * A search result. Every type of search result, except FileMatch, must implement this interface.
   */
  type GenericSearchResultInterface = IRepository | ICommitSearchResult;

  /**
   * A search result. Every type of search result, except FileMatch, must implement this interface.
   */
  interface IGenericSearchResultInterface {
    __typename: 'GenericSearchResultInterface';

    /**
     * URL to an icon that is displayed with every search result.
     */
    icon: string;

    /**
     * A markdown string that is rendered prominently.
     */
    label: IMarkdown;

    /**
     * The URL of the result.
     */
    url: string;

    /**
     * A markdown string that is rendered less prominently.
     */
    detail: IMarkdown;

    /**
     * A list of matches in this search result.
     */
    matches: Array<ISearchResultMatch>;
  }

  /**
   * An object representing a markdown string.
   */
  interface IMarkdown {
    __typename: 'Markdown';

    /**
     * The raw markdown string.
     */
    text: string;

    /**
     * HTML for the rendered markdown string, or null if there is no HTML representation provided.
     * If specified, clients should render this directly.
     */
    html: string;
  }

  /**
   * A match in a search result. Matches make up the body content of a search result.
   */
  interface ISearchResultMatch {
    __typename: 'SearchResultMatch';

    /**
     * URL for the individual result match.
     */
    url: string;

    /**
     * A markdown string containing the preview contents of the result match.
     */
    body: IMarkdown;

    /**
     * A list of highlights that specify locations of matches of the query in the body. Each highlight is
     * a line number, character offset, and length. Currently, highlights are only displayed on match bodies
     * that are code blocks. If the result body is a code block, exclude the markdown code fence lines in
     * the line and character count. Leave as an empty list if no highlights are available.
     */
    highlights: Array<IHighlight>;
  }

  /**
   * A highlighted region in a string (e.g., matched by a query).
   */
  interface IHighlight {
    __typename: 'Highlight';

    /**
     * The 1-indexed line number.
     */
    line: number;

    /**
     * The 1-indexed character on the line.
     */
    character: number;

    /**
     * The length of the highlight, in characters (on the same line).
     */
    length: number;
  }

  /**
   * A Git commit.
   */
  interface IGitCommit {
    __typename: 'GitCommit';

    /**
     * The globally addressable ID for this commit.
     */
    id: string;

    /**
     * The repository that contains this commit.
     */
    repository: IRepository;

    /**
     * This commit's Git object ID (OID), a 40-character SHA-1 hash.
     */
    oid: any;

    /**
     * The abbreviated form of this commit's OID.
     */
    abbreviatedOID: string;

    /**
     * This commit's author.
     */
    author: ISignature;

    /**
     * This commit's committer, if any.
     */
    committer: ISignature | null;

    /**
     * The full commit message.
     */
    message: string;

    /**
     * The first line of the commit message.
     */
    subject: string;

    /**
     * The contents of the commit message after the first line.
     */
    body: string | null;

    /**
     * Parent commits of this commit.
     */
    parents: Array<IGitCommit>;

    /**
     * The URL to this commit (using the input revision specifier, which may not be immutable).
     */
    url: string;

    /**
     * The canonical URL to this commit (using an immutable revision specifier).
     */
    canonicalURL: string;

    /**
     * The URLs to this commit on its repository's external services.
     */
    externalURLs: Array<IExternalLink>;

    /**
     * The Git tree in this commit at the given path.
     */
    tree: IGitTree | null;

    /**
     * The Git blob in this commit at the given path.
     */
    blob: IGitBlob | null;

    /**
     * The file at the given path for this commit.
     * See "File" documentation for the difference between this field and the "blob" field.
     */
    file: File2 | null;

    /**
     * Lists the programming languages present in the tree at this commit.
     */
    languages: Array<string>;

    /**
     * List statistics for each language present in the repository.
     */
    languageStatistics: Array<ILanguageStatistics>;

    /**
     * The log of commits consisting of this commit and its ancestors.
     */
    ancestors: IGitCommitConnection;

    /**
     * Returns the number of commits that this commit is behind and ahead of revspec.
     */
    behindAhead: IBehindAheadCounts;

    /**
     * Symbols defined as of this commit. (All symbols, not just symbols that were newly defined in this commit.)
     */
    symbols: ISymbolConnection;
  }

  interface ITreeOnGitCommitArguments {
    /**
     * The path of the tree.
     * @default ""
     */
    path?: string | null;

    /**
     * Whether to recurse into sub-trees. If true, it overrides the value of the "recursive" parameter on all of
     * GitTree's fields.
     * DEPRECATED: Use the "recursive" parameter on GitTree's fields instead.
     * @default false
     */
    recursive?: boolean | null;
  }

  interface IBlobOnGitCommitArguments {
    path: string;
  }

  interface IFileOnGitCommitArguments {
    path: string;
  }

  interface IAncestorsOnGitCommitArguments {
    /**
     * Returns the first n commits from the list.
     */
    first?: number | null;

    /**
     * Return commits that match the query.
     */
    query?: string | null;

    /**
     * Return commits that affect the path.
     */
    path?: string | null;

    /**
     * Return commits more recent than the specified date.
     */
    after?: string | null;
  }

  interface IBehindAheadOnGitCommitArguments {
    revspec: string;
  }

  interface ISymbolsOnGitCommitArguments {
    /**
     * Returns the first n symbols from the list.
     */
    first?: number | null;

    /**
     * Return symbols matching the query.
     */
    query?: string | null;

    /**
     * A list of regular expressions, all of which must match all
     * file paths returned in the list.
     */
    includePatterns?: Array<string> | null;
  }

  /**
   * A signature.
   */
  interface ISignature {
    __typename: 'Signature';

    /**
     * The person.
     */
    person: IPerson;

    /**
     * The date.
     */
    date: string;
  }

  /**
   * A person.
   */
  interface IPerson {
    __typename: 'Person';

    /**
     * The name.
     */
    name: string;

    /**
     * The email.
     */
    email: string;

    /**
     * The name if set; otherwise the email username.
     */
    displayName: string;

    /**
     * The avatar URL.
     */
    avatarURL: string;

    /**
     * The corresponding user account for this person, if one exists.
     */
    user: IUser | null;
  }

  /**
   * A URL to a resource on an external service, such as the URL to a repository on its external (origin) code host.
   */
  interface IExternalLink {
    __typename: 'ExternalLink';

    /**
     * The URL to the resource.
     */
    url: string;

    /**
     * The type of external service, such as "github", or null if unknown/unrecognized. This is used solely for
     * displaying an icon that represents the service.
     */
    serviceType: string | null;
  }

  /**
   * A Git tree in a repository.
   */
  interface IGitTree {
    __typename: 'GitTree';

    /**
     * The full path (relative to the root) of this tree.
     */
    path: string;

    /**
     * Whether this tree is the root (top-level) tree.
     */
    isRoot: boolean;

    /**
     * The base name (i.e., last path component only) of this tree.
     */
    name: string;

    /**
     * True because this is a directory. (The value differs for other TreeEntry interface implementations, such as
     * File.)
     */
    isDirectory: boolean;

    /**
     * The Git commit containing this tree.
     */
    commit: IGitCommit;

    /**
     * The repository containing this tree.
     */
    repository: IRepository;

    /**
     * The URL to this tree (using the input revision specifier, which may not be immutable).
     */
    url: string;

    /**
     * The canonical URL to this tree (using an immutable revision specifier).
     */
    canonicalURL: string;

    /**
     * The URLs to this tree on external services.
     */
    externalURLs: Array<IExternalLink>;

    /**
     * The URL to this entry's raw contents as a Zip archive.
     */
    rawZipArchiveURL: string;

    /**
     * Submodule metadata if this tree points to a submodule
     */
    submodule: ISubmodule | null;

    /**
     * A list of directories in this tree.
     */
    directories: Array<IGitTree>;

    /**
     * A list of files in this tree.
     */
    files: Array<IFile>;

    /**
     * A list of entries in this tree.
     */
    entries: Array<TreeEntry>;

    /**
     * Symbols defined in this tree.
     */
    symbols: ISymbolConnection;

    /**
     * Whether this tree entry is a single child
     */
    isSingleChild: boolean;

    /**
     * (experimental) The LSIF API may change substantially in the near future as we
     * continue to adjust it for our use cases. Changes will not be documented in the
     * CHANGELOG during this time.
     * LSIF data for this tree entry.
     */
    lsif: TreeEntryLSIFData | null;
  }

  interface IDirectoriesOnGitTreeArguments {
    /**
     * Returns the first n files in the tree.
     */
    first?: number | null;

    /**
     * Recurse into sub-trees.
     * @default false
     */
    recursive?: boolean | null;
  }

  interface IFilesOnGitTreeArguments {
    /**
     * Returns the first n files in the tree.
     */
    first?: number | null;

    /**
     * Recurse into sub-trees.
     * @default false
     */
    recursive?: boolean | null;
  }

  interface IEntriesOnGitTreeArguments {
    /**
     * Returns the first n files in the tree.
     */
    first?: number | null;

    /**
     * Recurse into sub-trees. If true, implies recursiveSingleChild.
     * @default false
     */
    recursive?: boolean | null;

    /**
     * Recurse into sub-trees of single-child directories. If true, we return a flat list of
     * every directory that is a single child, and any directories or files that are
     * nested in a single child.
     * @default false
     */
    recursiveSingleChild?: boolean | null;
  }

  interface ISymbolsOnGitTreeArguments {
    /**
     * Returns the first n symbols from the list.
     */
    first?: number | null;

    /**
     * Return symbols matching the query.
     */
    query?: string | null;
  }

  interface IIsSingleChildOnGitTreeArguments {
    /**
     * Returns the first n files in the tree.
     */
    first?: number | null;

    /**
     * Recurse into sub-trees.
     * @default false
     */
    recursive?: boolean | null;

    /**
     * Recurse into sub-trees of single-child directories
     * @default false
     */
    recursiveSingleChild?: boolean | null;
  }

  interface ILsifOnGitTreeArguments {
    /**
     * An optional filter for the name of the tool that produced the upload data.
     */
    toolName?: string | null;
  }

  /**
   * A file, directory, or other tree entry.
   */
  type TreeEntry = IGitTree | IGitBlob;

  /**
   * A file, directory, or other tree entry.
   */
  interface ITreeEntry {
    __typename: 'TreeEntry';

    /**
     * The full path (relative to the repository root) of this tree entry.
     */
    path: string;

    /**
     * The base name (i.e., file name only) of this tree entry.
     */
    name: string;

    /**
     * Whether this tree entry is a directory.
     */
    isDirectory: boolean;

    /**
     * The URL to this tree entry (using the input revision specifier, which may not be immutable).
     */
    url: string;

    /**
     * The canonical URL to this tree entry (using an immutable revision specifier).
     */
    canonicalURL: string;

    /**
     * The URLs to this tree entry on external services.
     */
    externalURLs: Array<IExternalLink>;

    /**
     * Symbols defined in this file or directory.
     */
    symbols: ISymbolConnection;

    /**
     * Submodule metadata if this tree points to a submodule
     */
    submodule: ISubmodule | null;

    /**
     * Whether this tree entry is a single child
     */
    isSingleChild: boolean;

    /**
     * (experimental) The LSIF API may change substantially in the near future as we
     * continue to adjust it for our use cases. Changes will not be documented in the
     * CHANGELOG during this time.
     * LSIF data for this tree entry.
     */
    lsif: TreeEntryLSIFData | null;
  }

  interface ISymbolsOnTreeEntryArguments {
    /**
     * Returns the first n symbols from the list.
     */
    first?: number | null;

    /**
     * Return symbols matching the query.
     */
    query?: string | null;
  }

  interface IIsSingleChildOnTreeEntryArguments {
    /**
     * Returns the first n files in the tree.
     */
    first?: number | null;

    /**
     * Recurse into sub-trees.
     * @default false
     */
    recursive?: boolean | null;

    /**
     * Recurse into sub-trees of single-child directories
     * @default false
     */
    recursiveSingleChild?: boolean | null;
  }

  interface ILsifOnTreeEntryArguments {
    /**
     * An optional filter for the name of the tool that produced the upload data.
     */
    toolName?: string | null;
  }

  /**
   * A list of symbols.
   */
  interface ISymbolConnection {
    __typename: 'SymbolConnection';

    /**
     * A list of symbols.
     */
    nodes: Array<ISymbol>;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * A code symbol (e.g., a function, variable, type, class, etc.).
   * It is derived from DocumentSymbol as defined in the Language Server Protocol (see https://microsoft.github.io/language-server-protocol/specifications/specification-3-14/#textDocument_documentSymbol).
   */
  interface ISymbol {
    __typename: 'Symbol';

    /**
     * The name of the symbol.
     */
    name: string;

    /**
     * The name of the symbol that contains this symbol, if any. This field's value is not guaranteed to be
     * structured in such a way that callers can infer a hierarchy of symbols.
     */
    containerName: string | null;

    /**
     * The kind of the symbol.
     */
    kind: SymbolKind;

    /**
     * The programming language of the symbol.
     */
    language: string;

    /**
     * The location where this symbol is defined.
     */
    location: ILocation;

    /**
     * The URL to this symbol (using the input revision specifier, which may not be immutable).
     */
    url: string;

    /**
     * The canonical URL to this symbol (using an immutable revision specifier).
     */
    canonicalURL: string;

    /**
     * Whether or not the symbol is local to the file it's defined in.
     */
    fileLocal: boolean;
  }

  /**
   * All possible kinds of symbols. This set matches that of the Language Server Protocol
   * (https://microsoft.github.io/language-server-protocol/specification#workspace_symbol).
   */
  const enum SymbolKind {
    UNKNOWN = 'UNKNOWN',
    FILE = 'FILE',
    MODULE = 'MODULE',
    NAMESPACE = 'NAMESPACE',
    PACKAGE = 'PACKAGE',
    CLASS = 'CLASS',
    METHOD = 'METHOD',
    PROPERTY = 'PROPERTY',
    FIELD = 'FIELD',
    CONSTRUCTOR = 'CONSTRUCTOR',
    ENUM = 'ENUM',
    INTERFACE = 'INTERFACE',
    FUNCTION = 'FUNCTION',
    VARIABLE = 'VARIABLE',
    CONSTANT = 'CONSTANT',
    STRING = 'STRING',
    NUMBER = 'NUMBER',
    BOOLEAN = 'BOOLEAN',
    ARRAY = 'ARRAY',
    OBJECT = 'OBJECT',
    KEY = 'KEY',
    NULL = 'NULL',
    ENUMMEMBER = 'ENUMMEMBER',
    STRUCT = 'STRUCT',
    EVENT = 'EVENT',
    OPERATOR = 'OPERATOR',
    TYPEPARAMETER = 'TYPEPARAMETER',
  }

  /**
   * A location inside a resource (in a repository at a specific commit).
   */
  interface ILocation {
    __typename: 'Location';

    /**
     * The file that this location refers to.
     */
    resource: IGitBlob;

    /**
     * The range inside the file that this location refers to.
     */
    range: IRange | null;

    /**
     * The URL to this location (using the input revision specifier, which may not be immutable).
     */
    url: string;

    /**
     * The canonical URL to this location (using an immutable revision specifier).
     */
    canonicalURL: string;
  }

  /**
   * A Git blob in a repository.
   */
  interface IGitBlob {
    __typename: 'GitBlob';

    /**
     * The full path (relative to the repository root) of this blob.
     */
    path: string;

    /**
     * The base name (i.e., file name only) of this blob's path.
     */
    name: string;

    /**
     * False because this is a blob (file), not a directory.
     */
    isDirectory: boolean;

    /**
     * The content of this blob.
     */
    content: string;

    /**
     * The file size in bytes.
     */
    byteSize: number;

    /**
     * Whether or not it is binary.
     */
    binary: boolean;

    /**
     * The blob contents rendered as rich HTML, or an empty string if it is not a supported
     * rich file type.
     * This HTML string is already escaped and thus is always safe to render.
     */
    richHTML: string;

    /**
     * The Git commit containing this blob.
     */
    commit: IGitCommit;

    /**
     * The repository containing this Git blob.
     */
    repository: IRepository;

    /**
     * The URL to this blob (using the input revision specifier, which may not be immutable).
     */
    url: string;

    /**
     * The canonical URL to this blob (using an immutable revision specifier).
     */
    canonicalURL: string;

    /**
     * The URLs to this blob on its repository's external services.
     */
    externalURLs: Array<IExternalLink>;

    /**
     * Blame the blob.
     */
    blame: Array<IHunk>;

    /**
     * Highlight the blob contents.
     */
    highlight: IHighlightedFile;

    /**
     * Submodule metadata if this tree points to a submodule
     */
    submodule: ISubmodule | null;

    /**
     * Symbols defined in this blob.
     */
    symbols: ISymbolConnection;

    /**
     * Always false, since a blob is a file, not directory.
     */
    isSingleChild: boolean;

    /**
     * (experimental) The LSIF API may change substantially in the near future as we
     * continue to adjust it for our use cases. Changes will not be documented in the
     * CHANGELOG during this time.
     * A wrapper around LSIF query methods. If no LSIF upload can be used to answer code
     * intelligence queries for this path-at-revision, this resolves to null.
     */
    lsif: IGitBlobLSIFData | null;
  }

  interface IBlameOnGitBlobArguments {
    startLine: number;
    endLine: number;
  }

  interface IHighlightOnGitBlobArguments {
    disableTimeout: boolean;
    isLightTheme: boolean;

    /**
     * @default false
     */
    highlightLongLines?: boolean | null;
  }

  interface ISymbolsOnGitBlobArguments {
    /**
     * Returns the first n symbols from the list.
     */
    first?: number | null;

    /**
     * Return symbols matching the query.
     */
    query?: string | null;
  }

  interface IIsSingleChildOnGitBlobArguments {
    /**
     * Returns the first n files in the tree.
     */
    first?: number | null;

    /**
     * Recurse into sub-trees.
     * @default false
     */
    recursive?: boolean | null;

    /**
     * Recurse into sub-trees of single-child directories
     * @default false
     */
    recursiveSingleChild?: boolean | null;
  }

  interface ILsifOnGitBlobArguments {
    /**
     * An optional filter for the name of the tool that produced the upload data.
     */
    toolName?: string | null;
  }

  /**
   * A file.
   * In a future version of Sourcegraph, a repository's files may be distinct from a repository's blobs
   * (for example, to support searching/browsing generated files that aren't committed and don't exist
   * as Git blobs). Clients should generally use the GitBlob concrete type and GitCommit.blobs (not
   * GitCommit.files), unless they explicitly want to opt-in to different behavior in the future.
   * INTERNAL: This is temporarily named File2 during a migration. Do not refer to the name File2 in
   * any API clients as the name will change soon.
   */
  type File2 = IGitBlob | IVirtualFile;

  /**
   * A file.
   * In a future version of Sourcegraph, a repository's files may be distinct from a repository's blobs
   * (for example, to support searching/browsing generated files that aren't committed and don't exist
   * as Git blobs). Clients should generally use the GitBlob concrete type and GitCommit.blobs (not
   * GitCommit.files), unless they explicitly want to opt-in to different behavior in the future.
   * INTERNAL: This is temporarily named File2 during a migration. Do not refer to the name File2 in
   * any API clients as the name will change soon.
   */
  interface IFile2 {
    __typename: 'File2';

    /**
     * The full path (relative to the root) of this file.
     */
    path: string;

    /**
     * The base name (i.e., file name only) of this file.
     */
    name: string;

    /**
     * False because this is a file, not a directory.
     */
    isDirectory: boolean;

    /**
     * The content of this file.
     */
    content: string;

    /**
     * The file size in bytes.
     */
    byteSize: number;

    /**
     * Whether or not it is binary.
     */
    binary: boolean;

    /**
     * The file rendered as rich HTML, or an empty string if it is not a supported
     * rich file type.
     * This HTML string is already escaped and thus is always safe to render.
     */
    richHTML: string;

    /**
     * The URL to this file (using the input revision specifier, which may not be immutable).
     */
    url: string;

    /**
     * The canonical URL to this file (using an immutable revision specifier).
     */
    canonicalURL: string;

    /**
     * The URLs to this file on external services.
     */
    externalURLs: Array<IExternalLink>;

    /**
     * Highlight the file.
     */
    highlight: IHighlightedFile;
  }

  interface IHighlightOnFile2Arguments {
    disableTimeout: boolean;
    isLightTheme: boolean;

    /**
     * If highlightLongLines is true, lines which are longer than 2000 bytes are highlighted.
     * 2000 bytes is enabled. This may produce a significant amount of HTML
     * which some browsers (such as Chrome, but not Firefox) may have trouble
     * rendering efficiently.
     * @default false
     */
    highlightLongLines?: boolean | null;
  }

  /**
   * A highlighted file.
   */
  interface IHighlightedFile {
    __typename: 'HighlightedFile';

    /**
     * Whether or not it was aborted.
     */
    aborted: boolean;

    /**
     * The HTML.
     */
    html: string;
  }

  /**
   * A hunk.
   */
  interface IHunk {
    __typename: 'Hunk';

    /**
     * The startLine.
     */
    startLine: number;

    /**
     * The endLine.
     */
    endLine: number;

    /**
     * The startByte.
     */
    startByte: number;

    /**
     * The endByte.
     */
    endByte: number;

    /**
     * The rev.
     */
    rev: string;

    /**
     * The author.
     */
    author: ISignature;

    /**
     * The message.
     */
    message: string;

    /**
     * The commit that contains the hunk.
     */
    commit: IGitCommit;
  }

  /**
   * A Git submodule
   */
  interface ISubmodule {
    __typename: 'Submodule';

    /**
     * The remote repository URL of the submodule.
     */
    url: string;

    /**
     * The commit of the submodule.
     */
    commit: string;

    /**
     * The path to which the submodule is checked out.
     */
    path: string;
  }

  /**
   * A wrapper object around LSIF query methods for a particular path-at-revision. When this node is
   * null, no LSIF data is available for containing git blob.
   */
  interface IGitBlobLSIFData {
    __typename: 'GitBlobLSIFData';

    /**
     * (experimental) The LSIF API may change substantially in the near future as we
     * continue to adjust it for our use cases. Changes will not be documented in the
     * CHANGELOG during this time.
     * Get aggregated local code intelligence for all ranges that fall in the window
     * indicated by the given zero-based start (inclusive) and end (exclusive) lines.
     * The associated data for each range is "local", in that the locations and hover
     * must also be defined in the same index as the source range. To get cross-repository
     * and cross-bundle results, you must query the definitions, references, and hovers
     * of that range explicitly.
     */
    ranges: ICodeIntelligenceRangeConnection | null;

    /**
     * (experimental) The LSIF API may change substantially in the near future as we
     * continue to adjust it for our use cases. Changes will not be documented in the
     * CHANGELOG during this time.
     * A list of definitions of the symbol under the given document position.
     */
    definitions: ILocationConnection;

    /**
     * (experimental) The LSIF API may change substantially in the near future as we
     * continue to adjust it for our use cases. Changes will not be documented in the
     * CHANGELOG during this time.
     * A list of references of the symbol under the given document position.
     */
    references: ILocationConnection;

    /**
     * (experimental) The LSIF API may change substantially in the near future as we
     * continue to adjust it for our use cases. Changes will not be documented in the
     * CHANGELOG during this time.
     * The hover result of the symbol under the given document position.
     */
    hover: IHover | null;

    /**
     * (experimental) The LSIF API may change substantially in the near future as we
     * continue to adjust it for our use cases. Changes will not be documented in the
     * CHANGELOG during this time.
     * Code diagnostics provided through LSIF.
     */
    diagnostics: IDiagnosticConnection;
  }

  interface IRangesOnGitBlobLSIFDataArguments {
    startLine: number;
    endLine: number;
  }

  interface IDefinitionsOnGitBlobLSIFDataArguments {
    /**
     * The line on which the symbol occurs (zero-based, inclusive).
     */
    line: number;

    /**
     * The character (not byte) of the start line on which the symbol occurs (zero-based, inclusive).
     */
    character: number;
  }

  interface IReferencesOnGitBlobLSIFDataArguments {
    /**
     * The line on which the symbol occurs (zero-based, inclusive).
     */
    line: number;

    /**
     * The character (not byte) of the start line on which the symbol occurs (zero-based, inclusive).
     */
    character: number;

    /**
     * When specified, indicates that this request should be paginated and
     * to fetch results starting at this cursor.
     * A future request can be made for more results by passing in the
     * 'LocationConnection.pageInfo.endCursor' that is returned.
     */
    after?: string | null;

    /**
     * When specified, indicates that this request should be paginated and
     * the first N results (relative to the cursor) should be returned. i.e.
     * how many results to return per page.
     */
    first?: number | null;
  }

  interface IHoverOnGitBlobLSIFDataArguments {
    /**
     * The line on which the symbol occurs (zero-based, inclusive).
     */
    line: number;

    /**
     * The character (not byte) of the start line on which the symbol occurs (zero-based, inclusive).
     */
    character: number;
  }

  interface IDiagnosticsOnGitBlobLSIFDataArguments {
    first?: number | null;
  }

  /**
   * LSIF data available for a tree entry.
   */
  type TreeEntryLSIFData = IGitBlobLSIFData;

  /**
   * LSIF data available for a tree entry.
   */
  interface ITreeEntryLSIFData {
    __typename: 'TreeEntryLSIFData';

    /**
     * Code diagnostics provided through LSIF.
     */
    diagnostics: IDiagnosticConnection;
  }

  interface IDiagnosticsOnTreeEntryLSIFDataArguments {
    first?: number | null;
  }

  /**
   * A list of diagnostics.
   */
  interface IDiagnosticConnection {
    __typename: 'DiagnosticConnection';

    /**
     * A list of diagnostics.
     */
    nodes: Array<IDiagnostic>;

    /**
     * The total count of diagnostics (which may be larger than nodes.length if the connection is paginated).
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * Represents a diagnostic, such as a compiler error or warning.
   */
  interface IDiagnostic {
    __typename: 'Diagnostic';

    /**
     * The location at which the message applies.
     */
    location: ILocation;

    /**
     * The diagnostic's severity.
     */
    severity: DiagnosticSeverity | null;

    /**
     * The diagnostic's code as provided by the tool.
     */
    code: string | null;

    /**
     * A human-readable string describing the source of this
     * diagnostic, e.g. "typescript" or "super lint".
     */
    source: string | null;

    /**
     * The diagnostic's message.
     */
    message: string | null;
  }

  /**
   * Represents the severity level of a diagnostic.
   */
  const enum DiagnosticSeverity {
    ERROR = 'ERROR',
    WARNING = 'WARNING',
    INFORMATION = 'INFORMATION',
    HINT = 'HINT',
  }

  /**
   * Aggregate local code intelligence for all ranges that fall between a window of lines in a document.
   */
  interface ICodeIntelligenceRangeConnection {
    __typename: 'CodeIntelligenceRangeConnection';

    /**
     * Aggregate local code intelligence grouped by range.
     */
    nodes: Array<ICodeIntelligenceRange>;
  }

  /**
   * Aggregate code intelligence for a particular range within a document.
   */
  interface ICodeIntelligenceRange {
    __typename: 'CodeIntelligenceRange';

    /**
     * The range this code intelligence applies to.
     */
    range: IRange;

    /**
     * A list of definitions of the symbol occurring within the range.
     */
    definitions: ILocationConnection;

    /**
     * A list of references of the symbol occurring within the range.
     */
    references: ILocationConnection;

    /**
     * The hover result of the symbol occurring within the range.
     */
    hover: IHover | null;
  }

  /**
   * A range inside a file. The start position is inclusive, and the end position is exclusive.
   */
  interface IRange {
    __typename: 'Range';

    /**
     * The start position of the range (inclusive).
     */
    start: IPosition;

    /**
     * The end position of the range (exclusive).
     */
    end: IPosition;
  }

  /**
   * A zero-based position inside a file.
   */
  interface IPosition {
    __typename: 'Position';

    /**
     * The line number (zero-based) of the position.
     */
    line: number;

    /**
     * The character offset (zero-based) in the line of the position.
     */
    character: number;
  }

  /**
   * A list of locations within a file.
   */
  interface ILocationConnection {
    __typename: 'LocationConnection';

    /**
     * A list of locations within a file.
     */
    nodes: Array<ILocation>;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * Hover range and markdown content.
   */
  interface IHover {
    __typename: 'Hover';

    /**
     * A markdown string containing the contents of the hover.
     */
    markdown: IMarkdown;

    /**
     * The range to highlight.
     */
    range: IRange;
  }

  /**
   * File is temporarily preserved for backcompat with browser extension search API client code.
   */
  interface IFile {
    __typename: 'File';

    /**
     * The full path (relative to the repository root) of this file.
     */
    path: string;

    /**
     * The base name (i.e., file name only) of this file's path.
     */
    name: string;

    /**
     * Whether this is a directory.
     */
    isDirectory: boolean;

    /**
     * The URL to this file on Sourcegraph.
     */
    url: string;

    /**
     * The repository that contains this file.
     */
    repository: IRepository;
  }

  /**
   * Statistics about a language's usage.
   */
  interface ILanguageStatistics {
    __typename: 'LanguageStatistics';

    /**
     * The name of the language.
     */
    name: string;

    /**
     * The total bytes in the language.
     */
    totalBytes: number;

    /**
     * The total number of lines in the language.
     */
    totalLines: number;
  }

  /**
   * A list of Git commits.
   */
  interface IGitCommitConnection {
    __typename: 'GitCommitConnection';

    /**
     * A list of Git commits.
     */
    nodes: Array<IGitCommit>;

    /**
     * The total number of Git commits in the connection. If the GitCommitConnection is paginated
     * (e.g., because a "first" parameter was provided to the field that produced it), this field is
     * null to avoid it taking unexpectedly long to compute the total count. Remove the pagination
     * parameters to obtain a non-null value for this field.
     */
    totalCount: number | null;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * A set of Git behind/ahead counts for one commit relative to another.
   */
  interface IBehindAheadCounts {
    __typename: 'BehindAheadCounts';

    /**
     * The number of commits behind the other commit.
     */
    behind: number;

    /**
     * The number of commits ahead of the other commit.
     */
    ahead: number;
  }

  /**
   * Information and status about the mirroring of a repository. In this case, the remote source repository
   * is external to Sourcegraph and the mirror is maintained by the Sourcegraph site (not the other way
   * around).
   */
  interface IMirrorRepositoryInfo {
    __typename: 'MirrorRepositoryInfo';

    /**
     * The URL of the remote source repository.
     */
    remoteURL: string;

    /**
     * Whether the clone of the repository has begun but not yet completed.
     */
    cloneInProgress: boolean;

    /**
     * A single line of text that contains progress information for the running clone command.
     * The format of the progress text is not specified.
     * It is intended to be displayed directly to a user.
     * e.g.
     * "Receiving objects:  95% (2041/2148), 292.01 KiB | 515.00 KiB/s"
     * "Resolving deltas:   9% (117/1263)"
     */
    cloneProgress: string | null;

    /**
     * Whether the repository has ever been successfully cloned.
     */
    cloned: boolean;

    /**
     * When the repository was last successfully updated from the remote source repository..
     */
    updatedAt: any | null;

    /**
     * The state of this repository in the update schedule.
     */
    updateSchedule: IUpdateSchedule | null;

    /**
     * The state of this repository in the update queue.
     */
    updateQueue: IUpdateQueue | null;
  }

  /**
   * The state of a repository in the update schedule.
   */
  interface IUpdateSchedule {
    __typename: 'UpdateSchedule';

    /**
     * The interval that was used when scheduling the current due time.
     */
    intervalSeconds: number;

    /**
     * The next time that the repo will be inserted into the update queue.
     */
    due: any;

    /**
     * The index of the repo in the schedule.
     */
    index: number;

    /**
     * The total number of repos in the schedule.
     */
    total: number;
  }

  /**
   * The state of a repository in the update queue.
   */
  interface IUpdateQueue {
    __typename: 'UpdateQueue';

    /**
     * The index of the repo in the update queue.
     * Updating repos are placed at the end of the queue until they finish updating
     * so don't display this if updating is true.
     */
    index: number;

    /**
     * True if the repo is currently updating.
     */
    updating: boolean;

    /**
     * The total number of repos in the update queue (including updating repos).
     */
    total: number;
  }

  /**
   * A repository on an external service (such as GitHub, GitLab, Phabricator, etc.).
   */
  interface IExternalRepository {
    __typename: 'ExternalRepository';

    /**
     * The repository's ID on the external service.
     * Example: For GitHub, this is the GitHub GraphQL API's node ID for the repository.
     */
    id: string;

    /**
     * The type of external service where this repository resides.
     * Example: "github", "gitlab", etc.
     */
    serviceType: string;

    /**
     * The particular instance of the external service where this repository resides. Its value is
     * opaque but typically consists of the canonical base URL to the service.
     * Example: For GitHub.com, this is "https://github.com/".
     */
    serviceID: string;
  }

  /**
   * A list of external services.
   */
  interface IExternalServiceConnection {
    __typename: 'ExternalServiceConnection';

    /**
     * A list of external services.
     */
    nodes: Array<IExternalService>;

    /**
     * The total number of external services in the connection.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * A configured external service.
   */
  interface IExternalService {
    __typename: 'ExternalService';

    /**
     * The external service's unique ID.
     */
    id: string;

    /**
     * The kind of external service.
     */
    kind: ExternalServiceKind;

    /**
     * The display name of the external service.
     */
    displayName: string;

    /**
     * The JSON configuration of the external service.
     */
    config: any;

    /**
     * When the external service was created.
     */
    createdAt: any;

    /**
     * When the external service was last updated.
     */
    updatedAt: any;

    /**
     * The namespace this external service belongs to.
     */
    namespace: string | null;

    /**
     * An optional URL that will be populated when webhooks have been configured for the external service.
     */
    webhookURL: string | null;

    /**
     * This is an optional field that's populated when we ran into errors on the
     * backend side when trying to create/update an ExternalService, but the
     * create/update still succeeded.
     * It is a field on ExternalService instead of a separate thing in order to
     * not break the API and stay backwards compatible.
     */
    warning: string | null;
  }

  /**
   * A specific kind of external service.
   */
  const enum ExternalServiceKind {
    AWSCODECOMMIT = 'AWSCODECOMMIT',
    BITBUCKETCLOUD = 'BITBUCKETCLOUD',
    BITBUCKETSERVER = 'BITBUCKETSERVER',
    GITHUB = 'GITHUB',
    GITLAB = 'GITLAB',
    GITOLITE = 'GITOLITE',
    PHABRICATOR = 'PHABRICATOR',
    OTHER = 'OTHER',
  }

  /**
   * Information about a repository's text search index.
   */
  interface IRepositoryTextSearchIndex {
    __typename: 'RepositoryTextSearchIndex';

    /**
     * The indexed repository.
     */
    repository: IRepository;

    /**
     * The status of the text search index, if available.
     */
    status: IRepositoryTextSearchIndexStatus | null;

    /**
     * Git refs in the repository that are configured for text search indexing.
     */
    refs: Array<IRepositoryTextSearchIndexedRef>;
  }

  /**
   * The status of a repository's text search index.
   */
  interface IRepositoryTextSearchIndexStatus {
    __typename: 'RepositoryTextSearchIndexStatus';

    /**
     * The date that the index was last updated.
     */
    updatedAt: any;

    /**
     * The byte size of the original content.
     */
    contentByteSize: number;

    /**
     * The number of files in the original content.
     */
    contentFilesCount: number;

    /**
     * The byte size of the index.
     */
    indexByteSize: number;

    /**
     * The number of index shards.
     */
    indexShardsCount: number;

    /**
     * EXPERIMENTAL: The number of newlines appearing in the index.
     */
    newLinesCount: number;

    /**
     * EXPERIMENTAL: The number of newlines in the default branch.
     */
    defaultBranchNewLinesCount: number;

    /**
     * EXPERIMENTAL: The number of newlines in the other branches.
     */
    otherBranchesNewLinesCount: number;
  }

  /**
   * A Git ref (usually a branch) in a repository that is configured to be indexed for text search.
   */
  interface IRepositoryTextSearchIndexedRef {
    __typename: 'RepositoryTextSearchIndexedRef';

    /**
     * The Git ref (usually a branch) that is configured to be indexed for text search. To find the specific commit
     * SHA that was indexed, use RepositoryTextSearchIndexedRef.indexedCommit; this field's ref target resolves to
     * the current target, not the target at the time of indexing.
     */
    ref: IGitRef;

    /**
     * Whether a text search index exists for this ref.
     */
    indexed: boolean;

    /**
     * Whether the text search index is of the current commit for the Git ref. If false, the index is stale.
     */
    current: boolean;

    /**
     * The indexed Git commit (which may differ from the ref's current target if the index is out of date). If
     * indexed is false, this field's value is null.
     */
    indexedCommit: IGitObject | null;
  }

  /**
   * A Git ref.
   */
  interface IGitRef {
    __typename: 'GitRef';

    /**
     * The globally addressable ID for the Git ref.
     */
    id: string;

    /**
     * The full ref name (e.g., "refs/heads/mybranch" or "refs/tags/mytag").
     */
    name: string;

    /**
     * An unambiguous short name for the ref.
     */
    abbrevName: string;

    /**
     * The display name of the ref. For branches ("refs/heads/foo"), this is the branch
     * name ("foo").
     * As a special case, for GitHub pull request refs of the form refs/pull/NUMBER/head,
     * this is "NUMBER".
     */
    displayName: string;

    /**
     * The prefix of the ref, either "", "refs/", "refs/heads/", "refs/pull/", or
     * "refs/tags/". This prefix is always a prefix of the ref's name.
     */
    prefix: string;

    /**
     * The type of this Git ref.
     */
    type: GitRefType;

    /**
     * The object that the ref points to.
     */
    target: IGitObject;

    /**
     * The associated repository.
     */
    repository: IRepository;

    /**
     * The URL to this Git ref.
     */
    url: string;
  }

  /**
   * All possible types of Git refs.
   */
  const enum GitRefType {
    /**
     * A Git branch (in refs/heads/).
     */
    GIT_BRANCH = 'GIT_BRANCH',

    /**
     * A Git tag (in refs/tags/).
     */
    GIT_TAG = 'GIT_TAG',

    /**
     * A Git ref that is neither a branch nor tag.
     */
    GIT_REF_OTHER = 'GIT_REF_OTHER',
  }

  /**
   * A Git object.
   */
  interface IGitObject {
    __typename: 'GitObject';

    /**
     * This object's OID.
     */
    oid: any;

    /**
     * The abbreviated form of this object's OID.
     */
    abbreviatedOID: string;

    /**
     * The commit object, if it is a commit and it exists; otherwise null.
     */
    commit: IGitCommit | null;

    /**
     * The Git object's type.
     */
    type: GitObjectType;
  }

  /**
   * All possible types of Git objects.
   */
  const enum GitObjectType {
    /**
     * A Git commit object.
     */
    GIT_COMMIT = 'GIT_COMMIT',

    /**
     * A Git tag object.
     */
    GIT_TAG = 'GIT_TAG',

    /**
     * A Git tree object.
     */
    GIT_TREE = 'GIT_TREE',

    /**
     * A Git blob object.
     */
    GIT_BLOB = 'GIT_BLOB',

    /**
     * A Git object of unknown type.
     */
    GIT_UNKNOWN = 'GIT_UNKNOWN',
  }

  /**
   * Ordering options for Git refs.
   */
  const enum GitRefOrder {
    /**
     * By the authored or committed at date, whichever is more recent.
     */
    AUTHORED_OR_COMMITTED_AT = 'AUTHORED_OR_COMMITTED_AT',
  }

  /**
   * A list of Git refs.
   */
  interface IGitRefConnection {
    __typename: 'GitRefConnection';

    /**
     * A list of Git refs.
     */
    nodes: Array<IGitRef>;

    /**
     * The total count of Git refs in the connection. This total count may be larger
     * than the number of nodes in this object when the result is paginated.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * The differences between two concrete Git commits in a repository.
   */
  interface IRepositoryComparison {
    __typename: 'RepositoryComparison';

    /**
     * The repository that is the base (left-hand side) of this comparison.
     */
    baseRepository: IRepository;

    /**
     * The repository that is the head (right-hand side) of this comparison. Cross-repository
     * comparisons are not yet supported, so this is always equal to
     * RepositoryComparison.baseRepository.
     */
    headRepository: IRepository;

    /**
     * The range that this comparison represents.
     */
    range: IGitRevisionRange;

    /**
     * The commits in the comparison range, excluding the base and including the head.
     */
    commits: IGitCommitConnection;

    /**
     * The file diffs for each changed file.
     */
    fileDiffs: IFileDiffConnection;
  }

  interface ICommitsOnRepositoryComparisonArguments {
    /**
     * Return the first n commits from the list.
     */
    first?: number | null;
  }

  interface IFileDiffsOnRepositoryComparisonArguments {
    /**
     * Return the first n file diffs from the list.
     */
    first?: number | null;

    /**
     * Return file diffs after the given cursor.
     */
    after?: string | null;
  }

  /**
   * A Git revision range of the form "base..head" or "base...head". Other revision
   * range formats are not supported.
   */
  interface IGitRevisionRange {
    __typename: 'GitRevisionRange';

    /**
     * The Git revision range expression of the form "base..head" or "base...head".
     */
    expr: string;

    /**
     * The base (left-hand side) of the range.
     */
    base: GitRevSpec;

    /**
     * The base's revspec as an expression.
     */
    baseRevSpec: IGitRevSpecExpr;

    /**
     * The head (right-hand side) of the range.
     */
    head: GitRevSpec;

    /**
     * The head's revspec as an expression.
     */
    headRevSpec: IGitRevSpecExpr;

    /**
     * The merge-base of the base and head revisions, if this is a "base...head"
     * revision range. If this is a "base..head" revision range, then this field is null.
     */
    mergeBase: IGitObject | null;
  }

  /**
   * A Git revspec.
   */
  type GitRevSpec = IGitRef | IGitRevSpecExpr | IGitObject;

  /**
   * A Git revspec expression that (possibly) resolves to a Git revision.
   */
  interface IGitRevSpecExpr {
    __typename: 'GitRevSpecExpr';

    /**
     * The original Git revspec expression.
     */
    expr: string;

    /**
     * The Git object that the revspec resolves to, or null otherwise.
     */
    object: IGitObject | null;
  }

  /**
   * A list of file diffs.
   */
  interface IFileDiffConnection {
    __typename: 'FileDiffConnection';

    /**
     * A list of file diffs.
     */
    nodes: Array<IFileDiff>;

    /**
     * The total count of file diffs in the connection, if available. This total count may be larger than the number
     * of nodes in this object when the result is paginated.
     */
    totalCount: number | null;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;

    /**
     * The diff stat for the file diffs in this object, which may be a subset of the entire diff if the result is
     * paginated.
     */
    diffStat: IDiffStat;

    /**
     * The raw diff for the file diffs in this object, which may be a subset of the entire diff if the result is
     * paginated.
     */
    rawDiff: string;
  }

  /**
   * A diff for a single file.
   */
  interface IFileDiff {
    __typename: 'FileDiff';

    /**
     * The old (original) path of the file, or null if the file was added.
     */
    oldPath: string | null;

    /**
     * The old file, or null if the file was created (oldFile.path == oldPath).
     */
    oldFile: File2 | null;

    /**
     * The new (changed) path of the file, or null if the file was deleted.
     */
    newPath: string | null;

    /**
     * The new file, or null if the file was deleted (newFile.path == newPath).
     */
    newFile: File2 | null;

    /**
     * The old file (if the file was deleted) and otherwise the new file. This file field is typically used by
     * clients that want to show a "View" link to the file.
     */
    mostRelevantFile: File2;

    /**
     * Hunks that were changed from old to new.
     */
    hunks: Array<IFileDiffHunk>;

    /**
     * The diff stat for the whole file.
     */
    stat: IDiffStat;

    /**
     * FOR INTERNAL USE ONLY.
     * An identifier for the file diff that is unique among all other file diffs in the list that
     * contains it.
     */
    internalID: string;
  }

  /**
   * A changed region ("hunk") in a file diff.
   */
  interface IFileDiffHunk {
    __typename: 'FileDiffHunk';

    /**
     * The range of the old file that the hunk applies to.
     */
    oldRange: IFileDiffHunkRange;

    /**
     * Whether the old file had a trailing newline.
     */
    oldNoNewlineAt: boolean;

    /**
     * The range of the new file that the hunk applies to.
     */
    newRange: IFileDiffHunkRange;

    /**
     * The diff hunk section heading, if any.
     */
    section: string | null;

    /**
     * The hunk body, with lines prefixed with '-', '+', or ' '.
     */
    body: string;

    /**
     * Highlight the hunk.
     */
    highlight: IHighlightedDiffHunkBody;
  }

  interface IHighlightOnFileDiffHunkArguments {
    disableTimeout: boolean;
    isLightTheme: boolean;

    /**
     * If highlightLongLines is true, lines which are longer than 2000 bytes are highlighted.
     * 2000 bytes is enabled. This may produce a significant amount of HTML
     * which some browsers (such as Chrome, but not Firefox) may have trouble
     * rendering efficiently.
     * @default false
     */
    highlightLongLines?: boolean | null;
  }

  /**
   * A hunk range in one side (old/new) of a diff.
   */
  interface IFileDiffHunkRange {
    __typename: 'FileDiffHunkRange';

    /**
     * The first line that the hunk applies to.
     */
    startLine: number;

    /**
     * The number of lines that the hunk applies to.
     */
    lines: number;
  }

  /**
   * A highlighted hunk, consisting of all its lines.
   */
  interface IHighlightedDiffHunkBody {
    __typename: 'HighlightedDiffHunkBody';

    /**
     * Whether highlighting was aborted.
     */
    aborted: boolean;

    /**
     * The highlighted lines.
     */
    lines: Array<IHighlightedDiffHunkLine>;
  }

  /**
   * A single highlighted line, including the kind of line.
   */
  interface IHighlightedDiffHunkLine {
    __typename: 'HighlightedDiffHunkLine';

    /**
     * The HTML containing the syntax-highlighted line of code.
     */
    html: string;

    /**
     * The operation that happened on this line, in patches it is prefixed with '+', '-', ' '.
     * Can be either add, delete, or no change.
     */
    kind: DiffHunkLineType;
  }

  /**
   * The type of content in a hunk line.
   */
  const enum DiffHunkLineType {
    /**
     * Added line.
     */
    ADDED = 'ADDED',

    /**
     * Unchanged line.
     */
    UNCHANGED = 'UNCHANGED',

    /**
     * Deleted line.
     */
    DELETED = 'DELETED',
  }

  /**
   * A list of contributors to a repository.
   */
  interface IRepositoryContributorConnection {
    __typename: 'RepositoryContributorConnection';

    /**
     * A list of contributors to a repository.
     */
    nodes: Array<IRepositoryContributor>;

    /**
     * The total count of contributors in the connection, if available. This total count may be larger than the
     * number of nodes in this object when the result is paginated.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * A contributor to a repository.
   */
  interface IRepositoryContributor {
    __typename: 'RepositoryContributor';

    /**
     * The personal information for the contributor.
     */
    person: IPerson;

    /**
     * The number of contributions made by this contributor.
     */
    count: number;

    /**
     * The repository in which the contributions occurred.
     */
    repository: IRepository;

    /**
     * Commits by the contributor.
     */
    commits: IGitCommitConnection;
  }

  interface ICommitsOnRepositoryContributorArguments {
    /**
     * Return the first n commits.
     */
    first?: number | null;
  }

  /**
   * The state an LSIF upload can be in.
   */
  const enum LSIFUploadState {
    /**
     * This upload is being processed.
     */
    PROCESSING = 'PROCESSING',

    /**
     * This upload failed to be processed.
     */
    ERRORED = 'ERRORED',

    /**
     * This upload was processed successfully.
     */
    COMPLETED = 'COMPLETED',

    /**
     * This upload is queued to be processed later.
     */
    QUEUED = 'QUEUED',

    /**
     * This upload is currently being transferred to Sourcegraph.
     */
    UPLOADING = 'UPLOADING',
  }

  /**
   * A list of LSIF uploads.
   */
  interface ILSIFUploadConnection {
    __typename: 'LSIFUploadConnection';

    /**
     * A list of LSIF uploads.
     */
    nodes: Array<ILSIFUpload>;

    /**
     * The total number of uploads in this result set.
     */
    totalCount: number | null;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * Metadata and status about an LSIF upload.
   */
  interface ILSIFUpload {
    __typename: 'LSIFUpload';

    /**
     * The ID.
     */
    id: string;

    /**
     * The project for which this upload provides code intelligence.
     */
    projectRoot: IGitTree | null;

    /**
     * The original 40-character commit commit supplied at upload time.
     */
    inputCommit: string;

    /**
     * The original root supplied at upload time.
     */
    inputRoot: string;

    /**
     * The original indexer name supplied at upload time.
     */
    inputIndexer: string;

    /**
     * The upload's current state.
     */
    state: LSIFUploadState;

    /**
     * The time the upload was uploaded.
     */
    uploadedAt: any;

    /**
     * The time the upload was processed.
     */
    startedAt: any | null;

    /**
     * The time the upload compelted or errored.
     */
    finishedAt: any | null;

    /**
     * The processing error message (not set if state is not ERRORED).
     */
    failure: string | null;

    /**
     * Whether or not this upload provides intelligence for the tip of the default branch. Find reference
     * queries will return symbols from remote repositories only when this property is true. This property
     * is updated asynchronously and is eventually consistent with the git data known by the Sourcegraph
     * instance.
     */
    isLatestForRepo: boolean;

    /**
     * The rank of this upload in the queue. The value of this field is null if the upload has been processed.
     */
    placeInQueue: number | null;
  }

  /**
   * The state an LSIF index can be in.
   */
  const enum LSIFIndexState {
    /**
     * This index is being processed.
     */
    PROCESSING = 'PROCESSING',

    /**
     * This index failed to be processed.
     */
    ERRORED = 'ERRORED',

    /**
     * This index was processed successfully.
     */
    COMPLETED = 'COMPLETED',

    /**
     * This index is queued to be processed later.
     */
    QUEUED = 'QUEUED',
  }

  /**
   * A list of LSIF indexes.
   */
  interface ILSIFIndexConnection {
    __typename: 'LSIFIndexConnection';

    /**
     * A list of LSIF indexes.
     */
    nodes: Array<ILSIFIndex>;

    /**
     * The total number of indexes in this result set.
     */
    totalCount: number | null;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * Metadata and status about an LSIF index.
   */
  interface ILSIFIndex {
    __typename: 'LSIFIndex';

    /**
     * The ID.
     */
    id: string;

    /**
     * The project for which this upload provides code intelligence.
     */
    projectRoot: IGitTree | null;

    /**
     * The original 40-character commit commit supplied at index time.
     */
    inputCommit: string;

    /**
     * The index's current state.
     */
    state: LSIFIndexState;

    /**
     * The time the index was queued.
     */
    queuedAt: any;

    /**
     * The time the index was processed.
     */
    startedAt: any | null;

    /**
     * The time the index compelted or errored.
     */
    finishedAt: any | null;

    /**
     * The processing error message (not set if state is not ERRORED).
     */
    failure: string | null;

    /**
     * The rank of this index in the queue. The value of this field is null if the index has been processed.
     */
    placeInQueue: number | null;
  }

  /**
   * A repository or a link to another Sourcegraph instance location where this repository may be located.
   */
  type RepositoryRedirect = IRepository | IRedirect;

  /**
   * A reference to another Sourcegraph instance.
   */
  interface IRedirect {
    __typename: 'Redirect';

    /**
     * The URL of the other Sourcegraph instance.
     */
    url: string;
  }

  /**
   * RepositoryOrderBy enumerates the ways a repositories list can be ordered.
   */
  const enum RepositoryOrderBy {
    REPOSITORY_NAME = 'REPOSITORY_NAME',
    REPO_CREATED_AT = 'REPO_CREATED_AT',

    /**
     * deprecated (use the equivalent REPOSITORY_CREATED_AT)
     */
    REPOSITORY_CREATED_AT = 'REPOSITORY_CREATED_AT',
  }

  /**
   * A list of repositories.
   */
  interface IRepositoryConnection {
    __typename: 'RepositoryConnection';

    /**
     * A list of repositories.
     */
    nodes: Array<IRepository>;

    /**
     * The total count of repositories in the connection. This total count may be larger
     * than the number of nodes in this object when the result is paginated.
     * This requires admin permissions and will return null for all non-admin users.
     * In some cases, the total count can't be computed quickly; if so, it is null. Pass
     * precise: true to always compute total counts even if it takes a while.
     */
    totalCount: number | null;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  interface ITotalCountOnRepositoryConnectionArguments {
    /**
     * @default false
     */
    precise?: boolean | null;
  }

  /**
   * A Phabricator repository.
   */
  interface IPhabricatorRepo {
    __typename: 'PhabricatorRepo';

    /**
     * The canonical repo name (e.g. "github.com/gorilla/mux").
     */
    name: string;

    /**
     * An alias for name.
     * @deprecated "use name instead"
     */
    uri: string;

    /**
     * The unique Phabricator identifier for the repo, like "MUX"
     */
    callsign: string;

    /**
     * The URL to the phabricator instance (e.g. http://phabricator.sgdev.org)
     */
    url: string;
  }

  /**
   * A period of time in which a set of users have been active.
   */
  const enum UserActivePeriod {
    /**
     * Since today at 00:00 UTC.
     */
    TODAY = 'TODAY',

    /**
     * Since the latest Monday at 00:00 UTC.
     */
    THIS_WEEK = 'THIS_WEEK',

    /**
     * Since the first day of the current month at 00:00 UTC.
     */
    THIS_MONTH = 'THIS_MONTH',

    /**
     * All time.
     */
    ALL_TIME = 'ALL_TIME',
  }

  /**
   * Describes options for rendering Markdown.
   */
  interface IMarkdownOptions {
    /**
     * A dummy null value (empty input types are not allowed yet).
     */
    alwaysNil?: string | null;
  }

  /**
   * Configuration details for the browser extension, editor extensions, etc.
   */
  interface IClientConfigurationDetails {
    __typename: 'ClientConfigurationDetails';

    /**
     * The list of phabricator/gitlab/bitbucket/etc instance URLs that specifies which pages the content script will be injected into.
     */
    contentScriptUrls: Array<string>;

    /**
     * Returns details about the parent Sourcegraph instance.
     */
    parentSourcegraph: IParentSourcegraphDetails;
  }

  /**
   * Parent Sourcegraph instance
   */
  interface IParentSourcegraphDetails {
    __typename: 'ParentSourcegraphDetails';

    /**
     * Sourcegraph instance URL.
     */
    url: string;
  }

  /**
   * Predefined suggestions for search filters when backfill.
   */
  interface ISearchFilterSuggestions {
    __typename: 'SearchFilterSuggestions';

    /**
     * The suggestions for search filter "repogroup:".
     */
    repogroup: Array<string>;

    /**
     * The suggestions for search filter "repo:".
     */
    repo: Array<string>;
  }

  /**
   * The version of the search syntax.
   */
  const enum SearchVersion {
    /**
     * Search syntax that defaults to regexp search.
     */
    V1 = 'V1',

    /**
     * Search syntax that defaults to literal search.
     */
    V2 = 'V2',
  }

  /**
   * The search pattern type.
   */
  const enum SearchPatternType {
    literal = 'literal',
    regexp = 'regexp',
    structural = 'structural',
  }

  /**
   * A search.
   */
  interface ISearch {
    __typename: 'Search';

    /**
     * The results.
     */
    results: ISearchResults;

    /**
     * The suggestions.
     */
    suggestions: Array<SearchSuggestion>;

    /**
     * A subset of results (excluding actual search results) which are heavily
     * cached and thus quicker to query. Useful for e.g. querying sparkline
     * data.
     */
    stats: ISearchResultsStats;
  }

  interface ISuggestionsOnSearchArguments {
    first?: number | null;
  }

  /**
   * Search results.
   */
  interface ISearchResults {
    __typename: 'SearchResults';

    /**
     * The results. Inside each SearchResult there may be multiple matches, e.g.
     * a FileMatch may contain multiple line matches.
     */
    results: Array<SearchResult>;

    /**
     * The total number of matches returned by this search. This is different
     * than the length of the results array in that e.g. a single results array
     * entry may contain multiple matches. For example, the results array may
     * contain two file matches and this field would report 6 ("3 line matches
     * per file") while the length of the results array would report 3
     * ("3 FileMatch results").
     * Typically, 'approximateResultCount', not this field, is shown to users.
     */
    matchCount: number;

    /**
     * DEPRECATED: Renamed to 'matchCount' for less ambiguity.
     * @deprecated "renamed to matchCount for less ambiguity"
     */
    resultCount: number;

    /**
     * The approximate number of results. This is like the length of the results
     * array, except it can indicate the number of results regardless of whether
     * or not the limit was hit. Currently, this is represented as e.g. "5+"
     * results.
     * This string is typically shown to users to indicate the true result count.
     */
    approximateResultCount: string;

    /**
     * Whether or not the results limit was hit.
     * In paginated requests, this field is always false. Use 'pageInfo.hasNextPage' instead.
     */
    limitHit: boolean;

    /**
     * Integers representing the sparkline for the search results.
     */
    sparkline: Array<number>;

    /**
     * Repositories that were eligible to be searched.
     */
    repositories: Array<IRepository>;

    /**
     * The number of repositories that were eligible to be searched (for clients
     * that just wish to know how many without querying the, sometimes extremely
     * large, list).
     */
    repositoriesCount: number;

    /**
     * Repositories that were actually searched. Excludes repositories that would have been searched but were not
     * because a timeout or error occurred while performing the search, or because the result limit was already
     * reached, or because they were excluded due to being forks or archives.
     * In paginated search requests, this represents the set of repositories searched for the
     * individual paginated request / input cursor and not the global set of repositories that
     * would be searched if further requests were made.
     */
    repositoriesSearched: Array<IRepository>;

    /**
     * Indexed repositories searched. This is a subset of repositoriesSearched.
     */
    indexedRepositoriesSearched: Array<IRepository>;

    /**
     * Repositories that are busy cloning onto gitserver.
     * In paginated search requests, some repositories may be cloning. These are reported here
     * and you may choose to retry the paginated request with the same cursor after they have
     * cloned OR you may simply continue making further paginated requests and choose to skip
     * the cloning repositories.
     */
    cloning: Array<IRepository>;

    /**
     * Repositories or commits that do not exist.
     * In paginated search requests, some repositories may be missing (e.g. if Sourcegraph is
     * aware of them but is temporarily unable to serve them). These are reported here and you
     * may choose to retry the paginated request with the same cursor and they may no longer be
     * missing OR you may simply continue making further paginated requests and choose to skip
     * the missing repositories.
     */
    missing: Array<IRepository>;

    /**
     * Repositories or commits which we did not manage to search in time. Trying
     * again usually will work.
     * In paginated search requests, this field is not relevant.
     */
    timedout: Array<IRepository>;

    /**
     * True if indexed search is enabled but was not available during this search.
     */
    indexUnavailable: boolean;

    /**
     * An alert message that should be displayed before any results.
     */
    alert: ISearchAlert | null;

    /**
     * The time it took to generate these results.
     */
    elapsedMilliseconds: number;

    /**
     * Dynamic filters generated by the search results
     */
    dynamicFilters: Array<ISearchFilter>;

    /**
     * Pagination information.
     * This field is only applcable when the original request was a paginated one.
     */
    pageInfo: IPageInfo;
  }

  /**
   * A search result.
   */
  type SearchResult = IFileMatch | ICommitSearchResult | IRepository;

  /**
   * A file match.
   */
  interface IFileMatch {
    __typename: 'FileMatch';

    /**
     * The file containing the match.
     * KNOWN ISSUE: This file's "commit" field contains incomplete data.
     * KNOWN ISSUE: This field's type should be File! not GitBlob!.
     */
    file: IGitBlob;

    /**
     * The repository containing the file match.
     */
    repository: IRepository;

    /**
     * The revspec of the revision that contains this match. If no revspec was given (such as when no
     * repository filter or revspec is specified in the search query), it is null.
     */
    revSpec: GitRevSpec | null;

    /**
     * The resource.
     * @deprecated "use the file field instead"
     */
    resource: string;

    /**
     * The symbols found in this file that match the query.
     */
    symbols: Array<ISymbol>;

    /**
     * The line matches.
     */
    lineMatches: Array<ILineMatch>;

    /**
     * Whether or not the limit was hit.
     */
    limitHit: boolean;
  }

  /**
   * A line match.
   */
  interface ILineMatch {
    __typename: 'LineMatch';

    /**
     * The preview.
     */
    preview: string;

    /**
     * The line number. 0-based. The first line will have lineNumber 0. Note: A
     * UI will normally display line numbers 1-based.
     */
    lineNumber: number;

    /**
     * Tuples of [offset, length] measured in characters (not bytes).
     */
    offsetAndLengths: Array<Array<number>>;

    /**
     * Whether or not the limit was hit.
     */
    limitHit: boolean;
  }

  /**
   * A search result that is a Git commit.
   */
  interface ICommitSearchResult {
    __typename: 'CommitSearchResult';

    /**
     * Base64 data uri to an icon.
     */
    icon: string;

    /**
     * A markdown string that is rendered prominently.
     */
    label: IMarkdown;

    /**
     * The URL of the result.
     */
    url: string;

    /**
     * A markdown string of that is rendered less prominently.
     */
    detail: IMarkdown;

    /**
     * The result previews of the result.
     */
    matches: Array<ISearchResultMatch>;

    /**
     * The commit that matched the search query.
     */
    commit: IGitCommit;

    /**
     * The ref names of the commit.
     */
    refs: Array<IGitRef>;

    /**
     * The refs by which this commit was reached.
     */
    sourceRefs: Array<IGitRef>;

    /**
     * The matching portion of the commit message, if any.
     */
    messagePreview: IHighlightedString | null;

    /**
     * The matching portion of the diff, if any.
     */
    diffPreview: IHighlightedString | null;
  }

  /**
   * A string that has highlights (e.g, query matches).
   */
  interface IHighlightedString {
    __typename: 'HighlightedString';

    /**
     * The full contents of the string.
     */
    value: string;

    /**
     * Highlighted matches of the query in the preview string.
     */
    highlights: Array<IHighlight>;
  }

  /**
   * A search-related alert message.
   */
  interface ISearchAlert {
    __typename: 'SearchAlert';

    /**
     * The title.
     */
    title: string;

    /**
     * The description.
     */
    description: string | null;

    /**
     * "Did you mean: ____" query proposals
     */
    proposedQueries: Array<ISearchQueryDescription> | null;
  }

  /**
   * A search query description.
   */
  interface ISearchQueryDescription {
    __typename: 'SearchQueryDescription';

    /**
     * The description.
     */
    description: string | null;

    /**
     * The query.
     */
    query: string;
  }

  /**
   * A search filter.
   */
  interface ISearchFilter {
    __typename: 'SearchFilter';

    /**
     * The value.
     */
    value: string;

    /**
     * The string to be displayed in the UI.
     */
    label: string;

    /**
     * Number of matches for a given filter.
     */
    count: number;

    /**
     * Whether the results returned are incomplete.
     */
    limitHit: boolean;

    /**
     * The kind of filter. Should be "file" or "repo".
     */
    kind: string;
  }

  /**
   * A search suggestion.
   */
  type SearchSuggestion = IRepository | IFile | ISymbol | ILanguage;

  /**
   * A programming language.
   */
  interface ILanguage {
    __typename: 'Language';

    /**
     * Name of the programming language.
     */
    name: string;
  }

  /**
   * Statistics about search results.
   */
  interface ISearchResultsStats {
    __typename: 'SearchResultsStats';

    /**
     * The approximate number of results returned.
     */
    approximateResultCount: string;

    /**
     * The sparkline.
     */
    sparkline: Array<number>;

    /**
     * Statistics about the languages represented in the search results.
     * Known issue: The LanguageStatistics.totalBytes field values are incorrect in the result.
     */
    languages: Array<ILanguageStatistics>;
  }

  /**
   * A saved search query, defined in settings.
   */
  interface ISavedSearch {
    __typename: 'SavedSearch';

    /**
     * The unique ID of this saved query.
     */
    id: string;

    /**
     * The description.
     */
    description: string;

    /**
     * The query.
     */
    query: string;

    /**
     * Whether or not to notify the owner of the saved search via email. This owner is either
     * a single user, or every member of an organization that owns the saved search.
     */
    notify: boolean;

    /**
     * Whether or not to notify on Slack.
     */
    notifySlack: boolean;

    /**
     * The user or org that owns this saved search.
     */
    namespace: Namespace;

    /**
     * The Slack webhook URL associated with this saved search, if any.
     */
    slackWebhookURL: string | null;
  }

  /**
   * A group of repositories.
   */
  interface IRepoGroup {
    __typename: 'RepoGroup';

    /**
     * The name.
     */
    name: string;

    /**
     * The repositories.
     */
    repositories: Array<string>;
  }

  /**
   * (experimental) A version context. Used to change the set of default repository and revisions searched.
   * Note: We do not expose the list of repositories and revisions in the version context. This is intentional. However, if a need arises we can add it in.
   */
  interface IVersionContext {
    __typename: 'VersionContext';

    /**
     * The version context ID is its name.
     */
    id: string;

    /**
     * The name of the version context.
     */
    name: string;

    /**
     * The description of the version context.
     */
    description: string;
  }

  /**
   * A site is an installation of Sourcegraph that consists of one or more
   * servers that share the same configuration and database.
   * The site is a singleton; the API only ever returns the single global site.
   */
  interface ISite {
    __typename: 'Site';

    /**
     * The site's opaque GraphQL ID. This is NOT the "site ID" as it is referred to elsewhere;
     * use the siteID field for that. (GraphQL node types conventionally have an id field of type
     * ID! that globally identifies the node.)
     */
    id: string;

    /**
     * The site ID.
     */
    siteID: string;

    /**
     * The site's configuration. Only visible to site admins.
     */
    configuration: ISiteConfiguration;

    /**
     * The site's latest site-wide settings (which are the second-lowest-precedence
     * in the configuration cascade for a user).
     */
    latestSettings: ISettings | null;

    /**
     * The global settings for this site, and the final merged settings.
     * All viewers can access this field.
     */
    settingsCascade: ISettingsCascade;

    /**
     * DEPRECATED
     * @deprecated "Use settingsCascade instead. This field is a deprecated alias for it and will be removed in a future release."
     */
    configurationCascade: IConfigurationCascade;

    /**
     * The URL to the site's settings.
     */
    settingsURL: string | null;

    /**
     * Whether the viewer can reload the site (with the reloadSite mutation).
     */
    canReloadSite: boolean;

    /**
     * Whether the viewer can modify the subject's settings.
     */
    viewerCanAdminister: boolean;

    /**
     * A list of all access tokens on this site.
     */
    accessTokens: IAccessTokenConnection;

    /**
     * A list of all authentication providers. This information is visible to all viewers and does not contain any
     * secret information.
     */
    authProviders: IAuthProviderConnection;

    /**
     * A list of all user external accounts on this site.
     */
    externalAccounts: IExternalAccountConnection;

    /**
     * The build version of the Sourcegraph software that is running on this site (of the form
     * NNNNN_YYYY-MM-DD_XXXXX, like 12345_2018-01-01_abcdef).
     */
    buildVersion: string;

    /**
     * The product version of the Sourcegraph software that is running on this site.
     */
    productVersion: string;

    /**
     * Information about software updates for the version of Sourcegraph that this site is running.
     */
    updateCheck: IUpdateCheck;

    /**
     * Whether the site needs to be configured to add repositories.
     */
    needsRepositoryConfiguration: boolean;

    /**
     * Whether the site is over the limit for free user accounts, and a warning needs to be shown to all users.
     * Only applies if the site does not have a valid license.
     */
    freeUsersExceeded: boolean;

    /**
     * DEPRECATED: This field is always false and will be removed in future
     * releases. All repositories are enabled by default starting with
     * Sourcegraph 3.4
     * Whether the site has zero access-enabled repositories.
     * @deprecated "All repositories are enabled by default now. This field is always false."
     */
    noRepositoriesEnabled: boolean;

    /**
     * Alerts to display to the viewer.
     */
    alerts: Array<IAlert>;

    /**
     * BACKCOMPAT: Always returns true.
     */
    hasCodeIntelligence: boolean;

    /**
     * Whether we want to show built-in searches on the saved searches page
     */
    disableBuiltInSearches: boolean;

    /**
     * Whether the server sends emails to users to verify email addresses. If false, then site admins must manually
     * verify users' email addresses.
     */
    sendsEmailVerificationEmails: boolean;

    /**
     * Information about this site's product subscription status.
     */
    productSubscription: IProductSubscriptionStatus;

    /**
     * Usage statistics for this site.
     */
    usageStatistics: ISiteUsageStatistics;

    /**
     * Monitoring overview for this site.
     * Note: This is primarily used for displaying recently-fired alerts in the web app. If your intent
     * is to monitor Sourcegraph, it is better to configure alerting or query Prometheus directly in
     * order to ensure that if the frontend goes down you still recieve alerts:
     * Configure alerting: https://docs.sourcegraph.com/admin/observability/alerting
     * Query Prometheus directly: https://docs.sourcegraph.com/admin/observability/alerting_custom_consumption
     */
    monitoringStatistics: IMonitoringStatistics;
  }

  interface IAccessTokensOnSiteArguments {
    /**
     * Returns the first n access tokens from the list.
     */
    first?: number | null;
  }

  interface IExternalAccountsOnSiteArguments {
    /**
     * Returns the first n external accounts from the list.
     */
    first?: number | null;

    /**
     * Include only external accounts associated with this user.
     */
    user?: string | null;

    /**
     * Include only external accounts with this service type.
     */
    serviceType?: string | null;

    /**
     * Include only external accounts with this service ID.
     */
    serviceID?: string | null;

    /**
     * Include only external accounts with this client ID.
     */
    clientID?: string | null;
  }

  interface IUsageStatisticsOnSiteArguments {
    /**
     * Days of history (based on current UTC time).
     */
    days?: number | null;

    /**
     * Weeks of history (based on current UTC time).
     */
    weeks?: number | null;

    /**
     * Months of history (based on current UTC time).
     */
    months?: number | null;
  }

  interface IMonitoringStatisticsOnSiteArguments {
    /**
     * Days of history (based on current UTC time).
     */
    days?: number | null;
  }

  /**
   * The configuration for a site.
   */
  interface ISiteConfiguration {
    __typename: 'SiteConfiguration';

    /**
     * The unique identifier of this site configuration version.
     */
    id: number;

    /**
     * The effective configuration JSON.
     */
    effectiveContents: any;

    /**
     * Messages describing validation problems or usage of deprecated configuration in the configuration JSON.
     * This includes both JSON Schema validation problems and other messages that perform more advanced checks
     * on the configuration (that can't be expressed in the JSON Schema).
     */
    validationMessages: Array<string>;
  }

  /**
   * A list of authentication providers.
   */
  interface IAuthProviderConnection {
    __typename: 'AuthProviderConnection';

    /**
     * A list of authentication providers.
     */
    nodes: Array<IAuthProvider>;

    /**
     * The total count of authentication providers in the connection. This total count may be larger than the number of nodes
     * in this object when the result is paginated.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * A provider of user authentication, such as an external single-sign-on service (e.g., using OpenID Connect or
   * SAML). The provider information in this type is visible to all viewers and does not contain any secret values.
   */
  interface IAuthProvider {
    __typename: 'AuthProvider';

    /**
     * The type of the auth provider.
     */
    serviceType: string;

    /**
     * An identifier for the service that the auth provider represents.
     */
    serviceID: string;

    /**
     * An identifier for the client of the service that the auth provider represents.
     */
    clientID: string;

    /**
     * The human-readable name of the provider.
     */
    displayName: string;

    /**
     * Whether this auth provider is the builtin username-password auth provider.
     */
    isBuiltin: boolean;

    /**
     * A URL that, when visited, initiates the authentication process for this auth provider.
     */
    authenticationURL: string | null;
  }

  /**
   * Information about software updates for Sourcegraph.
   */
  interface IUpdateCheck {
    __typename: 'UpdateCheck';

    /**
     * Whether an update check is currently in progress.
     */
    pending: boolean;

    /**
     * When the last update check was completed, or null if no update check has
     * been completed (or performed) yet.
     */
    checkedAt: any | null;

    /**
     * If an error occurred during the last update check, this message describes
     * the error.
     */
    errorMessage: string | null;

    /**
     * If an update is available, the version string of the updated version.
     */
    updateVersionAvailable: string | null;
  }

  /**
   * An alert message shown to the viewer.
   */
  interface IAlert {
    __typename: 'Alert';

    /**
     * The type of this alert.
     */
    type: AlertType;

    /**
     * The message body of this alert. Markdown is supported.
     */
    message: string;

    /**
     * If set, this alert is dismissible. After being dismissed, no other alerts with the same
     * isDismissibleWithKey value will be shown. If null, this alert is not dismissible.
     */
    isDismissibleWithKey: string | null;
  }

  /**
   * The possible types of alerts (Alert.type values).
   */
  const enum AlertType {
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
  }

  /**
   * Information about this site's product subscription (which enables access to and renewals of a product license).
   */
  interface IProductSubscriptionStatus {
    __typename: 'ProductSubscriptionStatus';

    /**
     * The full name of the product in use, such as "Sourcegraph Enterprise".
     */
    productNameWithBrand: string;

    /**
     * The max number of user accounts that have been active on this Sourcegraph site for the current license.
     * If no license is in use, returns zero.
     */
    actualUserCount: number;

    /**
     * The date and time when the max number of user accounts that have been active on this Sourcegraph site for
     * the current license was reached. If no license is in use, returns an empty string.
     */
    actualUserCountDate: string;

    /**
     * The number of users allowed. If there is a license, this is equal to ProductLicenseInfo.userCount. Otherwise,
     * it is the user limit for instances without a license, or null if there is no limit.
     */
    maximumAllowedUserCount: number | null;

    /**
     * The number of free users allowed on a site without a license before a warning is shown to all users, or null
     * if a valid license is in use.
     */
    noLicenseWarningUserCount: number | null;

    /**
     * The product license associated with this subscription, if any.
     */
    license: IProductLicenseInfo | null;
  }

  /**
   * Information about this site's product license (which activates certain Sourcegraph features).
   */
  interface IProductLicenseInfo {
    __typename: 'ProductLicenseInfo';

    /**
     * The full name of the product that this license is for. To get the product name for the current
     * Sourcegraph site, use ProductSubscriptionStatus.productNameWithBrand instead (to handle cases where there is
     * no license).
     */
    productNameWithBrand: string;

    /**
     * Tags indicating the product plan and features activated by this license.
     */
    tags: Array<string>;

    /**
     * The number of users allowed by this license.
     */
    userCount: number;

    /**
     * The date when this license expires.
     */
    expiresAt: any;
  }

  /**
   * SiteUsageStatistics describes a site's aggregate usage statistics.
   * This information is visible to all viewers.
   */
  interface ISiteUsageStatistics {
    __typename: 'SiteUsageStatistics';

    /**
     * Recent daily active users.
     */
    daus: Array<ISiteUsagePeriod>;

    /**
     * Recent weekly active users.
     */
    waus: Array<ISiteUsagePeriod>;

    /**
     * Recent monthly active users.
     */
    maus: Array<ISiteUsagePeriod>;
  }

  /**
   * SiteUsagePeriod describes a site's usage statistics for a given timespan.
   * This information is visible to all viewers.
   */
  interface ISiteUsagePeriod {
    __typename: 'SiteUsagePeriod';

    /**
     * The time when this started.
     */
    startTime: string;

    /**
     * The user count.
     */
    userCount: number;

    /**
     * The registered user count.
     */
    registeredUserCount: number;

    /**
     * The anonymous user count.
     */
    anonymousUserCount: number;

    /**
     * The count of registered users that have been active on a code host integration.
     * Excludes anonymous users.
     */
    integrationUserCount: number;

    /**
     * The user count of Sourcegraph products at each stage of the software development lifecycle.
     */
    stages: ISiteUsageStages | null;
  }

  /**
   * Aggregate site usage of features by software development lifecycle stage.
   */
  interface ISiteUsageStages {
    __typename: 'SiteUsageStages';

    /**
     * The number of users using management stage features.
     */
    manage: number;

    /**
     * The number of users using planning stage features.
     */
    plan: number;

    /**
     * The number of users using coding stage features.
     */
    code: number;

    /**
     * The number of users using review stage features.
     */
    review: number;

    /**
     * The number of users using verification stage features.
     */
    verify: number;

    /**
     * The number of users using packaging stage features.
     */
    package: number;

    /**
     * The number of users using deployment stage features.
     */
    deploy: number;

    /**
     * The number of users using configuration stage features.
     */
    configure: number;

    /**
     * The number of users using monitoring stage features.
     */
    monitor: number;

    /**
     * The number of users using security stage features.
     */
    secure: number;

    /**
     * The number of users using automation stage features.
     */
    automate: number;
  }

  /**
   * Monitoring overview.
   */
  interface IMonitoringStatistics {
    __typename: 'MonitoringStatistics';

    /**
     * Alerts fired in this time span.
     */
    alerts: Array<IMonitoringAlert>;
  }

  /**
   * A high-level monitoring alert, for details see https://docs.sourcegraph.com/admin/observability/metrics_guide#high-level-alerting-metrics
   */
  interface IMonitoringAlert {
    __typename: 'MonitoringAlert';

    /**
     * End time of this event, which describes the past 12h of recorded data.
     */
    timestamp: any;

    /**
     * Name of alert that the service fired.
     */
    name: string;

    /**
     * Name of the service that fired the alert.
     */
    serviceName: string;

    /**
     * Owner of the fired alert.
     */
    owner: string;

    /**
     * Average percentage of time (between [0, 1]) that the event was firing over the 12h of recorded data. e.g.
     * 1.0 if it was firing 100% of the time on average during that 12h window, 0.5 if it was firing 50% of the
     * time on average, etc.
     */
    average: number;
  }

  /**
   * A list of survey responses
   */
  interface ISurveyResponseConnection {
    __typename: 'SurveyResponseConnection';

    /**
     * A list of survey responses.
     */
    nodes: Array<ISurveyResponse>;

    /**
     * The total count of survey responses in the connection. This total count may be larger
     * than the number of nodes in this object when the result is paginated.
     */
    totalCount: number;

    /**
     * The count of survey responses submitted since 30 calendar days ago at 00:00 UTC.
     */
    last30DaysCount: number;

    /**
     * The average score of survey responses in the connection submitted since 30 calendar days ago at 00:00 UTC.
     */
    averageScore: number;

    /**
     * The net promoter score (NPS) of survey responses in the connection submitted since 30 calendar days ago at 00:00 UTC.
     * Return value is a signed integer, scaled from -100 (all detractors) to +100 (all promoters).
     * See https://en.wikipedia.org/wiki/Net_Promoter for explanation.
     */
    netPromoterScore: number;
  }

  /**
   * An extension registry.
   */
  interface IExtensionRegistry {
    __typename: 'ExtensionRegistry';

    /**
     * Find an extension by its extension ID (which is the concatenation of the publisher name, a slash ("/"), and the
     * extension name).
     * To find an extension by its GraphQL ID, use Query.node.
     */
    extension: IRegistryExtension | null;

    /**
     * A list of extensions published in the extension registry.
     */
    extensions: IRegistryExtensionConnection;

    /**
     * A list of publishers with at least 1 extension in the registry.
     */
    publishers: IRegistryPublisherConnection;

    /**
     * A list of publishers that the viewer may publish extensions as.
     */
    viewerPublishers: Array<RegistryPublisher>;

    /**
     * The extension ID prefix for extensions that are published in the local extension registry. This is the
     * hostname (and port, if non-default HTTP/HTTPS) of the Sourcegraph "externalURL" site configuration property.
     * It is null if extensions published on this Sourcegraph site do not have an extension ID prefix.
     * Examples: "sourcegraph.example.com/", "sourcegraph.example.com:1234/"
     */
    localExtensionIDPrefix: string | null;
  }

  interface IExtensionOnExtensionRegistryArguments {
    extensionID: string;
  }

  interface IExtensionsOnExtensionRegistryArguments {
    /**
     * Returns the first n extensions from the list.
     */
    first?: number | null;

    /**
     * Returns only extensions from this publisher.
     */
    publisher?: string | null;

    /**
     * Returns only extensions matching the query.
     * The following keywords are supported:
     * - category:"C" - include only extensions in the given category.
     * - tag:"T" - include only extensions in the given tag.
     * The following keywords are ignored by the server (so that the frontend can post-process the result set to
     * implement the keywords):
     * - installed - include only installed extensions.
     * - enabled - include only enabled extensions.
     * - disabled - include only disabled extensions.
     */
    query?: string | null;

    /**
     * Include extensions from the local registry.
     * @default true
     */
    local?: boolean | null;

    /**
     * Include extensions from remote registries.
     * @default true
     */
    remote?: boolean | null;

    /**
     * Sorts the list of extension results such that the extensions with these IDs are first in the result set.
     * Typically, the client passes the list of added and enabled extension IDs in this parameter so that the
     * results include those extensions first (which is typically what the user prefers).
     */
    prioritizeExtensionIDs?: Array<string> | null;
  }

  interface IPublishersOnExtensionRegistryArguments {
    /**
     * Return the first n publishers from the list.
     */
    first?: number | null;
  }

  /**
   * An extension's listing in the extension registry.
   */
  interface IRegistryExtension {
    __typename: 'RegistryExtension';

    /**
     * The unique, opaque, permanent ID of the extension. Do not display this ID to the user; display
     * RegistryExtension.extensionID instead (it is friendlier and still unique, but it can be renamed).
     */
    id: string;

    /**
     * The UUID of the extension. This identifies the extension externally (along with the origin). The UUID maps
     * 1-to-1 to RegistryExtension.id.
     */
    uuid: string;

    /**
     * The publisher of the extension. If this extension is from a remote registry, the publisher may be null.
     */
    publisher: RegistryPublisher | null;

    /**
     * The qualified, unique name that refers to this extension, consisting of the registry name (if non-default),
     * publisher's name, and the extension's name, all joined by "/" (for example, "acme-corp/my-extension-name").
     */
    extensionID: string;

    /**
     * The extension ID without the registry name.
     */
    extensionIDWithoutRegistry: string;

    /**
     * The name of the extension (not including the publisher's name).
     */
    name: string;

    /**
     * The extension manifest, or null if none is set.
     */
    manifest: IExtensionManifest | null;

    /**
     * The date when this extension was created on the registry.
     */
    createdAt: any | null;

    /**
     * The date when this extension was last updated on the registry (including updates to its metadata only, not
     * publishing new releases).
     */
    updatedAt: any | null;

    /**
     * The date when a release of this extension was most recently published, or null if there are no releases.
     */
    publishedAt: any | null;

    /**
     * The URL to the extension on this Sourcegraph site.
     */
    url: string;

    /**
     * The URL to the extension on the extension registry where it lives (if this is a remote
     * extension). If this extension is local, then this field's value is null.
     */
    remoteURL: string | null;

    /**
     * The name of this extension's registry.
     */
    registryName: string;

    /**
     * Whether the registry extension is published on this Sourcegraph site.
     */
    isLocal: boolean;

    /**
     * Whether the extension is marked as a work-in-progress extension by the extension author.
     */
    isWorkInProgress: boolean;

    /**
     * Whether the viewer has admin privileges on this registry extension.
     */
    viewerCanAdminister: boolean;
  }

  /**
   * A publisher of a registry extension.
   */
  type RegistryPublisher = IUser | IOrg;

  /**
   * A description of the extension, how to run or access it, and when to activate it.
   */
  interface IExtensionManifest {
    __typename: 'ExtensionManifest';

    /**
     * The raw JSON contents of the manifest.
     */
    raw: string;

    /**
     * The description specified in the manifest, if any.
     */
    description: string | null;

    /**
     * The URL to the bundled JavaScript source code for the extension, if any.
     */
    bundleURL: string | null;
  }

  /**
   * A list of registry extensions.
   */
  interface IRegistryExtensionConnection {
    __typename: 'RegistryExtensionConnection';

    /**
     * A list of registry extensions.
     */
    nodes: Array<IRegistryExtension>;

    /**
     * The total count of registry extensions in the connection. This total count may be larger than the number of
     * nodes in this object when the result is paginated.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;

    /**
     * The URL to this list, or null if none exists.
     */
    url: string | null;

    /**
     * Errors that occurred while communicating with remote registries to obtain the list of extensions.
     * In order to be able to return local extensions even when the remote registry is unreachable, errors are
     * recorded here instead of in the top-level GraphQL errors list.
     */
    error: string | null;
  }

  /**
   * A list of publishers of extensions in the registry.
   */
  interface IRegistryPublisherConnection {
    __typename: 'RegistryPublisherConnection';

    /**
     * A list of publishers.
     */
    nodes: Array<RegistryPublisher>;

    /**
     * The total count of publishers in the connection. This total count may be larger than the number of
     * nodes in this object when the result is paginated.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * Mutations that are only used on Sourcegraph.com.
   * FOR INTERNAL USE ONLY.
   */
  interface IDotcomQuery {
    __typename: 'DotcomQuery';

    /**
     * The product subscription with the given UUID. An error is returned if no such product
     * subscription exists.
     * Only Sourcegraph.com site admins and the account owners of the product subscription may
     * perform this query.
     * FOR INTERNAL USE ONLY.
     */
    productSubscription: IProductSubscription;

    /**
     * A list of product subscriptions.
     * FOR INTERNAL USE ONLY.
     */
    productSubscriptions: IProductSubscriptionConnection;

    /**
     * The invoice that would be generated for a new or updated subscription. This is used to show
     * users a preview of the credits, debits, and other billing information before creating or
     * updating a subscription.
     * Performing this query does not mutate any data or cause any billing changes to be made.
     */
    previewProductSubscriptionInvoice: IProductSubscriptionPreviewInvoice;

    /**
     * A list of product licenses.
     * Only Sourcegraph.com site admins may perform this query.
     * FOR INTERNAL USE ONLY.
     */
    productLicenses: IProductLicenseConnection;

    /**
     * A list of product pricing plans for Sourcegraph.
     */
    productPlans: Array<IProductPlan>;
  }

  interface IProductSubscriptionOnDotcomQueryArguments {
    uuid: string;
  }

  interface IProductSubscriptionsOnDotcomQueryArguments {
    /**
     * Returns the first n product subscriptions from the list.
     */
    first?: number | null;

    /**
     * Returns only product subscriptions for the given account.
     * Only Sourcegraph.com site admins may perform this query with account == null.
     */
    account?: string | null;

    /**
     * Returns product subscriptions from users with usernames or email addresses that match the query.
     */
    query?: string | null;
  }

  interface IPreviewProductSubscriptionInvoiceOnDotcomQueryArguments {
    /**
     * The customer account (user) for whom this preview invoice will be generated, or null if there is none.
     */
    account?: string | null;

    /**
     * If non-null, preview the invoice for an update to the existing product subscription. The
     * product subscription's billing customer must match the account parameter. If null, preview
     * the invoice for a new subscription.
     */
    subscriptionToUpdate?: string | null;

    /**
     * The parameters for the product subscription to preview. All fields of the input type must
     * be set (i.e., it does not support passing a null value to mean "do not update this field's
     * value" when updating an existing subscription).
     */
    productSubscription: IProductSubscriptionInput;
  }

  interface IProductLicensesOnDotcomQueryArguments {
    /**
     * Returns the first n product subscriptions from the list.
     */
    first?: number | null;

    /**
     * Returns only product subscriptions whose license key contains this substring.
     */
    licenseKeySubstring?: string | null;

    /**
     * Returns only product licenses associated with the given subscription
     */
    productSubscriptionID?: string | null;
  }

  /**
   * A product subscription that was created on Sourcegraph.com.
   * FOR INTERNAL USE ONLY.
   */
  interface IProductSubscription {
    __typename: 'ProductSubscription';

    /**
     * The unique ID of this product subscription.
     */
    id: string;

    /**
     * The unique UUID of this product subscription. Unlike ProductSubscription.id, this does not
     * encode the type and is not a GraphQL node ID.
     */
    uuid: string;

    /**
     * A name for the product subscription derived from its ID. The name is not guaranteed to be unique.
     */
    name: string;

    /**
     * The user (i.e., customer) to whom this subscription is granted, or null if the account has been deleted.
     */
    account: IUser | null;

    /**
     * The information that determines the price of this subscription, or null if there is no billing
     * information associated with this subscription.
     */
    invoiceItem: IProductSubscriptionInvoiceItem | null;

    /**
     * A list of billing-related events related to this product subscription.
     */
    events: Array<IProductSubscriptionEvent>;

    /**
     * The currently active product license associated with this product subscription, if any.
     */
    activeLicense: IProductLicense | null;

    /**
     * A list of product licenses associated with this product subscription.
     * Only Sourcegraph.com site admins may list inactive product licenses (other viewers should use
     * ProductSubscription.activeLicense).
     */
    productLicenses: IProductLicenseConnection;

    /**
     * The date when this product subscription was created.
     */
    createdAt: any;

    /**
     * Whether this product subscription was archived.
     */
    isArchived: boolean;

    /**
     * The URL to view this product subscription.
     */
    url: string;

    /**
     * The URL to view this product subscription in the site admin area.
     * Only Sourcegraph.com site admins may query this field.
     */
    urlForSiteAdmin: string | null;

    /**
     * The URL to view this product subscription's billing information (for site admins).
     * Only Sourcegraph.com site admins may query this field.
     */
    urlForSiteAdminBilling: string | null;
  }

  interface IProductLicensesOnProductSubscriptionArguments {
    /**
     * Returns the first n product licenses from the list.
     */
    first?: number | null;
  }

  /**
   * The information about a product subscription that determines its price.
   * FOR INTERNAL USE ONLY.
   */
  interface IProductSubscriptionInvoiceItem {
    __typename: 'ProductSubscriptionInvoiceItem';

    /**
     * The product plan for the subscription.
     */
    plan: IProductPlan;

    /**
     * This subscription's user count.
     */
    userCount: number;

    /**
     * The date when the subscription expires.
     */
    expiresAt: any;
  }

  /**
   * A product pricing plan for Sourcegraph.
   * FOR INTERNAL USE ONLY.
   */
  interface IProductPlan {
    __typename: 'ProductPlan';

    /**
     * The billing system's unique ID for the plan.
     */
    billingPlanID: string;

    /**
     * The unique ID for the product.
     */
    productPlanID: string;

    /**
     * The name of the product plan (e.g., "Enterprise Starter"). This is displayed to the user and
     * should be human-readable.
     */
    name: string;

    /**
     * The name with the brand (e.g., "Sourcegraph Enterprise Starter").
     */
    nameWithBrand: string;

    /**
     * The price (in USD cents) for one user for a year.
     */
    pricePerUserPerYear: number;

    /**
     * The minimum quantity (user count) that can be purchased. Only applies when using tiered pricing.
     */
    minQuantity: number | null;

    /**
     * The maximum quantity (user count) that can be purchased. Only applies when using tiered pricing.
     */
    maxQuantity: number | null;

    /**
     * Defines if the tiering price should be graduated or volume based.
     */
    tiersMode: string;

    /**
     * The tiered pricing for the plan.
     */
    planTiers: Array<IPlanTier>;
  }

  /**
   * The information about a plan's tier.
   * FOR INTERNAL USE ONLY.
   */
  interface IPlanTier {
    __typename: 'PlanTier';

    /**
     * The per-user amount for this tier.
     */
    unitAmount: number;

    /**
     * The maximum number of users that this tier applies to.
     */
    upTo: number;

    /**
     * The flat fee for this tier.
     */
    flatAmount: number;
  }

  /**
   * An event related to a product subscription.
   * FOR INTERNAL USE ONLY.
   */
  interface IProductSubscriptionEvent {
    __typename: 'ProductSubscriptionEvent';

    /**
     * The unique ID of the event.
     */
    id: string;

    /**
     * The date when the event occurred.
     */
    date: string;

    /**
     * The title of the event.
     */
    title: string;

    /**
     * A description of the event.
     */
    description: string | null;

    /**
     * A URL where the user can see more information about the event.
     */
    url: string | null;
  }

  /**
   * A product license that was created on Sourcegraph.com.
   * FOR INTERNAL USE ONLY.
   */
  interface IProductLicense {
    __typename: 'ProductLicense';

    /**
     * The unique ID of this product license.
     */
    id: string;

    /**
     * The product subscription associated with this product license.
     */
    subscription: IProductSubscription;

    /**
     * Information about this product license.
     */
    info: IProductLicenseInfo | null;

    /**
     * The license key.
     */
    licenseKey: string;

    /**
     * The date when this product license was created.
     */
    createdAt: any;
  }

  /**
   * A list of product licenses.
   * FOR INTERNAL USE ONLY.
   */
  interface IProductLicenseConnection {
    __typename: 'ProductLicenseConnection';

    /**
     * A list of product licenses.
     */
    nodes: Array<IProductLicense>;

    /**
     * The total count of product licenses in the connection. This total count may be larger than the number of
     * nodes in this object when the result is paginated.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * A list of product subscriptions.
   * FOR INTERNAL USE ONLY.
   */
  interface IProductSubscriptionConnection {
    __typename: 'ProductSubscriptionConnection';

    /**
     * A list of product subscriptions.
     */
    nodes: Array<IProductSubscription>;

    /**
     * The total count of product subscriptions in the connection. This total count may be larger than the number of
     * nodes in this object when the result is paginated.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * An input type that describes a product subscription to be purchased. Corresponds to
   * ProductSubscriptionInvoiceItem.
   * FOR INTERNAL USE ONLY.
   */
  interface IProductSubscriptionInput {
    /**
     * The billing plan ID for the subscription (ProductPlan.billingPlanID). This also specifies the
     * billing product, because a plan is associated with its product in the billing system.
     */
    billingPlanID: string;

    /**
     * This subscription's user count.
     */
    userCount: number;
  }

  /**
   * A preview of an invoice that would be generated for a new or updated product subscription.
   * FOR INTERNAL USE ONLY.
   */
  interface IProductSubscriptionPreviewInvoice {
    __typename: 'ProductSubscriptionPreviewInvoice';

    /**
     * The net price for this invoice, in USD cents. If this invoice represents an update to a
     * subscription, this is the difference between the existing price and the updated price.
     */
    price: number;

    /**
     * For updates to existing subscriptions, the effective date for which this preview invoice was
     * calculated, expressed as the number of seconds since the epoch. For new subscriptions, this is
     * null.
     */
    prorationDate: string | null;

    /**
     * Whether this invoice requires manual intervention.
     */
    isDowngradeRequiringManualIntervention: boolean;

    /**
     * The "before" state of the product subscription (i.e., the existing subscription), prior to the update that this preview
     * represents, or null if the preview is for a new subscription.
     */
    beforeInvoiceItem: IProductSubscriptionInvoiceItem | null;

    /**
     * The "after" state of the product subscription, with the update applied to the subscription.
     * For new subscriptions, this is just the invoice item for the subscription that will be
     * created.
     */
    afterInvoiceItem: IProductSubscriptionInvoiceItem;
  }

  /**
   * FOR INTERNAL USE ONLY: A status message
   */
  type StatusMessage =
    | ICloningProgress
    | IExternalServiceSyncError
    | ISyncError;

  /**
   * FOR INTERNAL USE ONLY: A status message produced when repositories are being
   * cloned
   */
  interface ICloningProgress {
    __typename: 'CloningProgress';

    /**
     * The message of this status message
     */
    message: string;
  }

  /**
   * FOR INTERNAL USE ONLY: A status message produced when repositories could not
   * be synced from an external service
   */
  interface IExternalServiceSyncError {
    __typename: 'ExternalServiceSyncError';

    /**
     * The message of this status message
     */
    message: string;

    /**
     * The external service that failed to sync
     */
    externalService: IExternalService;
  }

  /**
   * FOR INTERNAL USE ONLY: A status message produced when repositories could not
   * be synced
   */
  interface ISyncError {
    __typename: 'SyncError';

    /**
     * The message of this status message
     */
    message: string;
  }

  /**
   * A mutation.
   */
  interface IMutation {
    __typename: 'Mutation';

    /**
     * Updates the user profile information for the user with the given ID.
     *
     * Only the user and site admins may perform this mutation.
     */
    updateUser: IEmptyResponse;

    /**
     * Creates an organization. The caller is added as a member of the newly created organization.
     *
     * Only authenticated users may perform this mutation.
     */
    createOrganization: IOrg;

    /**
     * Updates an organization.
     *
     * Only site admins and any member of the organization may perform this mutation.
     */
    updateOrganization: IOrg;

    /**
     * Deletes an organization. Only site admins may perform this mutation.
     */
    deleteOrganization: IEmptyResponse | null;

    /**
     * Adds a external service. Only site admins may perform this mutation.
     */
    addExternalService: IExternalService;

    /**
     * Updates a external service. Only site admins may perform this mutation.
     */
    updateExternalService: IExternalService;

    /**
     * Delete an external service. Only site admins may perform this mutation.
     */
    deleteExternalService: IEmptyResponse;

    /**
     * DEPRECATED: All repositories are accessible or deleted. To prevent a
     * repository from being accessed on Sourcegraph add it to the external
     * service exclude configuration. This mutation will be removed in 3.6.
     *
     * Enables or disables a repository. A disabled repository is only accessible
     * to site admins and never appears in search results.
     *
     * Only site admins may perform this mutation.
     * @deprecated "update external service exclude setting."
     */
    setRepositoryEnabled: IEmptyResponse | null;

    /**
     * Tests the connection to a mirror repository's original source repository. This is an
     * expensive and slow operation, so it should only be used for interactive diagnostics.
     *
     * Only site admins may perform this mutation.
     */
    checkMirrorRepositoryConnection: ICheckMirrorRepositoryConnectionResult;

    /**
     * Schedule the mirror repository to be updated from its original source repository. Updating
     * occurs automatically, so this should not normally be needed.
     *
     * Only site admins may perform this mutation.
     */
    updateMirrorRepository: IEmptyResponse;

    /**
     * DEPRECATED: All repositories are scheduled for updates periodically. This
     * mutation will be removed in 3.6.
     *
     * Schedules all repositories to be updated from their original source
     * repositories. Updating occurs automatically, so this should not normally
     * be needed.
     *
     * Only site admins may perform this mutation.
     * @deprecated "syncer ensures all repositories are up to date."
     */
    updateAllMirrorRepositories: IEmptyResponse;

    /**
     * Creates a new user account.
     *
     * Only site admins may perform this mutation.
     */
    createUser: ICreateUserResult;

    /**
     * Randomize a user's password so that they need to reset it before they can sign in again.
     *
     * Only site admins may perform this mutation.
     */
    randomizeUserPassword: IRandomizeUserPasswordResult;

    /**
     * Adds an email address to the user's account. The email address will be marked as unverified until the user
     * has followed the email verification process.
     *
     * Only the user and site admins may perform this mutation.
     */
    addUserEmail: IEmptyResponse;

    /**
     * Removes an email address from the user's account.
     *
     * Only the user and site admins may perform this mutation.
     */
    removeUserEmail: IEmptyResponse;

    /**
     * Manually set the verification status of a user's email, without going through the normal verification process
     * (of clicking on a link in the email with a verification code).
     *
     * Only site admins may perform this mutation.
     */
    setUserEmailVerified: IEmptyResponse;

    /**
     * Deletes a user account. Only site admins may perform this mutation.
     *
     * If hard == true, a hard delete is performed. By default, deletes are
     * 'soft deletes' and could theoretically be undone with manual DB commands.
     * If a hard delete is performed, the data is truly removed from the
     * database and deletion can NEVER be undone.
     *
     * Data that is deleted as part of this operation:
     *
     * - All user data (access tokens, email addresses, external account info, survey responses, etc)
     * - Organization membership information (which organizations the user is a part of, any invitations created by or targeting the user).
     * - Sourcegraph extensions published by the user.
     * - User, Organization, or Global settings authored by the user.
     */
    deleteUser: IEmptyResponse | null;

    /**
     * Updates the current user's password. The oldPassword arg must match the user's current password.
     */
    updatePassword: IEmptyResponse | null;

    /**
     * Creates an access token that grants the privileges of the specified user (referred to as the access token's
     * "subject" user after token creation). The result is the access token value, which the caller is responsible
     * for storing (it is not accessible by Sourcegraph after creation).
     *
     * The supported scopes are:
     *
     * - "user:all": Full control of all resources accessible to the user account.
     * - "site-admin:sudo": Ability to perform any action as any other user. (Only site admins may create tokens
     *   with this scope.)
     *
     * Only the user or site admins may perform this mutation.
     */
    createAccessToken: ICreateAccessTokenResult;

    /**
     * Deletes and immediately revokes the specified access token, specified by either its ID or by the token
     * itself.
     *
     * Only site admins or the user who owns the token may perform this mutation.
     */
    deleteAccessToken: IEmptyResponse;

    /**
     * Deletes the association between an external account and its Sourcegraph user. It does NOT delete the external
     * account on the external service where it resides.
     *
     * Only site admins or the user who is associated with the external account may perform this mutation.
     */
    deleteExternalAccount: IEmptyResponse;

    /**
     * Invite the user with the given username to join the organization. The invited user account must already
     * exist.
     *
     * Only site admins and any organization member may perform this mutation.
     */
    inviteUserToOrganization: IInviteUserToOrganizationResult;

    /**
     * Accept or reject an existing organization invitation.
     *
     * Only the recipient of the invitation may perform this mutation.
     */
    respondToOrganizationInvitation: IEmptyResponse;

    /**
     * Resend the notification about an organization invitation to the recipient.
     *
     * Only site admins and any member of the organization may perform this mutation.
     */
    resendOrganizationInvitationNotification: IEmptyResponse;

    /**
     * Revoke an existing organization invitation.
     *
     * If the invitation has been accepted or rejected, it may no longer be revoked. After an
     * invitation is revoked, the recipient may not accept or reject it. Both cases yield an error.
     *
     * Only site admins and any member of the organization may perform this mutation.
     */
    revokeOrganizationInvitation: IEmptyResponse;

    /**
     * Immediately add a user as a member to the organization, without sending an invitation email.
     *
     * Only site admins may perform this mutation. Organization members may use the inviteUserToOrganization
     * mutation to invite users.
     */
    addUserToOrganization: IEmptyResponse;

    /**
     * Removes a user as a member from an organization.
     *
     * Only site admins and any member of the organization may perform this mutation.
     */
    removeUserFromOrganization: IEmptyResponse | null;

    /**
     * Adds or removes a tag on a user.
     *
     * Tags are used internally by Sourcegraph as feature flags for experimental features.
     *
     * Only site admins may perform this mutation.
     */
    setTag: IEmptyResponse;

    /**
     * Adds a Phabricator repository to Sourcegraph.
     */
    addPhabricatorRepo: IEmptyResponse | null;

    /**
     * Resolves a revision for a given diff from Phabricator.
     */
    resolvePhabricatorDiff: IGitCommit | null;

    /**
     * Logs a user event.
     * @deprecated "use logEvent instead"
     */
    logUserEvent: IEmptyResponse | null;

    /**
     * Logs an event.
     */
    logEvent: IEmptyResponse | null;

    /**
     * Sends a test notification for the saved search. Be careful: this will send a notifcation (email and other
     * types of notifications, if configured) to all subscribers of the saved search, which could be bothersome.
     *
     * Only subscribers to this saved search may perform this action.
     */
    sendSavedSearchTestNotification: IEmptyResponse | null;

    /**
     * All mutations that update settings (global, organization, and user settings) are under this field.
     *
     * Only the settings subject whose settings are being mutated (and site admins) may perform this mutation.
     *
     * This mutation only affects global, organization, and user settings, not site configuration. For site
     * configuration (which is a separate set of configuration properties from global/organization/user settings),
     * use updateSiteConfiguration.
     */
    settingsMutation: ISettingsMutation | null;

    /**
     * DEPRECATED: Use settingsMutation instead. This field is a deprecated alias for settingsMutation and will be
     * removed in a future release.
     * @deprecated "use settingsMutation instead"
     */
    configurationMutation: ISettingsMutation | null;

    /**
     * Updates the site configuration. Returns whether or not a restart is required for the update to be applied.
     *
     * Only site admins may perform this mutation.
     */
    updateSiteConfiguration: boolean;

    /**
     * Sets whether the user with the specified user ID is a site admin.
     *
     * Only site admins may perform this mutation.
     */
    setUserIsSiteAdmin: IEmptyResponse | null;

    /**
     * Invalidates all sessions belonging to a user.
     *
     * Only site admins may perform this mutation.
     */
    invalidateSessionsByID: IEmptyResponse | null;

    /**
     * Reloads the site by restarting the server. This is not supported for all deployment
     * types. This may cause downtime.
     *
     * Only site admins may perform this mutation.
     */
    reloadSite: IEmptyResponse | null;

    /**
     * Submits a user satisfaction (NPS) survey.
     */
    submitSurvey: IEmptyResponse | null;

    /**
     * Submits a request for a Sourcegraph Enterprise trial license.
     */
    requestTrial: IEmptyResponse | null;

    /**
     * Manages the extension registry.
     */
    extensionRegistry: IExtensionRegistryMutation;

    /**
     * Mutations that are only used on Sourcegraph.com.
     *
     * FOR INTERNAL USE ONLY.
     */
    dotcom: IDotcomMutation;

    /**
     * Creates a saved search.
     */
    createSavedSearch: ISavedSearch;

    /**
     * Updates a saved search
     */
    updateSavedSearch: ISavedSearch;

    /**
     * Deletes a saved search
     */
    deleteSavedSearch: IEmptyResponse | null;

    /**
     * (experimental) The LSIF API may change substantially in the near future as we
     * continue to adjust it for our use cases. Changes will not be documented in the
     * CHANGELOG during this time.
     * Deletes an LSIF upload.
     */
    deleteLSIFUpload: IEmptyResponse | null;

    /**
     * (experimental) The LSIF API may change substantially in the near future as we
     * continue to adjust it for our use cases. Changes will not be documented in the
     * CHANGELOG during this time.
     * Deletes an LSIF index.
     */
    deleteLSIFIndex: IEmptyResponse | null;

    /**
     * Set the permissions of a repository (i.e., which users may view it on Sourcegraph). This
     * operation overwrites the previous permissions for the repository.
     */
    setRepositoryPermissionsForUsers: IEmptyResponse;

    /**
     * Schedule a permissions sync for given repository. This queries the repository's code host for
     * all users' permissions associated with the repository, so that the current permissions apply
     * to all users' operations on that repository on Sourcegraph.
     */
    scheduleRepositoryPermissionsSync: IEmptyResponse;

    /**
     * Schedule a permissions sync for given user. This queries all code hosts for the user's current
     * repository permissions and syncs them to Sourcegraph, so that the current permissions apply to
     * the user's operations on Sourcegraph.
     */
    scheduleUserPermissionsSync: IEmptyResponse;

    /**
     * CAMPAIGNS
     *
     * Create a campaign from a campaign spec and locally computed changeset specs. If a campaign in
     * the same namespace with the same name already exists, an error is returned. The newly created
     * campaign is returned.
     */
    createCampaign: ICampaign;

    /**
     * Create or update a campaign from a campaign spec and locally computed changeset specs. If no
     * campaign exists in the namespace with the name given in the campaign spec, a campaign will be
     * created. Otherwise, the existing campaign will be updated. The campaign is returned.
     */
    applyCampaign: ICampaign;

    /**
     * Move a campaign to a different namespace, or rename it in the current namespace.
     */
    moveCampaign: ICampaign;

    /**
     * Close a campaign.
     */
    closeCampaign: ICampaign;

    /**
     * Delete a campaign. A deleted campaign is completely removed and can't be un-deleted. The
     * campaign's changesets are kept as-is; to close them, use the closeCampaign mutation first.
     */
    deleteCampaign: IEmptyResponse | null;

    /**
     * Upload a changeset spec that will be used in a future update to a campaign. The changeset spec
     * is stored and can be referenced by its ID in the applyCampaign mutation. Just uploading the
     * changeset spec does not result in changes to the campaign or any of its changesets; you need
     * to call applyCampaign to use it.
     *
     * You can use this mutation to upload large changeset specs (e.g., containing large diffs) in
     * individual HTTP requests. Then, in the eventual applyCampaign call, you just refer to the
     * changeset specs by their IDs. This lets you avoid problems when updating large campaigns where
     * a large HTTP request body (e.g., with many large diffs in the changeset specs) would be
     * rejected by the web server/proxy or would be very slow.
     *
     * The returned ChangesetSpec is immutable and expires after a certain period of time (if not
     * used in a call to applyCampaign), which can be queried on ChangesetSpec.expiresAt.
     */
    createChangesetSpec: ChangesetSpec;

    /**
     * Create a campaign spec that will be used to create a campaign (with the createCampaign
     * mutation), or to update a campaign (with the applyCampaign mutation).
     *
     * The returned CampaignSpec is immutable and expires after a certain period of time (if not used
     * in a call to applyCampaign), which can be queried on CampaignSpec.expiresAt.
     */
    createCampaignSpec: ICampaignSpec;

    /**
     * Enqueue the given changeset for high-priority syncing.
     */
    syncChangeset: IEmptyResponse;

    /**
     * OBSERVABILITY
     *
     * Set the status of a test alert of the specified parameters - useful for validating
     * 'observability.alerts' configuration. Alerts may take up to a minute to fire.
     */
    triggerObservabilityTestAlert: IEmptyResponse;
  }

  interface IUpdateUserOnMutationArguments {
    user: string;
    username?: string | null;
    displayName?: string | null;
    avatarURL?: string | null;
  }

  interface ICreateOrganizationOnMutationArguments {
    name: string;
    displayName?: string | null;
  }

  interface IUpdateOrganizationOnMutationArguments {
    id: string;
    displayName?: string | null;
  }

  interface IDeleteOrganizationOnMutationArguments {
    organization: string;
  }

  interface IAddExternalServiceOnMutationArguments {
    input: IAddExternalServiceInput;
  }

  interface IUpdateExternalServiceOnMutationArguments {
    input: IUpdateExternalServiceInput;
  }

  interface IDeleteExternalServiceOnMutationArguments {
    externalService: string;
  }

  interface ISetRepositoryEnabledOnMutationArguments {
    repository: string;
    enabled: boolean;
  }

  interface ICheckMirrorRepositoryConnectionOnMutationArguments {
    /**
     * The ID of the existing repository whose mirror to check.
     */
    repository?: string | null;

    /**
     * The name of a repository whose mirror to check. If the name is provided, the repository need not be added
     * to the site (but the site configuration must define a code host that knows how to handle the name).
     */
    name?: string | null;
  }

  interface IUpdateMirrorRepositoryOnMutationArguments {
    /**
     * The mirror repository to update.
     */
    repository: string;
  }

  interface ICreateUserOnMutationArguments {
    /**
     * The new user's username.
     */
    username: string;

    /**
     * The new user's optional email address. If given, it is marked as verified.
     */
    email?: string | null;
  }

  interface IRandomizeUserPasswordOnMutationArguments {
    user: string;
  }

  interface IAddUserEmailOnMutationArguments {
    user: string;
    email: string;
  }

  interface IRemoveUserEmailOnMutationArguments {
    user: string;
    email: string;
  }

  interface ISetUserEmailVerifiedOnMutationArguments {
    user: string;
    email: string;
    verified: boolean;
  }

  interface IDeleteUserOnMutationArguments {
    user: string;
    hard?: boolean | null;
  }

  interface IUpdatePasswordOnMutationArguments {
    oldPassword: string;
    newPassword: string;
  }

  interface ICreateAccessTokenOnMutationArguments {
    user: string;
    scopes: Array<string>;
    note: string;
  }

  interface IDeleteAccessTokenOnMutationArguments {
    byID?: string | null;
    byToken?: string | null;
  }

  interface IDeleteExternalAccountOnMutationArguments {
    externalAccount: string;
  }

  interface IInviteUserToOrganizationOnMutationArguments {
    organization: string;
    username: string;
  }

  interface IRespondToOrganizationInvitationOnMutationArguments {
    /**
     * The organization invitation.
     */
    organizationInvitation: string;

    /**
     * The response to the invitation.
     */
    responseType: OrganizationInvitationResponseType;
  }

  interface IResendOrganizationInvitationNotificationOnMutationArguments {
    /**
     * The organization invitation.
     */
    organizationInvitation: string;
  }

  interface IRevokeOrganizationInvitationOnMutationArguments {
    /**
     * The organization invitation.
     */
    organizationInvitation: string;
  }

  interface IAddUserToOrganizationOnMutationArguments {
    organization: string;
    username: string;
  }

  interface IRemoveUserFromOrganizationOnMutationArguments {
    user: string;
    organization: string;
  }

  interface ISetTagOnMutationArguments {
    /**
     * The ID of the user whose tags to set.
     *
     * (This parameter is named "node" to make it easy to support tagging other types of nodes
     * other than users in the future.)
     */
    node: string;

    /**
     * The tag to set.
     */
    tag: string;

    /**
     * The desired state of the tag on the user (whether to add or remove): true to add, false to
     * remove.
     */
    present: boolean;
  }

  interface IAddPhabricatorRepoOnMutationArguments {
    /**
     * The callsign, for example "MUX".
     */
    callsign: string;

    /**
     * The name, for example "github.com/gorilla/mux".
     */
    name?: string | null;

    /**
     * An alias for name. DEPRECATED: use name instead.
     */
    uri?: string | null;

    /**
     * The URL to the phabricator instance (e.g. http://phabricator.sgdev.org).
     */
    url: string;
  }

  interface IResolvePhabricatorDiffOnMutationArguments {
    /**
     * The name of the repository that the diff is based on.
     */
    repoName: string;

    /**
     * The ID of the diff on Phabricator.
     */
    diffID: string;

    /**
     * The base revision this diff is based on.
     */
    baseRev: string;

    /**
     * The raw contents of the diff from Phabricator.
     * Required if Sourcegraph doesn't have a Conduit API token.
     */
    patch?: string | null;

    /**
     * The description of the diff. This will be used as the commit message.
     */
    description?: string | null;

    /**
     * The name of author of the diff.
     */
    authorName?: string | null;

    /**
     * The author's email.
     */
    authorEmail?: string | null;

    /**
     * When the diff was created.
     */
    date?: string | null;
  }

  interface ILogUserEventOnMutationArguments {
    event: UserEvent;
    userCookieID: string;
  }

  interface ILogEventOnMutationArguments {
    /**
     * The name of the event.
     */
    event: string;

    /**
     * The randomly generated unique user ID stored in a browser cookie.
     */
    userCookieID: string;

    /**
     * The URL when the event was logged.
     */
    url: string;

    /**
     * The source of the event.
     */
    source: EventSource;

    /**
     * The additional argument information.
     */
    argument?: string | null;
  }

  interface ISendSavedSearchTestNotificationOnMutationArguments {
    /**
     * ID of the saved search.
     */
    id: string;
  }

  interface ISettingsMutationOnMutationArguments {
    input: ISettingsMutationGroupInput;
  }

  interface IConfigurationMutationOnMutationArguments {
    input: ISettingsMutationGroupInput;
  }

  interface IUpdateSiteConfigurationOnMutationArguments {
    /**
     * The last ID of the site configuration that is known by the client, to
     * prevent race conditions. An error will be returned if someone else
     * has already written a new update.
     */
    lastID: number;

    /**
     * A JSON object containing the entire site configuration. The previous site configuration will be replaced
     * with this new value.
     */
    input: string;
  }

  interface ISetUserIsSiteAdminOnMutationArguments {
    userID: string;
    siteAdmin: boolean;
  }

  interface IInvalidateSessionsByIDOnMutationArguments {
    userID: string;
  }

  interface ISubmitSurveyOnMutationArguments {
    input: ISurveySubmissionInput;
  }

  interface IRequestTrialOnMutationArguments {
    email: string;
  }

  interface ICreateSavedSearchOnMutationArguments {
    description: string;
    query: string;
    notifyOwner: boolean;
    notifySlack: boolean;
    orgID?: string | null;
    userID?: string | null;
  }

  interface IUpdateSavedSearchOnMutationArguments {
    id: string;
    description: string;
    query: string;
    notifyOwner: boolean;
    notifySlack: boolean;
    orgID?: string | null;
    userID?: string | null;
  }

  interface IDeleteSavedSearchOnMutationArguments {
    id: string;
  }

  interface IDeleteLSIFUploadOnMutationArguments {
    id: string;
  }

  interface IDeleteLSIFIndexOnMutationArguments {
    id: string;
  }

  interface ISetRepositoryPermissionsForUsersOnMutationArguments {
    /**
     * The repository whose permissions to set.
     */
    repository: string;

    /**
     * A list of user identifiers and their repository permissions, which defines the set of
     * users who may view the repository. All users not included in the list will not be
     * permitted to view the repository on Sourcegraph.
     */
    userPermissions: Array<IUserPermission>;
  }

  interface IScheduleRepositoryPermissionsSyncOnMutationArguments {
    repository: string;
  }

  interface IScheduleUserPermissionsSyncOnMutationArguments {
    user: string;
  }

  interface ICreateCampaignOnMutationArguments {
    /**
     * The campaign spec that describes the desired state of the campaign.
     */
    campaignSpec: string;
  }

  interface IApplyCampaignOnMutationArguments {
    /**
     * The campaign spec that describes the new desired state of the campaign.
     */
    campaignSpec: string;

    /**
     * If set, return an error if the campaign identified using the namespace and campaignSpec
     * parameters does not match the campaign with this ID. This lets callers use a stable ID
     * that refers to a specific campaign during an edit session (and is not susceptible to
     * conflicts if the underlying campaign is moved to a different namespace, renamed, or
     * deleted).
     */
    ensureCampaign?: string | null;
  }

  interface IMoveCampaignOnMutationArguments {
    campaign: string;
    newName?: string | null;
    newNamespace?: string | null;
  }

  interface ICloseCampaignOnMutationArguments {
    campaign: string;

    /**
     * Whether to close the changesets associated with this campaign on their respective code
     * hosts. "Close" means the appropriate final state on the code host (e.g., "closed" on
     * GitHub and "declined" on Bitbucket Server).
     * @default false
     */
    closeChangesets?: boolean | null;
  }

  interface IDeleteCampaignOnMutationArguments {
    campaign: string;
  }

  interface ICreateChangesetSpecOnMutationArguments {
    /**
     * The raw changeset spec (as JSON).
     */
    changesetSpec: string;
  }

  interface ICreateCampaignSpecOnMutationArguments {
    /**
     * The namespace (either a user or organization). A campaign spec can only be applied to (or
     * used to create) campaigns in this namespace.
     */
    namespace: string;

    /**
     * The campaign spec as YAML (or the equivalent JSON).
     */
    campaignSpec: string;

    /**
     * Changeset specs that were locally computed and then uploaded using createChangesetSpec.
     */
    changesetSpecs: Array<string>;
  }

  interface ISyncChangesetOnMutationArguments {
    changeset: string;
  }

  interface ITriggerObservabilityTestAlertOnMutationArguments {
    /**
     * Level of alert to test - either warning or critical.
     */
    level: string;
  }

  /**
   * Represents a null return value.
   */
  interface IEmptyResponse {
    __typename: 'EmptyResponse';

    /**
     * A dummy null value.
     */
    alwaysNil: string | null;
  }

  /**
   * A new external service.
   */
  interface IAddExternalServiceInput {
    /**
     * The kind of the external service.
     */
    kind: ExternalServiceKind;

    /**
     * The display name of the external service.
     */
    displayName: string;

    /**
     * The JSON configuration of the external service.
     */
    config: string;

    /**
     * The namespace this external service belongs to.
     * Currently, this can only be used for a user.
     */
    namespace?: string | null;
  }

  /**
   * Fields to update for an existing external service.
   */
  interface IUpdateExternalServiceInput {
    /**
     * The id of the external service to update.
     */
    id: string;

    /**
     * The updated display name, if provided.
     */
    displayName?: string | null;

    /**
     * The updated config, if provided.
     */
    config?: string | null;
  }

  /**
   * The result for Mutation.checkMirrorRepositoryConnection.
   */
  interface ICheckMirrorRepositoryConnectionResult {
    __typename: 'CheckMirrorRepositoryConnectionResult';

    /**
     * The error message encountered during the update operation, if any. If null, then
     * the connection check succeeded.
     */
    error: string | null;
  }

  /**
   * The result for Mutation.createUser.
   */
  interface ICreateUserResult {
    __typename: 'CreateUserResult';

    /**
     * The new user.
     */
    user: IUser;

    /**
     * The reset password URL that the new user must visit to sign into their account. If the builtin
     * username-password authentication provider is not enabled, this field's value is null.
     */
    resetPasswordURL: string | null;
  }

  /**
   * The result for Mutation.randomizeUserPassword.
   */
  interface IRandomizeUserPasswordResult {
    __typename: 'RandomizeUserPasswordResult';

    /**
     * The reset password URL that the user must visit to sign into their account again. If the builtin
     * username-password authentication provider is not enabled, this field's value is null.
     */
    resetPasswordURL: string | null;
  }

  /**
   * The result for Mutation.createAccessToken.
   */
  interface ICreateAccessTokenResult {
    __typename: 'CreateAccessTokenResult';

    /**
     * The ID of the newly created access token.
     */
    id: string;

    /**
     * The secret token value that is used to authenticate API clients. The caller is responsible for storing this
     * value.
     */
    token: string;
  }

  /**
   * The result of Mutation.inviteUserToOrganization.
   */
  interface IInviteUserToOrganizationResult {
    __typename: 'InviteUserToOrganizationResult';

    /**
     * Whether an invitation email was sent. If emails are not enabled on this site or if the user has no verified
     * email address, an email will not be sent.
     */
    sentInvitationEmail: boolean;

    /**
     * The URL that the invited user can visit to accept or reject the invitation.
     */
    invitationURL: string;
  }

  /**
   * A user event.
   */
  const enum UserEvent {
    PAGEVIEW = 'PAGEVIEW',
    SEARCHQUERY = 'SEARCHQUERY',
    CODEINTEL = 'CODEINTEL',
    CODEINTELREFS = 'CODEINTELREFS',
    CODEINTELINTEGRATION = 'CODEINTELINTEGRATION',
    CODEINTELINTEGRATIONREFS = 'CODEINTELINTEGRATIONREFS',

    /**
     * Product stages
     */
    STAGEMANAGE = 'STAGEMANAGE',
    STAGEPLAN = 'STAGEPLAN',
    STAGECODE = 'STAGECODE',
    STAGEREVIEW = 'STAGEREVIEW',
    STAGEVERIFY = 'STAGEVERIFY',
    STAGEPACKAGE = 'STAGEPACKAGE',
    STAGEDEPLOY = 'STAGEDEPLOY',
    STAGECONFIGURE = 'STAGECONFIGURE',
    STAGEMONITOR = 'STAGEMONITOR',
    STAGESECURE = 'STAGESECURE',
    STAGEAUTOMATE = 'STAGEAUTOMATE',
  }

  /**
   * Input for Mutation.settingsMutation, which contains fields that all settings (global, organization, and user
   * settings) mutations need.
   */
  interface ISettingsMutationGroupInput {
    /**
     * The subject whose settings to mutate (organization, user, etc.).
     */
    subject: string;

    /**
     * The ID of the last-known settings known to the client, or null if there is none. This field is used to
     * prevent race conditions when there are concurrent editors.
     */
    lastID?: number | null;
  }

  /**
   * Mutations that update settings (global, organization, or user settings). These mutations are grouped together
   * because they:
   * - are all versioned to avoid race conditions with concurrent editors
   * - all apply to a specific settings subject (i.e., a user, an organization, or the whole site)
   *
   * Grouping them lets us extract those common parameters to the Mutation.settingsMutation field.
   */
  interface ISettingsMutation {
    __typename: 'SettingsMutation';

    /**
     * Edit a single property in the settings object.
     */
    editSettings: IUpdateSettingsPayload | null;

    /**
     * DEPRECATED
     * @deprecated "Use editSettings instead. This field is a deprecated alias for it and will be removed in a future release."
     */
    editConfiguration: IUpdateSettingsPayload | null;

    /**
     * Overwrite the existing settings with the new settings.
     */
    overwriteSettings: IUpdateSettingsPayload | null;
  }

  interface IEditSettingsOnSettingsMutationArguments {
    /**
     * The edit to apply to the settings.
     */
    edit: ISettingsEdit;
  }

  interface IEditConfigurationOnSettingsMutationArguments {
    edit: IConfigurationEdit;
  }

  interface IOverwriteSettingsOnSettingsMutationArguments {
    /**
     * A JSON object (stringified) of the settings. Trailing commas and "//"-style comments are supported. The
     * entire previous settings value will be overwritten by this new value.
     */
    contents: string;
  }

  /**
   * An edit to a JSON property in a settings JSON object. The JSON property to edit can be nested.
   */
  interface ISettingsEdit {
    /**
     * The key path of the property to update.
     *
     * Inserting into an existing array is not yet supported.
     */
    keyPath: Array<IKeyPathSegment>;

    /**
     * The new JSON-encoded value to insert. If the field's value is not set, the property is removed. (This is
     * different from the field's value being the JSON null value.)
     *
     * When the value is a non-primitive type, it must be specified using a GraphQL variable, not an inline literal,
     * or else the GraphQL parser will return an error.
     */
    value?: any | null;

    /**
     * Whether to treat the value as a JSONC-encoded string, which makes it possible to perform an edit that
     * preserves (or adds/removes) comments.
     * @default false
     */
    valueIsJSONCEncodedString?: boolean | null;
  }

  /**
   * A segment of a key path that locates a nested JSON value in a root JSON value. Exactly one field in each
   * KeyPathSegment must be non-null.
   * For example, in {"a": [0, {"b": 3}]}, the value 3 is located at the key path ["a", 1, "b"].
   */
  interface IKeyPathSegment {
    /**
     * The name of the property in the object at this location to descend into.
     */
    property?: string | null;

    /**
     * The index of the array at this location to descend into.
     */
    index?: number | null;
  }

  /**
   * The payload for SettingsMutation.updateConfiguration.
   */
  interface IUpdateSettingsPayload {
    __typename: 'UpdateSettingsPayload';

    /**
     * An empty response.
     */
    empty: IEmptyResponse | null;
  }

  /**
   * DEPRECATED: This type was renamed to SettingsEdit.
   * NOTE: GraphQL does not support @deprecated directives on INPUT_FIELD_DEFINITION (input fields).
   */
  interface IConfigurationEdit {
    /**
     * DEPRECATED
     */
    keyPath: Array<IKeyPathSegment>;

    /**
     * DEPRECATED
     */
    value?: any | null;

    /**
     * DEPRECATED
     * @default false
     */
    valueIsJSONCEncodedString?: boolean | null;
  }

  /**
   * Input for a user satisfaction (NPS) survey submission.
   */
  interface ISurveySubmissionInput {
    /**
     * User-provided email address, if there is no currently authenticated user. If there is, this value
     * will not be used.
     */
    email?: string | null;

    /**
     * User's likelihood of recommending Sourcegraph to a friend, from 0-10.
     */
    score: number;

    /**
     * The answer to "What is the most important reason for the score you gave".
     */
    reason?: string | null;

    /**
     * The answer to "What can Sourcegraph do to provide a better product"
     */
    better?: string | null;
  }

  /**
   * Mutations for the extension registry.
   */
  interface IExtensionRegistryMutation {
    __typename: 'ExtensionRegistryMutation';

    /**
     * Create a new extension in the extension registry.
     */
    createExtension: IExtensionRegistryCreateExtensionResult;

    /**
     * Update an extension in the extension registry.
     * Only authorized extension publishers may perform this mutation.
     */
    updateExtension: IExtensionRegistryUpdateExtensionResult;

    /**
     * Delete an extension from the extension registry.
     * Only authorized extension publishers may perform this mutation.
     */
    deleteExtension: IEmptyResponse;

    /**
     * Publish an extension in the extension registry, creating it (if it doesn't yet exist) or updating it (if it
     * does).
     * This is a helper that wraps multiple other GraphQL mutations to expose a single API for publishing an
     * extension.
     */
    publishExtension: IExtensionRegistryCreateExtensionResult;
  }

  interface ICreateExtensionOnExtensionRegistryMutationArguments {
    /**
     * The ID of the extension's publisher (a user or organization).
     */
    publisher: string;

    /**
     * The name of the extension.
     */
    name: string;
  }

  interface IUpdateExtensionOnExtensionRegistryMutationArguments {
    /**
     * The extension to update.
     */
    extension: string;

    /**
     * The new name for the extension, or null to leave unchanged.
     */
    name?: string | null;
  }

  interface IDeleteExtensionOnExtensionRegistryMutationArguments {
    /**
     * The ID of the extension to delete.
     */
    extension: string;
  }

  interface IPublishExtensionOnExtensionRegistryMutationArguments {
    /**
     * The extension ID of the extension to publish. If a host prefix (e.g., "sourcegraph.example.com/") is
     * needed and it is not included, it is automatically prepended.
     * Examples: "alice/myextension", "acmecorp/myextension"
     */
    extensionID: string;

    /**
     * The extension manifest (as JSON).
     */
    manifest: string;

    /**
     * The bundled JavaScript source of the extension.
     */
    bundle?: string | null;

    /**
     * The source map of the extension's JavaScript bundle, if any.
     * The JavaScript bundle's "//# sourceMappingURL=" directive, if any, is ignored. When the bundle is served,
     * the source map provided here is referenced instead.
     */
    sourceMap?: string | null;

    /**
     * Force publish even if there are warnings (such as invalid JSON warnings).
     * @default false
     */
    force?: boolean | null;
  }

  /**
   * The result of Mutation.extensionRegistry.createExtension.
   */
  interface IExtensionRegistryCreateExtensionResult {
    __typename: 'ExtensionRegistryCreateExtensionResult';

    /**
     * The newly created extension.
     */
    extension: IRegistryExtension;
  }

  /**
   * The result of Mutation.extensionRegistry.updateExtension.
   */
  interface IExtensionRegistryUpdateExtensionResult {
    __typename: 'ExtensionRegistryUpdateExtensionResult';

    /**
     * The newly updated extension.
     */
    extension: IRegistryExtension;
  }

  /**
   * Mutations that are only used on Sourcegraph.com.
   * FOR INTERNAL USE ONLY.
   */
  interface IDotcomMutation {
    __typename: 'DotcomMutation';

    /**
     * Set or unset a user's associated billing information.
     * Only Sourcegraph.com site admins may perform this mutation.
     * FOR INTERNAL USE ONLY.
     */
    setUserBilling: IEmptyResponse;

    /**
     * Creates new product subscription for an account.
     * Only Sourcegraph.com site admins may perform this mutation.
     * FOR INTERNAL USE ONLY.
     */
    createProductSubscription: IProductSubscription;

    /**
     * Set or unset a product subscription's associated billing system subscription.
     * Only Sourcegraph.com site admins may perform this mutation.
     * FOR INTERNAL USE ONLY.
     */
    setProductSubscriptionBilling: IEmptyResponse;

    /**
     * Generates and signs a new product license and associates it with an existing product subscription. The
     * product license key is signed with Sourcegraph.com's private key and is verifiable with the corresponding
     * public key.
     * Only Sourcegraph.com site admins may perform this mutation.
     * FOR INTERNAL USE ONLY.
     */
    generateProductLicenseForSubscription: IProductLicense;

    /**
     * Creates a new product subscription and bills the associated payment method.
     * Only Sourcegraph.com authenticated users may perform this mutation.
     * FOR INTERNAL USE ONLY.
     */
    createPaidProductSubscription: ICreatePaidProductSubscriptionResult;

    /**
     * Updates a new product subscription and credits or debits the associated payment method.
     * Only Sourcegraph.com site admins and the subscription's account owner may perform this
     * mutation.
     * FOR INTERNAL USE ONLY.
     */
    updatePaidProductSubscription: IUpdatePaidProductSubscriptionResult;

    /**
     * Archives an existing product subscription.
     * Only Sourcegraph.com site admins may perform this mutation.
     * FOR INTERNAL USE ONLY.
     */
    archiveProductSubscription: IEmptyResponse;
  }

  interface ISetUserBillingOnDotcomMutationArguments {
    /**
     * The user to update.
     */
    user: string;

    /**
     * The billing customer ID (on the billing system) to associate this user with. If null, the association is
     * removed (i.e., the user is unlinked from the billing customer record).
     */
    billingCustomerID?: string | null;
  }

  interface ICreateProductSubscriptionOnDotcomMutationArguments {
    /**
     * The ID of the user (i.e., customer) to whom this product subscription is assigned.
     */
    accountID: string;
  }

  interface ISetProductSubscriptionBillingOnDotcomMutationArguments {
    /**
     * The product subscription to update.
     */
    id: string;

    /**
     * The billing subscription ID (on the billing system) to associate this product subscription with. If null,
     * the association is removed (i.e., the subscription is unlinked from billing).
     */
    billingSubscriptionID?: string | null;
  }

  interface IGenerateProductLicenseForSubscriptionOnDotcomMutationArguments {
    /**
     * The product subscription to associate with the license.
     */
    productSubscriptionID: string;

    /**
     * The license to generate.
     */
    license: IProductLicenseInput;
  }

  interface ICreatePaidProductSubscriptionOnDotcomMutationArguments {
    /**
     * The ID of the user (i.e., customer) to whom the product subscription is assigned.
     * Only Sourcegraph.com site admins may perform this mutation for an accountID != the user ID of the
     * authenticated user.
     */
    accountID: string;

    /**
     * The details of the product subscription.
     */
    productSubscription: IProductSubscriptionInput;

    /**
     * The token that represents the payment method used to purchase this product subscription,
     * or null if no payment is required.
     */
    paymentToken?: string | null;
  }

  interface IUpdatePaidProductSubscriptionOnDotcomMutationArguments {
    /**
     * The subscription to update.
     */
    subscriptionID: string;

    /**
     * The updated details of the product subscription. All fields of the input type must be set
     * (i.e., it does not support passing a null value to mean "do not update this field's
     * value").
     */
    update: IProductSubscriptionInput;

    /**
     * The token that represents the payment method used to pay for (or receive credit for) this
     * product subscription update, or null if no payment is required.
     */
    paymentToken?: string | null;
  }

  interface IArchiveProductSubscriptionOnDotcomMutationArguments {
    id: string;
  }

  /**
   * An input type that describes a product license to be generated and signed.
   * FOR INTERNAL USE ONLY.
   */
  interface IProductLicenseInput {
    /**
     * The tags that indicate which features are activated by this license.
     */
    tags: Array<string>;

    /**
     * The number of users for which this product subscription is valid.
     */
    userCount: number;

    /**
     * The expiration date of this product license, expressed as the number of seconds since the epoch.
     */
    expiresAt: number;
  }

  /**
   * The result of Mutation.dotcom.createPaidProductSubscription.
   * FOR INTERNAL USE ONLY.
   */
  interface ICreatePaidProductSubscriptionResult {
    __typename: 'CreatePaidProductSubscriptionResult';

    /**
     * The newly created product subscription.
     */
    productSubscription: IProductSubscription;
  }

  /**
   * The result of Mutation.dotcom.updatePaidProductSubscription.
   * FOR INTERNAL USE ONLY.
   */
  interface IUpdatePaidProductSubscriptionResult {
    __typename: 'UpdatePaidProductSubscriptionResult';

    /**
     * The updated product subscription.
     */
    productSubscription: IProductSubscription;
  }

  /**
   * A user (identified either by username or email address) with its repository permission.
   */
  interface IUserPermission {
    /**
     * Depending on the bindID option in the permissions.userMapping site configuration property,
     * the elements of the list are either all usernames (bindID of "username") or all email
     * addresses (bindID of "email").
     */
    bindID: string;

    /**
     * The highest level of repository permission.
     * @default "READ"
     */
    permission?: RepositoryPermission | null;
  }

  /**
   * All possible types of changesets that can be specified in a changeset spec.
   */
  type ChangesetDescription =
    | IExistingChangesetReference
    | IGitBranchChangesetDescription;

  /**
   * A reference to a changeset that already exists on a code host (and was not created by the
   * campaign).
   */
  interface IExistingChangesetReference {
    __typename: 'ExistingChangesetReference';

    /**
     * The repository that contains the existing changeset on the code host.
     */
    baseRepository: IRepository;

    /**
     * The ID that uniquely identifies the existing changeset on the code host.
     *
     * For GitHub and Bitbucket Server, this is the pull request number (as a string) in the
     * base repository. For example, "1234" for PR 1234.
     */
    externalID: string;
  }

  /**
   * A description of a changeset that represents the proposal to merge one branch into another.
   * This is used to describe a pull request (on GitHub and Bitbucket Server).
   */
  interface IGitBranchChangesetDescription {
    __typename: 'GitBranchChangesetDescription';

    /**
     * The repository that this changeset spec is proposing to change.
     */
    baseRepository: IRepository;

    /**
     * The full name of the Git ref in the base repository that this changeset is based on (and is
     * proposing to be merged into). This ref must exist on the base repository. For example,
     * "refs/heads/master" or "refs/heads/main".
     */
    baseRef: string;

    /**
     * The base revision this changeset is based on. It is the latest commit in
     * baseRef at the time when the changeset spec was created.
     * For example: "4095572721c6234cd72013fd49dff4fb48f0f8a4"
     */
    baseRev: string;

    /**
     * The repository that contains the branch with this changeset's changes.
     *
     * Fork repositories and cross-repository changesets are not yet supported. Therefore,
     * headRepository must be equal to baseRepository.
     */
    headRepository: IRepository;

    /**
     * The full name of the Git ref that holds the changes proposed by this changeset. This ref will
     * be created or updated with the commits. For example, "refs/heads/fix-foo" (for
     * the Git branch "fix-foo").
     */
    headRef: string;

    /**
     * The title of the changeset on the code host.
     *
     * On Bitbucket Server or GitHub this is the title of the pull request.
     */
    title: string;

    /**
     * The body of the changeset on the code host.
     *
     * On Bitbucket Server or GitHub this is the body/description of the pull request.
     */
    body: string;

    /**
     * The Git commits with the proposed changes. These commits are pushed to the head ref.
     *
     * Only 1 commit is supported.
     */
    commits: Array<IGitCommitDescription>;

    /**
     * The total diff of the changeset diff.
     */
    diff: IPreviewRepositoryComparison;

    /**
     * The diffstat of this changeset spec. This data is also available
     * indirectly through the diff field above, but if only the diffStat is
     * required, this field is cheaper to access.
     */
    diffStat: IDiffStat;

    /**
     * Whether or not the changeset described here should be created right after
     * applying the ChangesetSpec this description belongs to.
     *
     * If this is false, the changeset will only be created on Sourcegraph and
     * can be previewed.
     *
     * Another ChangesetSpec with the same description, but "published: true",
     * can later be applied publish the changeset.
     */
    published: boolean;
  }

  /**
   * A description of a Git commit.
   */
  interface IGitCommitDescription {
    __typename: 'GitCommitDescription';

    /**
     * The Git commit message.
     */
    message: string;

    /**
     * The commit diff (in unified diff format).
     *
     * The filenames must not be prefixed (e.g., with 'a/' and 'b/'). Tip: use 'git diff --no-prefix'
     * to omit the prefix.
     */
    diff: string;
  }

  /**
   * A not-yet-committed preview of a diff on a repository.
   */
  interface IPreviewRepositoryComparison {
    __typename: 'PreviewRepositoryComparison';

    /**
     * The repository that is the base (left-hand side) of this comparison.
     */
    baseRepository: IRepository;

    /**
     * The file diffs for each changed file.
     */
    fileDiffs: IFileDiffConnection;
  }

  interface IFileDiffsOnPreviewRepositoryComparisonArguments {
    /**
     * Return the first n file diffs from the list.
     */
    first?: number | null;

    /**
     * Return file diffs after the given cursor.
     */
    after?: string | null;
  }

  /**
   * A changeset event in a code host (e.g., a comment on a pull request on GitHub).
   */
  interface IChangesetEvent {
    __typename: 'ChangesetEvent';

    /**
     * The unique ID for the changeset event.
     */
    id: string;

    /**
     * The changeset this event belongs to.
     */
    changeset: IExternalChangeset;

    /**
     * The date and time when the changeset was created.
     */
    createdAt: any;
  }

  /**
   * A changeset on a code host (e.g., a pull request on GitHub).
   */
  interface IExternalChangeset {
    __typename: 'ExternalChangeset';

    /**
     * The unique ID for the changeset.
     */
    id: string;

    /**
     * The external ID that uniquely identifies this ExternalChangeset on the
     * code host. For example, on GitHub this is the pull request number. This is only set once the changeset is published on the code host.
     */
    externalID: string | null;

    /**
     * The repository changed by this changeset.
     */
    repository: IRepository;

    /**
     * The campaigns that contain this changeset.
     */
    campaigns: ICampaignConnection;

    /**
     * The events belonging to this changeset.
     */
    events: IChangesetEventConnection;

    /**
     * The date and time when the changeset was created.
     */
    createdAt: any;

    /**
     * The date and time when the changeset was updated.
     */
    updatedAt: any;

    /**
     * The date and time when the next changeset sync is scheduled, or null if none is scheduled or when the initial sync hasn't happened.
     */
    nextSyncAt: any | null;

    /**
     * The title of the changeset, or null if the data hasn't been synced from the code host yet.
     */
    title: string | null;

    /**
     * The body of the changeset, or null if the data hasn't been synced from the code host yet.
     */
    body: string | null;

    /**
     * The publication state of the changeset.
     */
    publicationState: ChangesetPublicationState;

    /**
     * The reconciler state of the changeset.
     */
    reconcilerState: ChangesetReconcilerState;

    /**
     * The external state of the changeset, or null when not yet published to the code host or when the changeset data hasn't been synced from the code host yet.
     */
    externalState: ChangesetExternalState | null;

    /**
     * The labels attached to the changeset on the code host.
     */
    labels: Array<IChangesetLabel>;

    /**
     * The external URL of the changeset on the code host. Not set when changeset state is UNPUBLISHED, externalState is DELETED, or the changeset's data hasn't been synced yet.
     */
    externalURL: IExternalLink | null;

    /**
     * The review state of this changeset. This is only set once the changeset is published on the code host.
     */
    reviewState: ChangesetReviewState | null;

    /**
     * The diff of this changeset, or null if the changeset is closed (without merging) or is already merged.
     */
    diff: RepositoryComparisonInterface | null;

    /**
     * The diffstat of this changeset, or null if the changeset is closed
     * (without merging) or is already merged. This data is also available
     * indirectly through the diff field above, but if only the diffStat is
     * required, this field is cheaper to access.
     */
    diffStat: IDiffStat | null;

    /**
     * The state of the checks (e.g., for continuous integration) on this changeset, or null if no
     * checks have been configured.
     */
    checkState: ChangesetCheckState | null;

    /**
     * An error that has occurred when publishing or updating the changeset. This is only set when the changeset state is ERRORED and the viewer can administer this changeset.
     */
    error: string | null;

    /**
     * The current changeset spec for this changeset.
     *
     * Null if the changeset was only imported.
     */
    currentSpec: IVisibleChangesetSpec | null;
  }

  interface ICampaignsOnExternalChangesetArguments {
    /**
     * Returns the first n campaigns from the list.
     * @default 50
     */
    first?: number | null;

    /**
     * Opaque pagination cursor.
     */
    after?: string | null;

    /**
     * Only return campaigns in this state.
     */
    state?: CampaignState | null;

    /**
     * Only include campaigns that the viewer can administer.
     */
    viewerCanAdminister?: boolean | null;
  }

  interface IEventsOnExternalChangesetArguments {
    /**
     * @default 50
     */
    first?: number | null;
    after?: string | null;
  }

  /**
   * A list of changeset events.
   */
  interface IChangesetEventConnection {
    __typename: 'ChangesetEventConnection';

    /**
     * A list of changeset events.
     */
    nodes: Array<IChangesetEvent>;

    /**
     * The total number of changeset events in the connection.
     */
    totalCount: number;

    /**
     * Pagination information.
     */
    pageInfo: IPageInfo;
  }

  /**
   * A label attached to a changeset on a code host.
   */
  interface IChangesetLabel {
    __typename: 'ChangesetLabel';

    /**
     * The label's text.
     */
    text: string;

    /**
     * The label's color, as a hex color code without the . For example: "93ba13".
     */
    color: string;

    /**
     * An optional description of the label.
     */
    description: string | null;
  }

  /**
   * Either a preview or an actual repository comparison.
   */
  type RepositoryComparisonInterface =
    | IRepositoryComparison
    | IPreviewRepositoryComparison;

  /**
   * A changeset spec is an immutable description of the desired state of a changeset in a campaign. To
   * create a changeset spec, use the createChangesetSpec mutation.
   */
  interface IVisibleChangesetSpec {
    __typename: 'VisibleChangesetSpec';

    /**
     * The unique ID for a changeset spec.
     *
     * The ID is unguessable (i.e., long and randomly generated, not sequential). This is important
     * even though repository permissions also apply to viewers of changeset specs, because being
     * allowed to view a repository should not entitle a person to view all not-yet-published
     * changesets for that repository. Consider a campaign to fix a security vulnerability: the
     * campaign author may prefer to prepare all of the changesets in private so that the window
     * between revealing the problem and merging the fixes is as short as possible.
     */
    id: string;

    /**
     * The type of changeset spec.
     */
    type: ChangesetSpecType;

    /**
     * The description of the changeset.
     */
    description: ChangesetDescription;

    /**
     * The date, if any, when this changeset spec expires and is automatically purged. A changeset
     * spec never expires (and this field is null) if its campaign spec has been applied.
     */
    expiresAt: any | null;
  }

  /**
   * The default settings for the Sourcegraph instance. This is hardcoded in
   * Sourcegraph, but may change from release to release.
   */
  interface IDefaultSettings {
    __typename: 'DefaultSettings';

    /**
     * The opaque GraphQL ID.
     */
    id: string;

    /**
     * The latest default settings (this never changes).
     */
    latestSettings: ISettings | null;

    /**
     * The URL to the default settings. This URL does not exist because you
     * cannot edit or directly view default settings.
     */
    settingsURL: string | null;

    /**
     * Whether the viewer can modify the subject's settings. Always false for
     * default settings.
     */
    viewerCanAdminister: boolean;

    /**
     * The default settings, and the final merged settings.
     * All viewers can access this field.
     */
    settingsCascade: ISettingsCascade;

    /**
     * DEPRECATED
     * @deprecated "Use settingsCascade instead. This field is a deprecated alias for it and will be removed in a future release."
     */
    configurationCascade: IConfigurationCascade;
  }

  /**
   * A deployment configuration.
   */
  interface IDeploymentConfiguration {
    __typename: 'DeploymentConfiguration';

    /**
     * The email.
     */
    email: string | null;

    /**
     * The site ID.
     */
    siteID: string | null;
  }

  /**
   * A diff between two diffable Git objects.
   */
  interface IDiff {
    __typename: 'Diff';

    /**
     * The diff's repository.
     */
    repository: IRepository;

    /**
     * The revision range of the diff.
     */
    range: IGitRevisionRange;
  }

  /**
   * A search result that is a diff between two diffable Git objects.
   */
  interface IDiffSearchResult {
    __typename: 'DiffSearchResult';

    /**
     * The diff that matched the search query.
     */
    diff: IDiff;

    /**
     * The matching portion of the diff.
     */
    preview: IHighlightedString;
  }

  /**
   * The result of Mutation.extensionRegistry.publishExtension.
   */
  interface IExtensionRegistryPublishExtensionResult {
    __typename: 'ExtensionRegistryPublishExtensionResult';

    /**
     * The extension that was just published.
     */
    extension: IRegistryExtension;
  }

  /**
   * A changeset spec is an immutable description of the desired state of a changeset in a campaign. To
   * create a changeset spec, use the createChangesetSpec mutation.
   */
  interface IHiddenChangesetSpec {
    __typename: 'HiddenChangesetSpec';

    /**
     * The unique ID for a changeset spec.
     *
     * The ID is unguessable (i.e., long and randomly generated, not sequential). This is important
     * even though repository permissions also apply to viewers of changeset specs, because being
     * allowed to view a repository should not entitle a person to view all not-yet-published
     * changesets for that repository. Consider a campaign to fix a security vulnerability: the
     * campaign author may prefer to prepare all of the changesets in private so that the window
     * between revealing the problem and merging the fixes is as short as possible.
     */
    id: string;

    /**
     * The type of changeset spec.
     */
    type: ChangesetSpecType;

    /**
     * The date, if any, when this changeset spec expires and is automatically purged. A changeset
     * spec never expires (and this field is null) if its campaign spec has been applied.
     */
    expiresAt: any | null;
  }

  /**
   * A changeset on a code host that the user does not have access to.
   */
  interface IHiddenExternalChangeset {
    __typename: 'HiddenExternalChangeset';

    /**
     * The unique ID for the changeset.
     */
    id: string;

    /**
     * The campaigns that contain this changeset.
     */
    campaigns: ICampaignConnection;

    /**
     * The publication state of the changeset.
     */
    publicationState: ChangesetPublicationState;

    /**
     * The reconciler state of the changeset.
     */
    reconcilerState: ChangesetReconcilerState;

    /**
     * The external state of the changeset, or null when not yet opened.
     */
    externalState: ChangesetExternalState | null;

    /**
     * The date and time when the changeset was created.
     */
    createdAt: any;

    /**
     * The date and time when the changeset was updated.
     */
    updatedAt: any;

    /**
     * The date and time when the next changeset sync is scheduled, or null if none is scheduled.
     */
    nextSyncAt: any | null;
  }

  interface ICampaignsOnHiddenExternalChangesetArguments {
    /**
     * Returns the first n campaigns from the list.
     * @default 50
     */
    first?: number | null;

    /**
     * Opaque pagination cursor.
     */
    after?: string | null;

    /**
     * Only return campaigns in this state.
     */
    state?: CampaignState | null;

    /**
     * Only include campaigns that the viewer can administer.
     */
    viewerCanAdminister?: boolean | null;
  }

  /**
   * A virtual file is an arbitrary file that is generated in memory.
   */
  interface IVirtualFile {
    __typename: 'VirtualFile';

    /**
     * The full path (relative to the root) of this file.
     */
    path: string;

    /**
     * The base name (i.e., file name only) of this file.
     */
    name: string;

    /**
     * False because this is a file, not a directory.
     */
    isDirectory: boolean;

    /**
     * The content of this file.
     */
    content: string;

    /**
     * The file size in bytes.
     */
    byteSize: number;

    /**
     * Whether or not it is binary.
     */
    binary: boolean;

    /**
     * The file rendered as rich HTML, or an empty string if it is not a supported
     * rich file type.
     * This HTML string is already escaped and thus is always safe to render.
     */
    richHTML: string;

    /**
     * Not implemented.
     */
    url: string;

    /**
     * Not implemented.
     */
    canonicalURL: string;

    /**
     * Not implemented.
     */
    externalURLs: Array<IExternalLink>;

    /**
     * Highlight the file.
     */
    highlight: IHighlightedFile;
  }

  interface IHighlightOnVirtualFileArguments {
    disableTimeout: boolean;
    isLightTheme: boolean;

    /**
     * If highlightLongLines is true, lines which are longer than 2000 bytes are highlighted.
     * 2000 bytes is enabled. This may produce a significant amount of HTML
     * which some browsers (such as Chrome, but not Firefox) may have trouble
     * rendering efficiently.
     * @default false
     */
    highlightLongLines?: boolean | null;
  }
}

// tslint:enable
