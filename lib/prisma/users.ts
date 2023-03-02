import { User, Prisma } from "@prisma/client";
import prisma from ".";
import { ApiResponse } from "../utils/api/types/api-response";

export async function getUsers(): Promise<ApiResponse<User[]>> {
  const users = await prisma.user.findMany();
  return { data: users };
}

export async function createUser(
  user: Prisma.UserCreateArgs["data"]
): Promise<ApiResponse<User>> {
  const userFromDB = await prisma.user.create({ data: { ...user } });
  return { data: userFromDB };
}

export async function getUserById(
  id: string
): Promise<ApiResponse<User | null>> {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return { data: user };
}
