export interface HttpMiddlewareParams {
  url: string;
  requestOptions?: RequestInit & {
    params?: Record<string, string | number | boolean | string[] | number[]>;
  };
}

export type HttpMiddleware = (
  options: HttpMiddlewareParams
) => HttpMiddlewareParams;

export type Result<T, E extends Error> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: E;
      data: unknown;
      statusCode: number;
    };

export type Fetcher<O, T, E extends Error> = (
  options: O
) => Promise<Result<T, E>>;
