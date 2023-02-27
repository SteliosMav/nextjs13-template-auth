import { APIErrorResponse } from "@/types/api/response";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

export default function prismaErrorHandler(
  error: PrismaClientKnownRequestError
): APIErrorResponse {
  const message = error.message;
  let statusCode = 500;
  switch (error.code) {
    case "P1000":
    case "P1001":
    case "P1002":
    case "P1003":
    case "P1010":
    case "P1011":
      statusCode = 400; // Bad Request
      break;
    case "P2001":
    case "P2002":
    case "P2003":
    case "P2004":
    case "P2010":
      statusCode = 409; // Conflict
      break;
    case "P2011":
      statusCode = 404; // Not Found
      break;
    // Add more cases for other Prisma error codes as needed
  }
  return {
    error: {
      statusCode,
      message,
    },
  };
}
