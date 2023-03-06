import { ServerComponentProps } from "@/types/server-component-props";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { PageHandler } from "./types";

export function withAuth(handler: PageHandler) {
  return async (ctx: ServerComponentProps) => {
    const session = await getServerSession();
    if (session) {
      return handler(ctx);
    } else {
      redirect("/");
    }
  };
}
