import { createUser, getUsers } from "@/lib/prisma/users";
import { RouteHandlerCtx } from "@/types/route-handler";
import { withAuth } from "@/utils/route-handler/with-auth";
import withErrorHandling from "@/utils/route-handler/with-error-handling";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

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
