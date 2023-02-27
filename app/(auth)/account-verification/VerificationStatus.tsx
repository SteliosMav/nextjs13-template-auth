"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

interface Props {
  email: string;
  verificationCode: string;
}

export default function VerificationStatus({ email, verificationCode }: Props) {
  const router = useRouter();
  axios
    .post("/api/auth/verify-account", { email, verificationCode })
    .finally(() => router.push("/login"));
  return <h1 className="text-xl font-bold">Verifying account ...</h1>;
}
