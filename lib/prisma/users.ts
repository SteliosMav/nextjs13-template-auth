import { ApiResponse } from "@/types/api/response";
import { User, Prisma } from "@prisma/client";
import { HttpStatusCode } from "axios";
import prisma from ".";

export async function getUsers(): Promise<ApiResponse<User[]>> {
  try {
    const users = await prisma.user.findMany();
    return { data: users };
  } catch (error) {
    return {
      error: { statusCode: HttpStatusCode.NotFound, message: "Message" },
    };
  }
}

export async function createUser(
  user: Prisma.UserCreateArgs["data"]
): Promise<ApiResponse<User>> {
  try {
    const userFromDB = await prisma.user.create({ data: { ...user } });
    return { data: userFromDB };
  } catch (error) {
    return {
      error: {
        statusCode: HttpStatusCode.Conflict,
        message:
          "Possible duplicate data-fields. Something went wrong, please try again.",
      },
    };
  }
}

export async function getUserById(
  id: string
): Promise<ApiResponse<User | null>> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return { data: user };
  } catch (error) {
    return {
      error: { statusCode: HttpStatusCode.NotFound, message: "Message" },
    };
  }
}
