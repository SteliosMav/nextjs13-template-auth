import { ApiSuccess } from "@/utils/api-success";
import { VerificationToken, Prisma } from "@prisma/client";
import prisma from ".";

interface IdentifierToken {
  identifier: string; // email
  token: string;
}

export async function getVerificationTokens(): Promise<
  ApiSuccess<VerificationToken[]>
> {
  const verificationTokens = await prisma.verificationToken.findMany();
  return new ApiSuccess(verificationTokens);
}

export async function createVerificationToken(
  verificationToken: Prisma.VerificationTokenCreateArgs["data"]
): Promise<ApiSuccess<VerificationToken>> {
  const verificationTokenFromDB = await prisma.verificationToken.create({
    data: { ...verificationToken },
  });
  return new ApiSuccess(verificationTokenFromDB);
}

export async function updateVerificationToken(
  identifierToken: IdentifierToken,
  verificationToken: Prisma.VerificationTokenCreateArgs["data"]
): Promise<ApiSuccess<VerificationToken>> {
  const verificationTokenFromDB = await prisma.verificationToken.update({
    where: { identifier_token: identifierToken },
    data: { ...verificationToken },
  });
  return new ApiSuccess(verificationTokenFromDB);
}

export async function getVerificationTokenByIdentifierToken(
  identifierToken: IdentifierToken
): Promise<ApiSuccess<VerificationToken | null>> {
  const verificationToken = await prisma.verificationToken.findUnique({
    where: { identifier_token: identifierToken },
  });
  return new ApiSuccess(verificationToken);
}
