import { ApiError } from "@/lib/api/api-error";
import { ApiSuccess } from "@/lib/api/api-success";
import { HttpStatusCode } from "axios";

export type ApiResponse<T> = ApiError | ApiSuccess<T>;
