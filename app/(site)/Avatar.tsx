"use client";

import Button from "@/components/ui/Button";
import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";

export default function TestBtn() {
  const { data, status } = useSession();
  if (status === "authenticated") {
    return (
      <span className="flex items-center gap-4">
        <strong>{data.user?.email}</strong>
        <Button onClick={() => signOut({ redirect: false })} color="primary">
          Logout
        </Button>
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
