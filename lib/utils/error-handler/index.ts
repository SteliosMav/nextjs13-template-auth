import { ApiResponse } from "@/types/api/response";
import { HttpStatusCode } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import apiErrorByUnknown from "./api-error-by-unknown";

export default function errorHandler(handler: any) {
  return async (
    req: NextApiRequest,
    res: NextApiResponse<ApiResponse<unknown>>
  ) => {
    try {
      await handler(req, res);
    } catch (err) {
      const errRes = apiErrorByUnknown(err);
      return res.status(errRes.error.statusCode).json({ ...errRes });
    }
  };
}

export class ApiError {
  error: {
    statusCode: HttpStatusCode;
    message: string;
  };

  constructor(statusCode: any, message: string) {
    this.error = {
      statusCode,
      message,
    };
  }
}
