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
    if (
      !user ||
      user.emailVerificationCode !== verificationCode ||
      user.emailVerified
    ) {
      return res.status(400).json({ message: "Bad request" });
    } else {
      prisma.user.update({
        data: {
          emailVerified: new Date().toJSON(),
        },
        where: {
          id: user.id,
        },
      });
      return res.status(200).json(user);
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
