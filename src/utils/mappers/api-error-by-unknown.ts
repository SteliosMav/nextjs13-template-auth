import { Prisma } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { ApiError } from "../api-error";
import apiErrorByPrismaError from "./api-error-by-prisma-error";

export default function apiErrorByUnknown(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  } else if (
    // For some reason, ValidationError is not part of the KnownRequestError but
    // I want to handle it as known (bad request or invalid payload).
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientValidationError
  ) {
    return apiErrorByPrismaError(error);
  } else {
    return new ApiError(
      HttpStatusCode.InternalServerError,
      "Internal Server Error"
    );
  }
}
