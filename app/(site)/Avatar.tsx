"use client";

import Button from "@/components/ui/Button";
import React from "react";
import { signIn, useSession } from "next-auth/react";

export default function TestBtn() {
  const session = useSession();
  console.log("Session", session);
  return <Button onClick={() => signIn()}>Login</Button>;
}
