"use client";

import Button from "@/components/ui/Button";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { onClickOutsideOf } from "@/utils/on-click-outside-of";
import Link from "next/link";

export default function TestBtn() {
  const { data, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const avatarRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    onClickOutsideOf(avatarRef, (e) => setIsOpen(false));
  }, []);

  if (status === "authenticated") {
    return (
      <span className="flex flex-col relative">
        <Image
          src={data.user?.image || ""}
          alt="User_Image"
          width={32}
          height={32}
          ref={avatarRef}
          className="rounded-full cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        ></Image>
        {isOpen && (
          <div className="absolute flex flex-col gap-2 right-0 top-10 bg-white p-4 rounded text-sm shadow-[0px_0px_16px_-4px_rgba(0,0,0,0.75)]">
            <div>
              <strong>{data.user?.name}</strong>
              <div className="text-xs">{data.user?.email}</div>
            </div>
            <hr />
            <Link href="/account">Manage Account</Link>
            <hr />
            <div
              onClick={() => signOut({ redirect: false })}
              className="cursor-pointer"
            >
              Logout
            </div>
          </div>
        )}
      </span>
    );
  } else {
    return (
      <Button onClick={() => signIn()} color="primary">
        Log In
      </Button>
    );
  }
}
