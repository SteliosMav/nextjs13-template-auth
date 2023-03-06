import { ServerComponentCtx } from "@/types/server-component";
import VerificationStatus from "./VerificationStatus";

export const metadata = {
  title: "Account Verification",
};

export default async function AccountVerification({
  searchParams,
}: ServerComponentCtx) {
  return (
    <main className="h-full flex justify-center items-center">
      <VerificationStatus searchParams={searchParams} />
    </main>
  );
}
