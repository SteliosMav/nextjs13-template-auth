"use client";

import { BaseUser } from "@/types/base-user";
import Link from "next/link";
import Avatar from "./Avatar";

interface Props {
  user: BaseUser | null;
}

export default function Header({ user }: Props) {
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
