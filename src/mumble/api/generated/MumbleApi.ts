/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DeletedPost {
  /**
   * ULID
   * Universally Unique Lexicographically Sortable Identifier (e.g. 01GEESHPQQ4NJKNZJN9AKWQW6G)
   * @format ULID
   */
  id?: string
}

export interface LikeInfo {
  /**
   * ULID
   * Universally Unique Lexicographically Sortable Identifier (e.g. 01GEESHPQQ4NJKNZJN9AKWQW6G)
   * @format ULID
   */
  postId?: string
  /**
   * The userid of the user that liked the post.
   * @example "179944860378202369"
   */
  userId?: string | null
}

/**
 * Post in Mumble. This is user generated content.
 * Posts can be deleted by the user who created them.
 */
export interface Post {
  /**
   * ULID
   * ID of the post, defined in the ULID format.
   * @format ulid
   * @example "01GDMMR85BEHP8AKV8ZGGM259K"
   */
  id?: string
  /**
   * Public user information. This information is publicly available to everyone.
   * It contains basic information such as the ID.
   */
  creator?: PublicUser
  /**
   * Text for the post. Can be null if the post is only a media post.
   * Can contain hashtags and mentions.
   * @example "Hello World! #newpost."
   */
  text?: string | null
  /**
   * URL - if any - to the media object attached to this post.
   * @example "https://storage.googleapis.com/cas-fee-adv-mumble-api/1094b5e0-5f30-4f0b-a342-ae12936c42ff"
   */
  mediaUrl?: string | null
  /**
   * If mediaUrl is set, this field contains the mime type of the media object.
   * @example "image/png"
   */
  mediaType?: string | null
  /**
   * Number of total likes on this post.
   * @format int32
   * @example 42
   */
  likes?: number
  /**
   * Indicates if the current user liked this post. If the call was made unauthorized,
   * this field is "null" or absent. Otherwise `true` indicates that the authorized user
   * liked this post.
   */
  likedBySelf?: boolean | null
  /**
   * Number of total replies for this post.
   * @format int32
   * @example 42
   */
  replies?: number
}

export interface PostBase {
  /**
   * ULID
   * ID of the post, defined in the ULID format.
   * @format ulid
   * @example "01GDMMR85BEHP8AKV8ZGGM259K"
   */
  id?: string
  /**
   * Public user information. This information is publicly available to everyone.
   * It contains basic information such as the ID.
   */
  creator?: PublicUser
  /**
   * Text for the post. Can be null if the post is only a media post.
   * Can contain hashtags and mentions.
   * @example "Hello World! #newpost."
   */
  text?: string | null
  /**
   * URL - if any - to the media object attached to this post.
   * @example "https://storage.googleapis.com/cas-fee-adv-mumble-api/1094b5e0-5f30-4f0b-a342-ae12936c42ff"
   */
  mediaUrl?: string | null
  /**
   * If mediaUrl is set, this field contains the mime type of the media object.
   * @example "image/png"
   */
  mediaType?: string | null
  /**
   * Number of total likes on this post.
   * @format int32
   * @example 42
   */
  likes?: number
  /**
   * Indicates if the current user liked this post. If the call was made unauthorized,
   * this field is "null" or absent. Otherwise `true` indicates that the authorized user
   * liked this post.
   */
  likedBySelf?: boolean | null
}

/**
 * Paginated API result that contains arbitrary
 * data and an optional link for the next / previous page.
 */
export interface PostPaginatedResult {
  /**
   * The total count of results.
   * @format int32
   * @example 1337
   */
  count?: number
  /** The data for this given page. */
  data?: Post[]
  /**
   * Link to next page. If this is null, there is no next page.
   * The link will contain pagination information (offset, limit).
   * If returned by a search, the link will not contain the search parameters.
   */
  next?: string | null
  /**
   * Link to previous page. If this is null, there is no next page.
   * The link will contain pagination information (offset, limit).
   * If returned by a search, the link will not contain the search parameters.
   */
  previous?: string | null
}

