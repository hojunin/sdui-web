import { Fetcher, HttpMiddlewareParams, Result } from "./interface";
import { HttpMiddleware } from "./interface";
import { getToken } from "../auth";

type CacheOptions = {
  /**
   * @description Cache policy (default cache policy option provided by fetch function)
   * @link { https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#caching-data }
   */
  policy?: RequestCache;

  /**
   * @description Time in seconds for time-based cache revalidation or false to disable revalidation (next.revalidate option provided by nextjs fetch function)
   * @link { https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#revalidating-data }
   */
  revalidate?: number | false;

  /**
   * @description Array of identifiable string keys for on-demand cache revalidation (next.tags option provided by nextjs fetch function)
   * @link { https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation }
   */
  tags?: string[];
};

// NOTE: Exclude cache option from RequestInit as it will be passed through the separate cache options object
type RequestOptions = Omit<RequestInit, "cache">;

type FetcherOptions<O, R, D = R> = {
  method: Required<RequestOptions["method"]>;
  url: string | ((options: O) => string);
  requestOption?: RequestOptions | ((options: O) => RequestOptions);
  validator?: (data: unknown) => string[] | undefined;
  transformer?: (data: R) => D;
  middlewares?: HttpMiddleware[];
  cache?: CacheOptions;
};

const authMiddleware: HttpMiddleware = ({ url, requestOptions }) => {
  const token = getToken();

  return {
    url,
    requestOptions: {
      ...requestOptions,
      headers: {
        ...requestOptions?.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    },
  };
};

export async function fetchAsResult<T>(
  url: string,
  requestOptions?: RequestInit
): Promise<Result<T, Error>> {
  try {
    const response = await fetch(url, requestOptions);
    if (response.ok) {
      // TODO: Server error handling

      // FIXME: Handle 204 NoContent
      return {
        success: true,
        data: await response.text().then((text) => {
          return text ? JSON.parse(text) : {};
        }),
      };
    } else {
      return {
        success: false,
        error: new Error(response.statusText),
        data: await response.text().then((text) => {
          return text ? JSON.parse(text) : {};
        }),
        statusCode: response.status,
      };
    }
  } catch (e) {
    return {
      success: false,
      error: e as Error,
      data: {} as T,
      statusCode: -1, // NOTE: Invalid status code
    };
  }
}

export const createFetcher = <Options, ResponseType, DataType = ResponseType>({
  method,
  url: passedUrl,
  requestOption: passedRequestOption,
  validator = () => undefined,
  transformer = (data) => data as unknown as DataType,
  middlewares = [],
  cache,
}: FetcherOptions<Options, ResponseType, DataType>): Fetcher<
  Options,
  DataType,
  Error
> => {
  const fetcher = async (
    options: Options
  ): Promise<Result<DataType, Error>> => {
    const url =
      typeof passedUrl === "function" ? passedUrl(options) : passedUrl;
    const requestOptions =
      typeof passedRequestOption === "function"
        ? passedRequestOption(options)
        : passedRequestOption;

    const { url: finalUrl, requestOptions: finalRequestOptions } = [
      authMiddleware,
      ...middlewares,
    ].reduce<HttpMiddlewareParams>((result, middleware) => middleware(result), {
      url,
      requestOptions: { ...requestOptions, method },
    });

    // fetch
    const response = await fetchAsResult<ResponseType>(finalUrl, {
      ...finalRequestOptions,
      cache: cache?.policy,
      next: {
        revalidate: cache?.revalidate,
        tags: cache?.tags,
      },
    } as RequestInit);

    if (!response.success) {
      console.error(response.error);
      return response;
    }

    const responseData = response.data;

    // validate
    const validation = validator(responseData) ?? [];
    if (validation.length > 0) {
      console.error(`[${url}] Validation Error:\n${validation.join("\n")}`);
    }

    // transform
    const transformedData = transformer(responseData);

    return {
      success: true,
      data: transformedData,
    };
  };

  return fetcher;
};
