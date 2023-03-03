import { ApiError } from "@/lib/api/api-error";
import { ApiSuccess } from "@/lib/api/api-success";
import withErrorHandling, {
  RouteHandlerCtx,
} from "@/lib/api/middleware/with-error-handling";
import { updateUser } from "@/lib/prisma/users";
import { HttpStatusCode } from "axios";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import invalidAccountVerificationCredentials, {
  AccountVerificationCredentials,
} from "./invalid-account-verification-credentials";

export const POST = withErrorHandling(
  async (req: NextRequest, ctx: RouteHandlerCtx) => {
    // If payload is invalid return error
    const body: unknown = await req.json();
    const invalidPayloadMessage = invalidAccountVerificationCredentials(body);
    if (invalidPayloadMessage) {
      return NextResponse.json(
        new ApiError(HttpStatusCode.BadRequest, invalidPayloadMessage),
        { status: HttpStatusCode.BadRequest }
      );
    }

    // If user doesn't exist and token is valid, update user in db.
    const { email, token } = body as AccountVerificationCredentials;
    const [user, verificationToken] = await prisma.$transaction([
      prisma.user.findUnique({
        where: { email },
      }),
      prisma.verificationToken.findFirst({
        where: {
          identifier: email,
        },
      }),
    ]);
    if (
      !user ||
      !verificationToken ||
      verificationToken.token !== token ||
      user.emailVerified
    ) {
      return NextResponse.json(
        new ApiError(HttpStatusCode.BadRequest, "Bad request"),
        { status: HttpStatusCode.BadRequest }
      );
    } else {
      const verifiedUser = await updateUser(user.id, {
        emailVerified: new Date().toJSON(),
      });
      return NextResponse.json(new ApiSuccess(verifiedUser), {
        status: HttpStatusCode.Ok,
      });
    }
  }
);
