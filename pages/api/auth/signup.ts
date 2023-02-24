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

  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const hashedPassword = password; // await hash(password, 10);

  try {
    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      emailVerificationCode: "000000",
      role: "USER",
    });
    const verificationCode: string = "000000"; // Generate random number
    const query = `email=${email}&verification_code=${verificationCode}`;
    const verificationLink = `${process.env.CLIENT_ORIGIN}/account-verification?${query}`;

    sendMail({
      to: ["stelios@mailinator.com"], // list of receivers
      subject: "Account Verification", // Subject line
      text: `To verify your account, go to this page: ${verificationLink}`,
      html: `<p>To verify your account, click <a href="${verificationLink}">here</a></p>`,
    })
      .then((res) => console.log(res))
      .catch(console.error);

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res.status(409).json({ message: "Email already exists" });
      }
    }

    return res.status(500).json({ message: "Internal server error" });
  }
}
