import prisma from ".";

export type Response<T> =
  | {
      data: T;
    }
  | {
      error: string;
      message: string;
    };

export interface User {
  id: number;
  email: string;
  name: string;
}

export async function getUsers(): Promise<Response<User[]>> {
  try {
    const users = await prisma.user.findMany();
    return { data: users };
  } catch (error) {
    return { error: "error.message", message: "Message" };
  }
}

export async function createUser(user: User): Promise<Response<User>> {
  try {
    const userFromDB = await prisma.user.create({ data: user });
    return { data: userFromDB };
  } catch (error) {
    return { error: "error.message", message: "Message" };
  }
}

export async function getUserById(id: number): Promise<Response<User | null>> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      // include: { posts: true },
    });
    return { data: user };
  } catch (error) {
    return { error: "error.message", message: "Message" };
  }
}
