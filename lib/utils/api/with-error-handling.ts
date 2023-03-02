import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./api-error";
import apiErrorByUnknown from "./api-error-by-unknown";

export type RouteHandler = (
  req: NextRequest,
  ctx: RouteHandlerCtx
) => NextResponse | Promise<NextResponse>;

export interface RouteHandlerCtx {
  params: string;
}

export default function withErrorHandling(handler: RouteHandler) {
  return async (req: NextRequest, ctx: RouteHandlerCtx) => {
    try {
      await handler(req, ctx);
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
//     res: NextApiResponse<ApiResponse<unknown>>
//   ) => {
//     try {
//       await handler(req, res);
//     } catch (err) {
//       const errRes = apiErrorByUnknown(err);
//       return res.status(errRes.error.statusCode).json({ ...errRes });
//     }
//   };
// }
