import { APIErrorResponse } from "@/types/api/response";
import { Prisma } from "@prisma/client";
import { isAPIError } from "./is-api-error";
import prismaErrorHandler from "./prisma-error-handler";

export default function errorHandler(error: unknown): APIErrorResponse {
  if (isAPIError(error)) {
    return error as APIErrorResponse;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return prismaErrorHandler(error);
  } else {
    return {
      error: {
        statusCode: 500,
        message: "Internal Server Error",
      },
    };
  }
}
