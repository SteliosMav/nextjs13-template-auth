import { createUser } from "@/lib/prisma/users";
import { NextApiRequest, NextApiResponse } from "next";
// import { hash } from "bcryptjs";
import prisma from "../../../lib/prisma";
import sendMail from "@/lib/nodemailer";
import { Prisma } from "@prisma/client";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("YOOSUUSUS");
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, verificationCode } = req.body;

  if (!email || !verificationCode) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        identifier: email,
      },
    });
    console.log("User: ", user);
    console.log("Verification token: ", verificationToken);
    console.log("Verification code: ", verificationCode);
    if (
      !user ||
      !verificationToken ||
      verificationToken.token !== verificationCode ||
      user.emailVerified
    ) {
      return res.status(400).json({ message: "Bad request" });
    } else {
      const verifiedUser = await prisma.user.update({
        data: {
          emailVerified: new Date().toJSON(),
        },
        where: {
          id: user.id,
        },
      });
      console.log("Verified User: ", verifiedUser);
      return res.status(200).json(verifiedUser);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
