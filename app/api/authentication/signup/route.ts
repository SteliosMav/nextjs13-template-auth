import prisma from "../../../../lib/prisma";
import sendMail from "@/lib/nodemailer";
import { addHours } from "date-fns";
import generateVerificationCode from "@/lib/utils/generate-verification-code";
import withErrorHandling, {
  RouteHandlerCtx,
} from "@/lib/utils/api/with-error-handling";
import { NextRequest, NextResponse } from "next/server";
import { isPlainObject } from "lodash";
import validEmail from "@/lib/utils/validators/valid-email";
import validUserName from "@/lib/utils/validators/valid-user-name";
import validPassword from "@/lib/utils/validators/valid-password";
import { ApiSuccess } from "@/lib/utils/api/api-success";
import { ApiError } from "@/lib/utils/api/api-error";
import { HttpStatusCode } from "axios";
import { Prisma, User } from "@prisma/client";

export interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

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
    const hashedPassword = password; // await hash(password, 10);
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
    const query = `email=${email}&verification_code=${verificationCode}`;
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

function invalidSignUpCredentials(payload: unknown): false | string {
  if (!isPlainObject(payload)) return "Bad request";
  const objPayload = payload as object;
  if (!("name" in objPayload)) return "Property 'name' is missing";
  if (!("email" in objPayload)) return "Property 'email' is missing";
  if (!("password" in objPayload)) return "Property 'password' is missing";
  const userKeys = objPayload as {
    name: unknown;
    email: unknown;
    password: unknown;
  };
  if (typeof userKeys.name !== "string")
    return "Property 'name' must be type of string";
  if (typeof userKeys.email !== "string")
    return "Property 'email' must be type of string";
  if (typeof userKeys.password !== "string")
    return "Property 'password' must be type of string";
  const user = objPayload as SignUpCredentials;
  if (!validUserName(user.name)) return "Name must be a valid name";
  if (!validEmail(user.email)) return "Email must be a valid email";
  if (!validPassword(user.password)) return "Password must be a valid password";
  return false;
}
