import { getUsers } from "@/lib/prisma/users";
import { ApiSuccess } from "@/lib/utils/api/api-success";
import { User } from "@prisma/client";

export const metadata = {
  title: "About",
};

export default async function About() {
  let users: User[] = [];

  try {
    const res = await getUsers();
    users = (res as ApiSuccess<User[]>).data;
  } catch (error) {}

  return (
    <main className="h-full bg-red-200 ">
      <h1 className="text-2xl font-bold">Admin Page</h1>
      {users.map((user) => (
        <article>
          <h2 className="text-lg font-bold">{user.name}</h2>
          <p>{user.email}</p>
        </article>
      ))}
    </main>
  );
}
