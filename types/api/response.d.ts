export type APIResponse<T> =
  | {
      data: T;
    }
  | {
      error: string;
      message: string;
      details?: unknown;
    };
export type APISuccessResponse<T> = Extract<APIResponse<T>, { data: T }>;
export type APIErrorResponse = Extract<APIResponse<unknown>, { error: string }>;
