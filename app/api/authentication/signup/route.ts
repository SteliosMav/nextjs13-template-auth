import prisma from "../../../../lib/prisma";
import sendMail from "@/lib/nodemailer";
import { addHours } from "date-fns";
import generateVerificationCode from "@/lib/utils/generate-verification-code";
import withErrorHandling, {
  RouteHandlerCtx,
} from "@/lib/api/with-error-handling";
import { NextRequest, NextResponse } from "next/server";
import { ApiSuccess } from "@/lib/api/api-success";
import { ApiError } from "@/lib/api/api-error";
import { HttpStatusCode } from "axios";
import { Prisma, User } from "@prisma/client";
import invalidSignUpCredentials, {
  SignUpCredentials,
} from "./invalid-signup-credentials";
import { hash, genSalt } from "bcrypt";

export const POST = withErrorHandling(
  async (req: NextRequest, ctx: RouteHandlerCtx) => {
    // If payload is invalid return error
    const body: unknown = await req.json();
    const invalidPayloadMessage = invalidSignUpCredentials(body);
    if (invalidPayloadMessage) {
      return NextResponse.json(
        new ApiError(HttpStatusCode.BadRequest, invalidPayloadMessage),
        { status: HttpStatusCode.BadRequest }
      );
    }

    // If user exist return error otherwise create user & verification-code
    const { email, password, name } = body as SignUpCredentials;

    const saltRounds = 10;
    const salt = await genSalt(saltRounds);
    const hashedPassword = await hash(password, salt);

    let user = await prisma.user.findFirst({ where: { email } });
    let userWriteOperation!: () => Prisma.PrismaPromise<User>;
    if (user) {
      if (user.emailVerified) {
        return NextResponse.json(
          new ApiError(HttpStatusCode.BadRequest, "Email already exists"),
          { status: HttpStatusCode.BadRequest }
        );
      } else {
        const userId = user.id;
        userWriteOperation = () =>
          prisma.user.update({
            where: { id: userId },
            data: {
              name,
              email,
              password: hashedPassword,
              role: "USER",
            },
          });
      }
    } else {
      userWriteOperation = () =>
        prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
            role: "USER",
          },
        });
    }
    const verificationCode = generateVerificationCode(); // Generate random number
    await prisma.$transaction([
      userWriteOperation(),
      prisma.verificationToken.create({
        data: {
          identifier: email,
          expires: addHours(new Date(), 1),
          token: verificationCode,
        },
      }),
    ]);

    // Send verification-code via email
    const query = `email=${email}&token=${verificationCode}`;
    const verificationLink = `${process.env.CLIENT_ORIGIN}/account-verification?${query}`;
    await sendMail({
      to: [email], // list of receivers
      subject: "Account Verification", // Subject line
      text: `To verify your account, go to this page: ${verificationLink}`,
      html: `<p>To verify your account, click <a href="${verificationLink}">here</a></p>`,
    });
    return NextResponse.json(new ApiSuccess({ ...user }), { status: 201 });
  }
);
