import { createUser, getUsers } from "@/lib/prisma/users";
import withErrorHandling from "@/lib/api/middleware/with-error-handling";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { RouteHandlerCtx } from "@/lib/api/middleware/types";
import { withAuth } from "@/lib/api/middleware/with-auth";

export const GET = withErrorHandling(
  withAuth(async (req: NextRequest, ctx: RouteHandlerCtx) => {
    const dbUsersResponse = await getUsers();
    return NextResponse.json(dbUsersResponse, { status: 200 });
  })
);

export const POST = withErrorHandling(
  withAuth(async (req: NextRequest, ctx: RouteHandlerCtx) => {
    const body: unknown = await req.json();
    const addedUserResponse = await createUser(body as User);
    return NextResponse.json(addedUserResponse, { status: 200 });
  })
);
