"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  email: string;
  verificationCode: string;
}

export default function VerificationStatus({ email, verificationCode }: Props) {
  const router = useRouter();
  // router.push("");
  axios
    .post("/verify-account", { email, verificationCode })
    .then((res) => {
      // signIn('credentials', {email, password})
    })
    .catch((err) => console.log(err));
  return <h1 className="text-xl font-bold">Verifying account ...</h1>;
}
