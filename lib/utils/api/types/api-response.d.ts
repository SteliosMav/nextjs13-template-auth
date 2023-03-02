import { ApiError } from "@/lib/utils/api/api-error";
import { ApiSuccess } from "@/lib/utils/api/api-success";
import { HttpStatusCode } from "axios";

export type ApiResponse<T> = ApiError | ApiSuccess<T>;
