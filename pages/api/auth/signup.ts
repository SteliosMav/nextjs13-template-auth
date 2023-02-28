import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import sendMail from "@/lib/nodemailer";
import { User } from "@prisma/client";
import { addHours } from "date-fns";
import { ApiResponse } from "@/types/api/response";
import errorHandler from "@/lib/utils/error-handler";
import generateVerificationCode from "@/lib/utils/generate-verification-code";

export default errorHandler(signup);

async function signup(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<User>>
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ error: { statusCode: 405, message: "Method not allowed" } });
  }

  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({
      error: {
        statusCode: 400,
        message: "Email and password are required",
      },
    });
  }

  const hashedPassword = password; // await hash(password, 10);

  let user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    if (user.emailVerified) {
      return res.status(400).json({
        error: {
          statusCode: 400,
          message: "Email already exists",
        },
      });
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: {
          name,
          email,
          password: hashedPassword,
          role: "USER",
        },
      });
    }
  } else {
    user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });
  }

  const verificationCode = generateVerificationCode(); // Generate random number
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      expires: addHours(new Date(), 1),
      token: verificationCode,
    },
  });

  const query = `email=${email}&verification_code=${verificationCode}`;
  const verificationLink = `${process.env.CLIENT_ORIGIN}/account-verification?${query}`;
  await sendMail({
    to: [email], // list of receivers
    subject: "Account Verification", // Subject line
    text: `To verify your account, go to this page: ${verificationLink}`,
    html: `<p>To verify your account, click <a href="${verificationLink}">here</a></p>`,
  });
  return res.status(201).json({ data: { ...(user as User) } });
}
