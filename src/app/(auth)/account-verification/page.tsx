import { ServerComponentCtx } from "@/types/server-component";
import VerificationStatus from "./VerificationStatus";

export const metadata = {
  title: "Account Verification",
};

export default async function Register({ searchParams }: ServerComponentCtx) {
  console.log(searchParams);
  return (
    <main className="h-full flex justify-center items-center">
      <VerificationStatus searchParams={searchParams} />
    </main>
  );
}
