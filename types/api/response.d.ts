export type APIResponse<T> =
  | {
      data: T;
    }
  | {
      error: string;
      message: string;
    };
export type APISuccessResponse<T> = Extract<APIResponse<T>, { data: T }>;
export type APIErrorResponse = Extract<APIResponse<unknown>, { error: string }>;
