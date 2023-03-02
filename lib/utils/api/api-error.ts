import { HttpStatusCode } from "axios";

export class ApiError {
  error: {
    statusCode: HttpStatusCode;
    message: string;
  };

  constructor(statusCode: HttpStatusCode, message: string) {
    this.error = {
      statusCode,
      message,
    };
  }
}
