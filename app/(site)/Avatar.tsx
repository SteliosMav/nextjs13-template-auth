"use client";

import Button from "@/components/ui/Button";
import React, { useEffect, useRef, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { onClickOutsideOf } from "@/utils/on-click-outside-of";
import Link from "next/link";
import { BaseUser } from "@/types/auth/base-user";
import { toast } from "react-hot-toast";

interface Props {
  user: BaseUser | null;
}

export default function TestBtn({ user }: Props) {
  const [currentUser, setCurrentUser] = useState(user);
  const [isOpen, setIsOpen] = useState(false);
  const avatarRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    onClickOutsideOf(avatarRef, (e) => setIsOpen(false));
  }, []);

  const logout = () => {
    signOut({ redirect: false })
      .then(() => setCurrentUser(null))
      .catch(() =>
        toast.error("Could not logout. Something went wrong, please try again.")
      );
  };

  if (currentUser) {
    return (
      <span className="flex flex-col relative">
        <Image
          src={currentUser.image || "avatar.svg"}
          alt="Avatar"
          width={32}
          height={32}
          ref={avatarRef}
          className="rounded-full cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        ></Image>
        {isOpen && (
          <div className="absolute flex flex-col gap-2 right-0 top-10 bg-white whitespace-nowrap p-4 rounded text-sm shadow-[0px_0px_16px_-4px_rgba(0,0,0,0.75)]">
            <div>
              <strong>{currentUser.name}</strong>
              <div className="text-xs">{currentUser.email}</div>
            </div>
            <hr />
            <Link href="/account">Manage Account</Link>
            <hr />
            <div onClick={logout} className="cursor-pointer">
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
