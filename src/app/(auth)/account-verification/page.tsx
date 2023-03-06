import { ServerComponentProps } from "@/types/server-component-props";
import VerificationStatus from "./VerificationStatus";

export const metadata = {
  title: "Account Verification",
};

export default async function Register({ searchParams }: ServerComponentProps) {
  console.log(searchParams);
  return (
    <main className="h-full flex justify-center items-center">
      <VerificationStatus searchParams={searchParams} />
    </main>
  );
}
