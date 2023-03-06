"use client";

import React from "react";
import SessionProvider from "./session-provider";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <Toaster />
      {children}
    </SessionProvider>
  );
};

export default Providers;
