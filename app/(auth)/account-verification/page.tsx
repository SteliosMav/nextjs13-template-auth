import { ServerComponentProps } from "@/types/server-component-props";
import { validEmail } from "@/lib/utils/valid-email";
import { redirect } from "next/navigation";
import VerificationStatus from "./VerificationStatus";

export const metadata = {
  title: "Account Verification",
};

export default async function Register({ searchParams }: ServerComponentProps) {
  if (emailAndPassExist(searchParams)) {
    const { email, verification_code } = searchParams;
    return (
      <main className="h-full bg-red-100 flex justify-center items-center">
        <VerificationStatus
          email={email}
          verificationCode={verification_code}
        />
      </main>
    );
  } else redirect("/login");
}

const emailAndPassExist = (queryParams: unknown): boolean => {
  if (
    typeof queryParams === "object" &&
    queryParams !== null &&
    "email" in queryParams &&
    "verification_code" in queryParams &&
    validEmail(queryParams.email) &&
    validVerificationCode(queryParams["verification_code"])
  ) {
    return true;
  } else return false;
};

const validVerificationCode = (code: unknown): boolean => {
  // Should be string and 6 chars long
  if (typeof code === "string" && code.length === 6) {
    return true;
  } else return false;
};