/**
 * Public user information. This information is publicly available to everyone.
 * It contains basic information such as the ID.
 */
export interface PublicUser {
  /**
   * ID of the user who created the post.
   * @example "179944860378202369"
   */
  id?: string | null
  /**
   * The username of the creator.
   * @example "max_muster"
   */
  username?: string | null
  /**
   * The display name of the creator.
   * @example "max muster"
   */
  displayName?: string | null
  /** If set, points to the avatar of the user. */
  avatarUrl?: string | null
}

/** A reply to a post. */
export interface Reply {
  /**
   * ULID
   * ID of the post, defined in the ULID format.
   * @format ulid
   * @example "01GDMMR85BEHP8AKV8ZGGM259K"
   */
  id?: string
  /**
   * Public user information. This information is publicly available to everyone.
   * It contains basic information such as the ID.
   */
  creator?: PublicUser
  /**
   * Text for the post. Can be null if the post is only a media post.
   * Can contain hashtags and mentions.
   * @example "Hello World! #newpost."
   */
  text?: string | null
  /**
   * URL - if any - to the media object attached to this post.
   * @example "https://storage.googleapis.com/cas-fee-adv-mumble-api/1094b5e0-5f30-4f0b-a342-ae12936c42ff"
   */
  mediaUrl?: string | null
  /**
   * If mediaUrl is set, this field contains the mime type of the media object.
   * @example "image/png"
   */
  mediaType?: string | null
  /**
   * Number of total likes on this post.
   * @format int32
   * @example 42
   */
  likes?: number
  /**
   * Indicates if the current user liked this post. If the call was made unauthorized,
   * this field is "null" or absent. Otherwise `true` indicates that the authorized user
   * liked this post.
   */
  likedBySelf?: boolean | null
  /**
   * ULID
   * The ID of the parent post.
   * @format ULID
   */
  parentId?: string
}

/**
 * Paginated API result that contains arbitrary
 * data and an optional link for the next / previous page.
 */
export interface ReplyPaginatedResult {
  /**
   * The total count of results.
   * @format int32
   * @example 1337
   */
  count?: number
  /** The data for this given page. */
  data?: Reply[]
  /**
   * Link to next page. If this is null, there is no next page.
   * The link will contain pagination information (offset, limit).
   * If returned by a search, the link will not contain the search parameters.
   */
  next?: string | null
  /**
   * Link to previous page. If this is null, there is no next page.
   * The link will contain pagination information (offset, limit).
   * If returned by a search, the link will not contain the search parameters.
   */
  previous?: string | null
}

/** Data that is used to patch a given post. */
export interface UpdatePostData {
  /**
   * Text for the post. If omitted, the text will not be updated.
   * If set to empty string, the text will be removed.
   */
  text?: string | null
}

/** Model to update user data. */
export interface UpdateUserData {
  /** If set, updates the firstname of the profile. */
  firstname?: string | null
  /** If set, updates the lastname of the profile. */
  lastname?: string | null
  /** If set, updates the username of the profile. */
  username?: string | null
}

/**
 * User information inside Mumble. This information can only be fetched
 * when requested by an authenticated user.
 */
export interface User {
  /**
   * ID of the user who created the post.
   * @example "179944860378202369"
   */
  id?: string | null
  /**
   * The username of the creator.
   * @example "max_muster"
   */
  username?: string | null
  /**
   * The display name of the creator.
   * @example "max muster"
   */
  displayName?: string | null
  /** If set, points to the avatar of the user. */
  avatarUrl?: string | null
  /** Firstname of the user. */
  firstname?: string | null
  /** Lastname of the user. */
  lastname?: string | null
}

/**
 * Paginated API result that contains arbitrary
 * data and an optional link for the next / previous page.
 */
