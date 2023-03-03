import { createUser, getUsers } from "@/lib/prisma/users";
import withErrorHandling, {
  RouteHandlerCtx,
} from "@/lib/api/with-error-handling";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = withErrorHandling(
  async (req: NextRequest, ctx: RouteHandlerCtx) => {
    const dbUsersResponse = await getUsers();
    return NextResponse.json(dbUsersResponse, { status: 200 });
  }
);

export const POST = withErrorHandling(
  async (req: NextRequest, ctx: RouteHandlerCtx) => {
    const body: unknown = await req.json();
    const addedUserResponse = await createUser(body as User);
    return NextResponse.json(addedUserResponse, { status: 200 });
  }
);
