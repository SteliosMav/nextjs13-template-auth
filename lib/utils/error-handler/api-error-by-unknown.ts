import { Prisma } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { ApiError } from ".";
import apiErrorByPrismaError from "./api-error-by-prisma-error";

export default function apiErrorByUnknown(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return apiErrorByPrismaError(error);
  } else {
    return new ApiError(
      HttpStatusCode.InternalServerError,
      "Internal Server Error"
    );
  }
}
