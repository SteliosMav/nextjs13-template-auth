import Link from "next/link";
import Avatar from "./Avatar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Header() {
  const session = await getServerSession(authOptions);
  const user = session?.user || null;

  return (
    <header>
      <nav className="bg-white p-8 flex items-center justify-between">
        <ul className="flex justify-center items-center gap-12 ">
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/components">Components</Link>
          </li>
          <li>
            <Link href="/admin">Admin</Link>
          </li>
        </ul>
        <Avatar user={user} />
      </nav>
    </header>
  );
}
