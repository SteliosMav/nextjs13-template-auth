import { ApiError } from "@/lib/utils/error-handler";
import { HttpStatusCode } from "axios";

export type ApiResponse<T> = ApiError | ApiSuccess<T>;
export type ApiSuccess<T> = {
  data: T;
};
