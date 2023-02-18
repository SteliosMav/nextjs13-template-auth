import prisma from "@/lib/prisma";
import { getUsers } from "@/lib/prisma/users";

export const metadata = {
  title: "About",
};

export default async function About() {
  const res = await getUsers();
  const users = "data" in res ? res.data : [];
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