export interface UserPaginatedResult {
  /**
   * The total count of results.
   * @format int32
   * @example 1337
   */
  count?: number
  /** The data for this given page. */
  data?: User[]
  /**
   * Link to next page. If this is null, there is no next page.
   * The link will contain pagination information (offset, limit).
   * If returned by a search, the link will not contain the search parameters.
   */
  next?: string | null
  /**
   * Link to previous page. If this is null, there is no next page.
   * The link will contain pagination information (offset, limit).
   * If returned by a search, the link will not contain the search parameters.
   */
  previous?: string | null
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  JsonApi = 'application/vnd.api+json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = ''
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.JsonApi]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) => {
      if (input instanceof FormData) {
        return input
      }

      return Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`
        )
        return formData
      }, new FormData())
    },
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  }

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    }
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const responseToParse = responseFormat ? response.clone() : response
      const data = !responseFormat
        ? r
        : await responseToParse[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch((e) => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title Mumble API
 * @version v1
 * @license Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0)
 * @contact smartive AG <hello@smartive.ch> (https://smartive.ch)
 *
 * API for 'mumble'. A simple messaging/twitter like API for the CAS Frontend Engineering Advanced.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  posts = {
    /**
     * @description Fetch or search a paginated list of posts, ordered by the time of their creation.
     *
     * @tags Post
     * @name PostsList
     * @summary Fetch/Search a paginated list of posts.
     * @request GET:/posts
     * @secure
     */
    postsList: (
      query?: {
        /**
         * ULID
         * ID of a post. If set, only return posts that are newer than the given post ID.
         * If omitted, no newer than filter is applied. The ID is a ULID (e.g. 01GEESHPQQ4NJKNZJN9AKWQW6G).
         * @format ULID
         */
        newerThan?: string
        /**
         * ULID
         * ID of a post. If set, only return posts that are older than the given post ID.
         * If omitted, no older than filter is applied.
         * @format ULID
         */
        olderThan?: string
        /** If set, search for posts that contain a specific text. */
        text?: string
        /** Search for posts that contain this tag (#TEXT). */
        tags?: string[]
        /**
         * Search for posts that were created by one of the given users (ID).
         * All IDs must be valid user IDs and are "OR"ed.
         */
        creators?: string[]
        /**
         * Search for posts that were liked by specific user(s).
         * Multiple user IDs are "OR"ed (if a post is liked by user A OR B).
         */
        likedBy?: string[]
        /**
         * The offset for pagination of further calls. Defaults to 0 if omitted.
         * @format int32
         * @example 0
         */
        offset?: number
        /**
         * The limit of items to return. Minimum is 1, maximum is 1000.
         * Defaults to 100.
         * @format int32
         * @example 100
         */
        limit?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<PostPaginatedResult, void>({
        path: `/posts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new post with the logged in user. A post can contain text and/or an image. Either text or the image must be provided, otherwise a BadRequest is returned. Upload Limit: 2 MB.
     *
     * @tags Post
     * @name PostsCreate
     * @summary Create a new post.
     * @request POST:/posts
     * @secure
     */
    postsCreate: (
      data: {
        /**
         * Text for the new post. If not set, a media file must be set.
         * If both are omitted, the API will return a 400 Bad Request.
         */
        text?: string
        /**
         * Media file for the post. If not set, a text must be set.
         * If both are omitted, the API will return a 400 Bad Request.
         * @format binary
         */
        media?: File
      },
      params: RequestParams = {}
    ) =>
      this.request<Post, void>({
        path: `/posts`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Post
     * @name PostsDetail
     * @summary Fetch a specific post with the given ID.
     * @request GET:/posts/{id}
     * @secure
     */
    postsDetail: (id: string, params: RequestParams = {}) =>
      this.request<Post, void>({
        path: `/posts/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update (replace) a post. This replaces the entire post. If the post does not exist, a NotFound is returned. If the post is not valid (has no text and no media), a BadRequest is returned. There is no partial update on this method.
     *
     * @tags Post
     * @name PostsUpdate
     * @summary Update a post with the given ID.
     * @request PUT:/posts/{id}
     * @secure
     */
    postsUpdate: (
      id: string,
      data: {
        /**
         * Text for the new post. If not set, a media file must be set.
         * If both are omitted, the API will return a 400 Bad Request.
         */
        text?: string
        /**
         * Media file for the post. If not set, a text must be set.
         * If both are omitted, the API will return a 400 Bad Request.
         * @format binary
         */
        media?: File
      },
      params: RequestParams = {}
    ) =>
      this.request<Post, void>({
        path: `/posts/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description This partially updates (patches) a post with the given ID. All fields that are "null" are ignored and not updated. If the post text is set to an empty string, it will be removed (null). The post must always have either text or media. If this patch results in a post with no text and no media, a BadRequest is returned.
     *
     * @tags Post
     * @name PostsPartialUpdate
     * @summary Partial update of a post.
     * @request PATCH:/posts/{id}
     * @secure
     */
    postsPartialUpdate: (id: string, data: UpdatePostData, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/posts/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description This can be a post or a reply. The post is marked as deleted and will not be returned in any search.
     *
     * @tags Post
     * @name PostsDelete
     * @summary Delete a given post.
     * @request DELETE:/posts/{id}
     * @secure
     */
    postsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/posts/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description This replaces the entire media of the post and returns the new media URL.
     *
     * @tags Post
     * @name MediaUpdate
     * @summary Update the media of a post.
     * @request PUT:/posts/{id}/media
     * @secure
     */
    mediaUpdate: (
      id: string,
      data: {
        /**
         * Media file for the upload.
         * @format binary
         */
        media?: File
      },
      params: RequestParams = {}
    ) =>
      this.request<string, void>({
        path: `/posts/${id}/media`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Remove the media of a post with the given ID. The post must always have either text or media. If this delete results in a post with no text and no media, a BadRequest is returned.
     *
     * @tags Post
     * @name MediaDelete
     * @summary Remove the media of a post.
     * @request DELETE:/posts/{id}/media
     * @secure
     */
    mediaDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/posts/${id}/media`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Fetch a list of (paginated) replies for a given post. There is only one level for replies. Replies cannot have replies. Trying to fetch replies for a reply will result in a BadRequest.
     *
     * @tags Post
     * @name RepliesList
     * @summary Fetch a list of replies.
     * @request GET:/posts/{id}/replies
     * @secure
     */
    repliesList: (
      id: string,
      query?: {
        /**
         * The offset for pagination of further calls. Defaults to 0 if omitted.
         * @format int32
         * @example 0
         */
        offset?: number
        /**
         * The limit of items to return. Minimum is 1, maximum is 1000.
         * Defaults to 100.
         * @format int32
         * @example 100
         */
        limit?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<ReplyPaginatedResult, void>({
        path: `/posts/${id}/replies`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new reply to a post. It is not possible to create a reply to a reply. This results in a BadRequest.
     *
     * @tags Post
     * @name RepliesCreate
     * @summary Create a reply to a post.
     * @request POST:/posts/{id}/replies
     * @secure
     */
    repliesCreate: (
      id: string,
      data: {
        /**
         * Text for the new post. If not set, a media file must be set.
         * If both are omitted, the API will return a 400 Bad Request.
         */
        text?: string
        /**
         * Media file for the post. If not set, a text must be set.
         * If both are omitted, the API will return a 400 Bad Request.
         * @format binary
         */
        media?: File
      },
      params: RequestParams = {}
    ) =>
      this.request<Reply, void>({
        path: `/posts/${id}/replies`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description  A user can only like a post once. This is an idempotent operation. If the user already likes the post, nothing is updated.
     *
     * @tags Post
     * @name LikesUpdate
     * @summary Like a post.
     * @request PUT:/posts/{id}/likes
     * @secure
     */
    likesUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/posts/${id}/likes`,
        method: 'PUT',
        secure: true,
        ...params,
      }),

    /**
     * @description Unlike the given post for the current user. If the user does not like the post, nothing is updated.
     *
     * @tags Post
     * @name LikesDelete
     * @summary Unlike a post.
     * @request DELETE:/posts/{id}/likes
     * @secure
     */
    likesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/posts/${id}/likes`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description The server sent events contain newly created posts as well as updated posts. Depending on the authentication state, the post contain more or less information. Currently, the following events are supported: - postCreated (for creating a new post or a reply) - postUpdated - postDeleted - postLiked - postUnliked As an example, using the posts server sent events in javascript is done as follows: ```js const evtSource = new EventSource("/posts/_sse"); evtSource.addEventListener('postCreated', (e) => console.log(e.data)); ``` You may read more about server sent events in the [documentation about Using Server Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events)
     *
     * @tags Real Time Data
     * @name SseList
     * @summary Get a stream of new or updated posts via Server Sent Event push.
     * @request GET:/posts/_sse
     * @secure
     */
    sseList: (params: RequestParams = {}) =>
      this.request<
        (
          | {
              /**
               * ID of the event.
               * @format uuid
               */
              id: any
              /**
               * Event type.
               * @format string
               */
              event: 'postCreated'
              /**
               * Post in Mumble. This is user generated content.
               * Posts can be deleted by the user who created them.
               */
              data: Post
            }
          | {
              /**
               * ID of the event.
               * @format uuid
               */
              id: any
              /**
               * Event type.
               * @format string
               */
              event: 'postCreated'
              /** A reply to a post. */
              data: Reply
            }
          | {
              /**
               * ID of the event.
               * @format uuid
               */
              id: any
              /**
               * Event type.
               * @format string
               */
              event: 'postUpdated'
              data: PostBase
            }
          | {
              /**
               * ID of the event.
               * @format uuid
               */
              id: any
              /**
               * Event type.
               * @format string
               */
              event: 'postDeleted'
              data: DeletedPost
            }
          | {
              /**
               * ID of the event.
               * @format uuid
               */
              id: any
              /**
               * Event type.
               * @format string
               */
              event: 'postLiked'
              data: LikeInfo
            }
          | {
              /**
               * ID of the event.
               * @format uuid
               */
              id: any
              /**
               * Event type.
               * @format string
               */
              event: 'postUnliked'
              data: LikeInfo
            }
        )[],
        | void
        | {
            /**
             * ID of the event.
             * @format uuid
             */
            id: any
            /**
             * Event type.
             * @format string
             */
            event: 'postCreated'
            /**
             * Post in Mumble. This is user generated content.
             * Posts can be deleted by the user who created them.
             */
            data: Post
          }
        | {
            /**
             * ID of the event.
             * @format uuid
             */
            id: any
            /**
             * Event type.
             * @format string
             */
            event: 'postCreated'
            /** A reply to a post. */
            data: Reply
          }
        | {
            /**
             * ID of the event.
             * @format uuid
             */
            id: any
            /**
             * Event type.
             * @format string
             */
            event: 'postUpdated'
            data: PostBase
          }
        | {
            /**
             * ID of the event.
             * @format uuid
             */
            id: any
            /**
             * Event type.
             * @format string
             */
            event: 'postDeleted'
            data: DeletedPost
          }
        | {
            /**
             * ID of the event.
             * @format uuid
             */
            id: any
            /**
             * Event type.
             * @format string
             */
            event: 'postLiked'
            data: LikeInfo
          }
        | {
            /**
             * ID of the event.
             * @format uuid
             */
            id: any
            /**
             * Event type.
             * @format string
             */
            event: 'postUnliked'
            data: LikeInfo
          }
      >({
        path: `/posts/_sse`,
        method: 'GET',
        secure: true,
        ...params,
      }),
  }
  users = {
    /**
     * @description Fetch a paginated list of users. If the caller is authenticated, the user list will contain more data.
     *
     * @tags User
     * @name UsersList
     * @summary Fetch a paginated list of users.
     * @request GET:/users
     * @secure
     */
    usersList: (
      query?: {
        /**
         * The offset for pagination of further calls. Defaults to 0 if omitted.
         * @format int32
         * @example 0
         */
        offset?: number
        /**
         * The limit of items to return. Minimum is 1, maximum is 1000.
         * Defaults to 100.
         * @format int32
         * @example 100
         */
        limit?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<UserPaginatedResult, void>({
        path: `/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Update the current authenticated user profile. Returns a bad request if fields are set to an empty string. Omitting a field does not update them. Uploading an avatar is done via the /users/avatar endpoint. The username is unique, duplicating it results in an error.
     *
     * @tags User
     * @name UsersPartialUpdate
     * @summary Update the authenticated user profile.
     * @request PATCH:/users
     * @secure
     */
    usersPartialUpdate: (data: UpdateUserData, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * @description Fetch a specific user profile from the API. If the caller is authenticated, more information than the public profile is provided.
     *
     * @tags User
     * @name UsersDetail
     * @summary Get a specific user by their ID.
     * @request GET:/users/{id}
     * @secure
     */
    usersDetail: (id: string, params: RequestParams = {}) =>
      this.request<User, void>({
        path: `/users/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Upload an avatar picture for the actual authenticated user. Returns the new media url to the uploaded user avatar. Upload limit: 0.5 MB.
     *
     * @tags User
     * @name AvatarUpdate
     * @summary Upload an avatar.
     * @request PUT:/users/avatar
     * @secure
     */
    avatarUpdate: (
      data: {
        /**
         * Media file for the upload.
         * @format binary
         */
        media?: File
      },
      params: RequestParams = {}
    ) =>
      this.request<void, void>({
        path: `/users/avatar`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * @description Remove the current avatar picture (if any) for the actual authenticated user.
     *
     * @tags User
     * @name AvatarDelete
     * @summary Remove an avatar.
     * @request DELETE:/users/avatar
     * @secure
     */
    avatarDelete: (params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/avatar`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description  Fetch a (paginated) list of followers for a given user (All users that follow the given user). Returns only public information (public profile).
     *
     * @tags User
     * @name FollowersList
     * @summary Fetch a list of followers.
     * @request GET:/users/{id}/followers
     * @secure
     */
    followersList: (
      id: string,
      query?: {
        /**
         * The offset for pagination of further calls. Defaults to 0 if omitted.
         * @format int32
         * @example 0
         */
        offset?: number
        /**
         * The limit of items to return. Minimum is 1, maximum is 1000.
         * Defaults to 100.
         * @format int32
         * @example 100
         */
        limit?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<UserPaginatedResult, void>({
        path: `/users/${id}/followers`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Add the currently authenticated user as a follower to the given user (id). User A (authenticated) calls this endpoint to follow user B (id).
     *
     * @tags User
     * @name FollowersUpdate
     * @summary Follow a user.
     * @request PUT:/users/{id}/followers
     * @secure
     */
    followersUpdate: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/${id}/followers`,
        method: 'PUT',
        secure: true,
        ...params,
      }),

    /**
     * @description Remove the currently authenticated user from the follower list of the given user (id). User A (authenticated) calls this endpoint to unfollow user B (id).
     *
     * @tags User
     * @name FollowersDelete
     * @summary Unfollow a user.
     * @request DELETE:/users/{id}/followers
     * @secure
     */
    followersDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/users/${id}/followers`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Fetch a (paginated) list of followees for a given user(All users that are being followed by the given user). Returns only public information (public profile).
     *
     * @tags User
     * @name FolloweesList
     * @summary Fetch a list of followees.
     * @request GET:/users/{id}/followees
     * @secure
     */
    followeesList: (
      id: string,
      query?: {
        /**
         * The offset for pagination of further calls. Defaults to 0 if omitted.
         * @format int32
         * @example 0
         */
        offset?: number
        /**
         * The limit of items to return. Minimum is 1, maximum is 1000.
         * Defaults to 100.
         * @format int32
         * @example 100
         */
        limit?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<UserPaginatedResult, void>({
        path: `/users/${id}/followees`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),
  }
}
