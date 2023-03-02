import { createUser, getUsers } from "@/lib/prisma/users";
import withErrorHandling, {
  RouteHandlerCtx,
} from "@/lib/utils/api/with-error-handling";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandling(
  async (req: NextRequest, ctx: RouteHandlerCtx) => {
    const dbResponse = await getUsers();
    return NextResponse.json({ ...dbResponse }, { status: 200 });
  }
);

export const POST = withErrorHandling(
  async (req: NextRequest, ctx: RouteHandlerCtx) => {
    const body = await req.json();
    const dbResponse = await createUser(body);
    return NextResponse.json({ ...dbResponse }, { status: 200 });
  }
);
