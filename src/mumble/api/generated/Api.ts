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
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => {
    return fetch(...fetchParams)
  }

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
 * @title qwacker API
 * @version 1.15.12
 * @license Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0)
 * @contact smartive AG <education@smartive.ch> (https://smartive.ch)
 *
 * API for 'mumble'. A simple messaging/twitter like api for the CAS Frontend Engineering Advanced.
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  posts = {
    /**
     * @description Fetch a paginated list of posts, ordered by the time of their creation. May contain deleted posts.
     *
     * @tags Posts
     * @name PostsControllerList
     * @request GET:/posts
     * @secure
     */
    postsControllerList: (
      query?: {
        /** The offset for pagination of further calls. Defaults to 0 if omitted. */
        offset?: number
        /** The amount of posts that is returned in one call. Minimum is 1, maximum is 1000. Defaults to 100. */
        limit?: number
        /** The ID of a post, to only return posts that are newer than the given post. If omitted, all posts are returned. */
        newerThan?: string
        /** The ID of a post, to only return posts that are older than the given post. If omitted, all posts are returned. */
        olderThan?: string
        /** The ID of a creator. Only posts of the given creator should be returned. If omitted, all posts are returned. */
        creator?: string
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          data?: {
            /**
             * ID of the post, defined in the ULID format.
             * @format ulid
             * @example "01GDMMR85BEHP8AKV8ZGGM259K"
             */
            id?: string
            /**
             * ID of the user who created the post.
             * @example "179944860378202369"
             */
            creator?: string
            /**
             * Text in the post.
             * @example "Hello World! @user #newpost"
             */
            text?: string
            /**
             * URL - if any - to the media object attached to this post.
             * @example "https://storage.googleapis.com/cas-fee-adv-qwacker-api-local-dev/1094b5e0-5f30-4f0b-a342-ae12936c42ff"
             */
            mediaUrl?: string | null
            /**
             * If mediaUrl is set, this field contains the mime type of the media object.
             * @example "image/png"
             */
            mediaType?: string | null
            /**
             * Number of total likes on this post.
             * @example 42
             */
            likeCount?: number
            /**
             * Indicates if the current user liked this post. If the call was made unauthorized, all posts are returned with this field set to false.
             * @example true
             */
            likedByUser?: boolean
            /**
             * Indicates, that this result is a post.
             * @example "post"
             */
            type?: post
            /**
             * Number of total replies to this post.
             * @example 42
             */
            replyCount?: number
          }[]
          /**
           * The total count of posts in the system.
           * @example 1000
           */
          count?: number
          /**
           * If filled, hints the next api call to make to fetch the next page.
           * @example "/posts?offset=100&limit=100"
           */
          next?: string | null
          /**
           * If filled, hints the next api call to make to fetch the previous page.
           * @example "/posts?offset=0&limit=100"
           */
          previous?: string | null
        },
        any
      >({
        path: `/posts`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a new post with the logged in user. A post can contain an optional image and must contain text.
     *
     * @tags Posts
     * @name PostsControllerCreate
     * @request POST:/posts
     * @secure
     */
    postsControllerCreate: (
      data: {
        /**
         * The text of the post.
         * @example "Hello World!"
         */
        text?: string
        /** The image of the post. */
        image?: File | null
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          /**
           * ID of the post, defined in the ULID format.
           * @format ulid
           * @example "01GDMMR85BEHP8AKV8ZGGM259K"
           */
          id?: string
          /**
           * ID of the user who created the post.
           * @example "179944860378202369"
           */
          creator?: string
          /**
           * Text in the post.
           * @example "Hello World! @user #newpost"
           */
          text?: string
          /**
           * URL - if any - to the media object attached to this post.
           * @example "https://storage.googleapis.com/cas-fee-adv-qwacker-api-local-dev/1094b5e0-5f30-4f0b-a342-ae12936c42ff"
           */
          mediaUrl?: string | null
          /**
           * If mediaUrl is set, this field contains the mime type of the media object.
           * @example "image/png"
           */
          mediaType?: string | null
          /**
           * Number of total likes on this post.
           * @example 42
           */
          likeCount?: number
          /**
           * Indicates if the current user liked this post. If the call was made unauthorized, all posts are returned with this field set to false.
           * @example true
           */
          likedByUser?: boolean
          /**
           * Indicates, that this result is a post.
           * @example "post"
           */
          type?: post
          /**
           * Number of total replies to this post.
           * @example 42
           */
          replyCount?: number
        },
        void
      >({
        path: `/posts`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Get a specific post.
     *
     * @tags Posts
     * @name PostsControllerSingle
     * @request GET:/posts/{id}
     * @secure
     */
    postsControllerSingle: (id: string, params: RequestParams = {}) =>
      this.request<
        | {
            /**
             * ID of the post, defined in the ULID format.
             * @format ulid
             * @example "01GDMMR85BEHP8AKV8ZGGM259K"
             */
            id?: string
            /**
             * ID of the user who created the post.
             * @example "179944860378202369"
             */
            creator?: string
            /**
             * Text in the post.
             * @example "Hello World! @user #newpost"
             */
            text?: string
            /**
             * URL - if any - to the media object attached to this post.
             * @example "https://storage.googleapis.com/cas-fee-adv-qwacker-api-local-dev/1094b5e0-5f30-4f0b-a342-ae12936c42ff"
             */
            mediaUrl?: string | null
            /**
             * If mediaUrl is set, this field contains the mime type of the media object.
             * @example "image/png"
             */
            mediaType?: string | null
            /**
             * Number of total likes on this post.
             * @example 42
             */
            likeCount?: number
            /**
             * Indicates if the current user liked this post. If the call was made unauthorized, all posts are returned with this field set to false.
             * @example true
             */
            likedByUser?: boolean
            /**
             * Indicates, that this result is a post.
             * @example "post"
             */
            type?: post
            /**
             * Number of total replies to this post.
             * @example 42
             */
            replyCount?: number
          }
        | {
            /**
             * ID of the post, defined in the ULID format.
             * @format ulid
             * @example "01GDMMR85BEHP8AKV8ZGGM259K"
             */
            id?: string
            /**
             * ID of the user who created the post.
             * @example "179944860378202369"
             */
            creator?: string
            /**
             * Text in the post.
             * @example "Hello World! @user #newpost"
             */
            text?: string
            /**
             * URL - if any - to the media object attached to this post.
             * @example "https://storage.googleapis.com/cas-fee-adv-qwacker-api-local-dev/1094b5e0-5f30-4f0b-a342-ae12936c42ff"
             */
            mediaUrl?: string | null
            /**
             * If mediaUrl is set, this field contains the mime type of the media object.
             * @example "image/png"
             */
            mediaType?: string | null
            /**
             * Number of total likes on this post.
             * @example 42
             */
            likeCount?: number
            /**
             * Indicates if the current user liked this post. If the call was made unauthorized, all posts are returned with this field set to false.
             * @example true
             */
            likedByUser?: boolean
            /**
             * Indicates, that this result is a reply to a post.
             * @example "reply"
             */
            type?: reply
            /**
             * Reference ID to the parent post.
             * @format ulid
             * @example "01GDMMR85BEHP8AKV8ZGGM259K"
             */
            parentId?: string
          }
        | {
            /**
             * Indicates, that this result is a deleted post.
             * @example "deleted"
             */
            type?: deleted
            /**
             * ID of the post, defined in the ULID format.
             * @format ulid
             * @example "01GDMMR85BEHP8AKV8ZGGM259K"
             */
            id?: string
            /**
             * ID of the user who created the post.
             * @example "179944860378202369"
             */
            creator?: string
            /**
             * ID of the parent.
             * @example "01GDMMR85BEHP8AKV8ZGGM259K"
             */
            parentId?: string | null
          },
        any
      >({
        path: `/posts/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a reply to a post with the logged in user. A reply can contain an optional image and must contain text.
     *
     * @tags Posts
     * @name PostsControllerReply
     * @request POST:/posts/{id}
     * @secure
     */
    postsControllerReply: (
      id: string,
      data: {
        /**
         * The text of the reply.
         * @example "Hello World!"
         */
        text?: string
        /** The image of the reply. */
        image?: File | null
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          /**
           * ID of the post, defined in the ULID format.
           * @format ulid
           * @example "01GDMMR85BEHP8AKV8ZGGM259K"
           */
          id?: string
          /**
           * ID of the user who created the post.
           * @example "179944860378202369"
           */
          creator?: string
          /**
           * Text in the post.
           * @example "Hello World! @user #newpost"
           */
          text?: string
          /**
           * URL - if any - to the media object attached to this post.
           * @example "https://storage.googleapis.com/cas-fee-adv-qwacker-api-local-dev/1094b5e0-5f30-4f0b-a342-ae12936c42ff"
           */
          mediaUrl?: string | null
          /**
           * If mediaUrl is set, this field contains the mime type of the media object.
           * @example "image/png"
           */
          mediaType?: string | null
          /**
           * Number of total likes on this post.
           * @example 42
           */
          likeCount?: number
          /**
           * Indicates if the current user liked this post. If the call was made unauthorized, all posts are returned with this field set to false.
           * @example true
           */
          likedByUser?: boolean
          /**
           * Indicates, that this result is a post.
           * @example "post"
           */
          type?: post
          /**
           * Number of total replies to this post.
           * @example 42
           */
          replyCount?: number
        },
        void
      >({
        path: `/posts/${id}`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * @description Deletes a post or reply if it exists and if the logged in user is the author.
     *
     * @tags Posts
     * @name PostsControllerDelete
     * @request DELETE:/posts/{id}
     * @secure
     */
    postsControllerDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/posts/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * @description Get an ordered list of replies for the given post.
     *
     * @tags Posts
     * @name PostsControllerReplies
     * @request GET:/posts/{id}/replies
     * @secure
     */
    postsControllerReplies: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /**
           * ID of the post, defined in the ULID format.
           * @format ulid
           * @example "01GDMMR85BEHP8AKV8ZGGM259K"
           */
          id?: string
          /**
           * ID of the user who created the post.
           * @example "179944860378202369"
           */
          creator?: string
          /**
           * Text in the post.
           * @example "Hello World! @user #newpost"
           */
          text?: string
          /**
           * URL - if any - to the media object attached to this post.
           * @example "https://storage.googleapis.com/cas-fee-adv-qwacker-api-local-dev/1094b5e0-5f30-4f0b-a342-ae12936c42ff"
           */
          mediaUrl?: string | null
          /**
           * If mediaUrl is set, this field contains the mime type of the media object.
           * @example "image/png"
           */
          mediaType?: string | null
          /**
           * Number of total likes on this post.
           * @example 42
           */
          likeCount?: number
          /**
           * Indicates if the current user liked this post. If the call was made unauthorized, all posts are returned with this field set to false.
           * @example true
           */
          likedByUser?: boolean
          /**
           * Indicates, that this result is a reply to a post.
           * @example "reply"
           */
          type?: reply
          /**
           * Reference ID to the parent post.
           * @format ulid
           * @example "01GDMMR85BEHP8AKV8ZGGM259K"
           */
          parentId?: string
        }[],
        any
      >({
        path: `/posts/${id}/replies`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Search for posts or replies in the database. The result is always paginated and ordered by the time of their creation.
     *
     * @tags Posts
     * @name PostsControllerSearch
     * @request POST:/posts/search
     * @secure
     */
    postsControllerSearch: (
      data: {
        /**
         * Search for posts that contain this text.
         * @example "Hello World"
         */
        text?: string | null
        tags?: string[]
        likedBy?: string[]
        mentions?: string[]
        /**
         * Search for posts that are replies to other posts. If omitted, all posts are searched.
         * @example false
         */
        isReply?: boolean | null
        /**
         * The offset for pagination of further calls.
         * @default 0
         * @example 0
         */
        offset?: number | null
        /**
         * The amount of posts that is returned in one call. Minimum is 1, maximum is 1000.
         * @default 100
         * @example 500
         */
        limit?: number | null
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          data?: (
            | {
                /**
                 * ID of the post, defined in the ULID format.
                 * @format ulid
                 * @example "01GDMMR85BEHP8AKV8ZGGM259K"
                 */
                id?: string
                /**
                 * ID of the user who created the post.
                 * @example "179944860378202369"
                 */
                creator?: string
                /**
                 * Text in the post.
                 * @example "Hello World! @user #newpost"
                 */
                text?: string
                /**
                 * URL - if any - to the media object attached to this post.
                 * @example "https://storage.googleapis.com/cas-fee-adv-qwacker-api-local-dev/1094b5e0-5f30-4f0b-a342-ae12936c42ff"
                 */
                mediaUrl?: string | null
                /**
                 * If mediaUrl is set, this field contains the mime type of the media object.
                 * @example "image/png"
                 */
                mediaType?: string | null
                /**
                 * Number of total likes on this post.
                 * @example 42
                 */
                likeCount?: number
                /**
                 * Indicates if the current user liked this post. If the call was made unauthorized, all posts are returned with this field set to false.
                 * @example true
                 */
                likedByUser?: boolean
                /**
                 * Indicates, that this result is a post.
                 * @example "post"
                 */
                type?: post
                /**
                 * Number of total replies to this post.
                 * @example 42
                 */
                replyCount?: number
              }
            | {
                /**
                 * ID of the post, defined in the ULID format.
                 * @format ulid
                 * @example "01GDMMR85BEHP8AKV8ZGGM259K"
                 */
                id?: string
                /**
                 * ID of the user who created the post.
                 * @example "179944860378202369"
                 */
                creator?: string
                /**
                 * Text in the post.
                 * @example "Hello World! @user #newpost"
                 */
                text?: string
                /**
                 * URL - if any - to the media object attached to this post.
                 * @example "https://storage.googleapis.com/cas-fee-adv-qwacker-api-local-dev/1094b5e0-5f30-4f0b-a342-ae12936c42ff"
                 */
                mediaUrl?: string | null
                /**
                 * If mediaUrl is set, this field contains the mime type of the media object.
                 * @example "image/png"
                 */
                mediaType?: string | null
                /**
                 * Number of total likes on this post.
                 * @example 42
                 */
                likeCount?: number
                /**
                 * Indicates if the current user liked this post. If the call was made unauthorized, all posts are returned with this field set to false.
                 * @example true
                 */
                likedByUser?: boolean
                /**
                 * Indicates, that this result is a reply to a post.
                 * @example "reply"
                 */
                type?: reply
                /**
                 * Reference ID to the parent post.
                 * @format ulid
                 * @example "01GDMMR85BEHP8AKV8ZGGM259K"
                 */
                parentId?: string
              }
          )[]
          /**
           * The total count of posts in the executed search.
           * @example 1000
           */
          count?: number
          /** If filled, hints the search parameters for the next page. */
          next?: {
            /**
             * Search for posts that contain this text.
             * @example "Hello World"
             */
            text?: string | null
            tags?: string[]
            likedBy?: string[]
            mentions?: string[]
            /**
             * Search for posts that are replies to other posts. If omitted, all posts are searched.
             * @example false
             */
            isReply?: boolean | null
            /**
             * The offset for pagination of further calls.
             * @default 0
             * @example 0
             */
            offset?: number | null
            /**
             * The amount of posts that is returned in one call. Minimum is 1, maximum is 1000.
             * @default 100
             * @example 500
             */
            limit?: number | null
          }
          /** If filled, hints the search parameters for the previous page. */
          previous?: {
            /**
             * Search for posts that contain this text.
             * @example "Hello World"
             */
            text?: string | null
            tags?: string[]
            likedBy?: string[]
            mentions?: string[]
            /**
             * Search for posts that are replies to other posts. If omitted, all posts are searched.
             * @example false
             */
            isReply?: boolean | null
            /**
             * The offset for pagination of further calls.
             * @default 0
             * @example 0
             */
            offset?: number | null
            /**
             * The amount of posts that is returned in one call. Minimum is 1, maximum is 1000.
             * @default 100
             * @example 500
             */
            limit?: number | null
          }
        },
        any
      >({
        path: `/posts/search`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * @description Create a like on a specific post.
     *
     * @tags Likes
     * @name LikesControllerLike
     * @request PUT:/posts/{id}/likes
     * @secure
     */
    likesControllerLike: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/posts/${id}/likes`,
        method: 'PUT',
        secure: true,
        ...params,
      }),

    /**
     * @description Delete a like on a specific post.
     *
     * @tags Likes
     * @name LikesControllerUnlike
     * @request DELETE:/posts/{id}/likes
     * @secure
     */
    likesControllerUnlike: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/posts/${id}/likes`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),
  }
  users = {
    /**
     * @description Fetch a paginated list of users, ordered by their username.
     *
     * @tags Users
     * @name UsersControllerList
     * @request GET:/users
     * @secure
     */
    usersControllerList: (
      query?: {
        /** The offset for pagination of further calls. Defaults to 0 if omitted. */
        offset?: number
        /** The amount of users that is returned in one call. Minimum is 1, maximum is 1000. Defaults to 100. */
        limit?: number
      },
      params: RequestParams = {}
    ) =>
      this.request<
        {
          data?: {
            /**
             * The (long) ID of the user.
             * @example "179828644301046017"
             */
            id?: string
            /**
             * The username of the user. May be used to mention someone in the posts.
             * @example "johnDoe"
             */
            userName?: string
            /**
             * The first name of the user.
             * @example "John"
             */
            firstName?: string
            /**
             * The last name of the user.
             * @example "Doe"
             */
            lastName?: string
            /** URL to the avatar of the user. This field may be empty (empty string). */
            avatarUrl?: string
          }[]
          /**
           * The total count of users in the system.
           * @example 1000
           */
          count?: number
          /**
           * If filled, hints the next api call to make to fetch the next page.
           * @example "/users?offset=100&limit=100"
           */
          next?: string | null
          /**
           * If filled, hints the next api call to make to fetch the previous page.
           * @example "/users?offset=0&limit=100"
           */
          previous?: string | null
        },
        any
      >({
        path: `/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Fetch your own authenticated profile.
     *
     * @tags Users
     * @name UsersControllerMe
     * @request GET:/users/me
     * @secure
     */
    usersControllerMe: (params: RequestParams = {}) =>
      this.request<
        {
          /**
           * The (long) ID of the user.
           * @example "179828644301046017"
           */
          id?: string
          /**
           * The username of the user. May be used to mention someone in the posts.
           * @example "johnDoe"
           */
          userName?: string
          /**
           * The first name of the user.
           * @example "John"
           */
          firstName?: string
          /**
           * The last name of the user.
           * @example "Doe"
           */
          lastName?: string
          /** URL to the avatar of the user. This field may be empty (empty string). */
          avatarUrl?: string
        },
        any
      >({
        path: `/users/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Fetch a user by id.
     *
     * @tags Users
     * @name UsersControllerGetById
     * @request GET:/users/{id}
     * @secure
     */
    usersControllerGetById: (id: string, params: RequestParams = {}) =>
      this.request<
        {
          /**
           * The (long) ID of the user.
           * @example "179828644301046017"
           */
          id?: string
          /**
           * The username of the user. May be used to mention someone in the posts.
           * @example "johnDoe"
           */
          userName?: string
          /**
           * The first name of the user.
           * @example "John"
           */
          firstName?: string
          /**
           * The last name of the user.
           * @example "Doe"
           */
          lastName?: string
          /** URL to the avatar of the user. This field may be empty (empty string). */
          avatarUrl?: string
        },
        any
      >({
        path: `/users/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),
  }
}
