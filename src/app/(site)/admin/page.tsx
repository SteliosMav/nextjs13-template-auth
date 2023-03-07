import { getUsers } from "@/lib/prisma/users";
import { ApiSuccess } from "@/utils/api-success";
import { withAuth } from "@/utils/server-component-wrappers/with-auth";
import { User } from "@prisma/client";

export const metadata = {
  title: "Admin",
};

async function Admin() {
  const res = await getUsers();
  const users = (res as ApiSuccess<User[]>).data;

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

export default withAuth(Admin);
