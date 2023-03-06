import { RouteHandler, RouteHandlerCtx } from "@/types/route-handler";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../api-error";
import apiErrorByUnknown from "../api-error-by-unknown";

export default function withErrorHandling(handler: RouteHandler) {
  return async (req: NextRequest, ctx: RouteHandlerCtx) => {
    try {
      return handler(req, ctx);
    } catch (err) {
      const errRes: ApiError = apiErrorByUnknown(err);
      return NextResponse.json(
        { ...errRes },
        { status: errRes.error.statusCode }
      );
    }
  };
}

/**
 * Old way of API Routes. Not used in API Handlers
 * */
// export default function errorHandler(handler: any) {
//   return async (
//     req: NextApiRequest,
//     res: NextApiSuccess<ApiSuccess<unknown>>
//   ) => {
//     try {
//       await handler(req, res);
//     } catch (err) {
//       const errRes = apiErrorByUnknown(err);
//       return res.status(errRes.error.statusCode).json({ ...errRes });
//     }
//   };
// }
