import Header from "./header";
import { getServerSession, User } from "next-auth";
import nextAuthConfig from "@/lib/next-auth/config";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(nextAuthConfig);
  const user = session?.user || null;

  return (
    <>
      <Header user={user} />
      {children}
    </>
  );
}
