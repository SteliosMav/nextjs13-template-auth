export type APIResponse<T> = APIErrorResponse | APISuccessResponse<T>;
export type APISuccessResponse<T> = {
  data: T;
};
export type APIErrorResponse = {
  error: {
    statusCode: number;
    message: string;
  };
};
