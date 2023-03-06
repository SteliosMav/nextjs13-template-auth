import { ServerComponentCtx } from "@/types/server-component";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ServerComponent } from "../../types/server-component";

export function withAuth(handler: ServerComponent) {
  return async (ctx: ServerComponentCtx) => {
    const session = await getServerSession();
    if (session) {
      return handler(ctx);
    } else {
      redirect("/");
    }
  };
}
