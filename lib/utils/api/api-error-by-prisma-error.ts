import { Prisma } from "@prisma/client";
import { HttpStatusCode } from "axios";
import { ApiError } from "./api-error";

export default function apiErrorByPrismaError(
  error:
    | Prisma.PrismaClientKnownRequestError
    | Prisma.PrismaClientValidationError
): ApiError {
  let message = error.message;
  let statusCode = 500;
  if (error instanceof Prisma.PrismaClientValidationError) {
    statusCode = HttpStatusCode.BadRequest;
    message = "Invalid payload.";
  } else {
    switch (error.code) {
      case "P1000":
      case "P1001":
      case "P1002":
      case "P1003":
      case "P1010":
      case "P1011":
        statusCode = HttpStatusCode.BadRequest;
        break;
      case "P2001":
      case "P2002":
      case "P2003":
      case "P2004":
      case "P2010":
        statusCode = HttpStatusCode.Conflict;
        break;
      case "P2011":
        statusCode = HttpStatusCode.NotFound;
        break;
      // Add more cases for other Prisma error codes as needed
    }
  }
  return new ApiError(statusCode, message);
}
