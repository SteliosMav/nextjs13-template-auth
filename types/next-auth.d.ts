import NextAuth, { DefaultSession } from "next-auth";
import { BaseUser } from "./auth/base-user";

declare module "next-auth" {
  interface Session {
    user: BaseUser;
  }
  interface User {}
}
