import { APIResponse } from "@/types/api/response";
import { User, Prisma } from "@prisma/client";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
} from "@prisma/client/runtime";
import prisma from ".";

export async function getUsers(): Promise<APIResponse<User[]>> {
  try {
    const users = await prisma.user.findMany();
    return { data: users };
  } catch (error) {
    return { error: { statusCode: "error.message", message: "Message" } };
  }
}

export async function createUser(
  user: Prisma.UserCreateArgs["data"]
): Promise<APIResponse<User>> {
  try {
    const userFromDB = await prisma.user.create({ data: { ...user } });
    return { data: userFromDB };
  } catch (error) {
    return {
      error: {
        statusCode: "duplicate-fields",
        message:
          "Possible duplicate data-fields. Something went wrong, please try again.",
      },
    };
  }
}

export async function getUserById(
  id: string
): Promise<APIResponse<User | null>> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return { data: user };
  } catch (error) {
    return { error: { statusCode: "s", message: "Message" } };
  }
}
