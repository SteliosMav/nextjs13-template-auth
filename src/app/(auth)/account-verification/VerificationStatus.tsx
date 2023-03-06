"use client";

import { AccountVerificationCredentials } from "@/app/api/authentication/verify-account/invalid-account-verification-credentials";
import axios from "axios";
import invalidAccountVerificationCredentials from "@/app/api/authentication/verify-account/invalid-account-verification-credentials";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { ServerComponentCtx } from "@/types/server-component";
import Image from "next/image";
import { ApiError } from "@/utils/api-error";

export default function VerificationStatus({
  searchParams,
}: ServerComponentCtx["searchParams"]) {
  console.log(searchParams);
  const errorMessage = invalidAccountVerificationCredentials(searchParams);
  const [response, setResponse] = useState(
    errorMessage
      ? { status: "error", message: "Wrong account-verification credentials" }
      : { status: "loading", message: "Verifying account ..." }
  );

  useEffect(() => {
    if (!errorMessage) {
      const { email, token } = searchParams as AccountVerificationCredentials;
      axios
        .post("/api/authentication/verify-account", { email, token })
        .then((res) =>
          setResponse({
            status: "success",
            message: "Account verified successfully!",
          })
        )
        .catch((axiosError) => {
          const res: ApiError = axiosError.response.data;
          setResponse({ status: "error", message: res.error.message });
        });
    }
  }, []);

  return (
    <article>
      {response.status !== "loading" && (
        <div className="flex justify-center  mb-4">
          <Image
            src={
              response.status === "success"
                ? "green_circle_checkmark.svg"
                : "red_circle_ex.svg"
            }
            alt="Done"
            width={64}
            height={64}
          ></Image>
        </div>
      )}
      <h1 className="text-2xl font-bold">{response.message}</h1>
      <p className="flex justify-center mt-16">
        {response.status !== "loading" && (
          <Button href="/login" color="primary" className="w-fit">
            Back to Login
          </Button>
        )}
      </p>
    </article>
  );
}
