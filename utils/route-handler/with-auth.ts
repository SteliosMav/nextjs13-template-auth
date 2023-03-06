import { RouteHandler, RouteHandlerCtx } from "@/types/route-handler";
import { HttpStatusCode } from "axios";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "../api-error";

export function withAuth(handler: RouteHandler) {
  return async (req: NextRequest, ctx: RouteHandlerCtx) => {
    const session = await getServerSession();
    if (session) {
      return handler(req, ctx);
    } else {
      return NextResponse.json(
        new ApiError(HttpStatusCode.Unauthorized, "Unauthorized"),
        { status: HttpStatusCode.Unauthorized }
      );
    }
  };
}
