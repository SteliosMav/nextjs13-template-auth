import { User, Prisma } from "@prisma/client";
import prisma from ".";
import { ApiSuccess } from "../api/api-success";

export async function getUsers(): Promise<ApiSuccess<User[]>> {
  const users = await prisma.user.findMany();
  return new ApiSuccess(users);
}

export async function createUser(
  user: Prisma.UserCreateArgs["data"]
): Promise<ApiSuccess<User>> {
  const userFromDB = await prisma.user.create({ data: { ...user } });
  return new ApiSuccess(userFromDB);
}

export async function updateUser(
  id: string,
  user: Prisma.UserUpdateArgs["data"]
): Promise<ApiSuccess<User>> {
  const userFromDB = await prisma.user.update({
    where: { id },
    data: { ...user },
  });
  return new ApiSuccess(userFromDB);
}

export async function getUserById(
  id: string
): Promise<ApiSuccess<User | null>> {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  return new ApiSuccess(user);
}

export async function getUserByEmail(
  email: string
): Promise<ApiSuccess<User | null>> {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return new ApiSuccess(user);
}
