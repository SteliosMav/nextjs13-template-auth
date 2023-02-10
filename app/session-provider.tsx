"use client";

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const SessionProvider = ({ children }: Props) => {
  return <NextAuthSessionProvider>{children}</NextAuthSessionProvider>;
};

export default SessionProvider;
