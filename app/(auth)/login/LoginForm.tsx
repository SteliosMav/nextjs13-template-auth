"use client";

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/home";
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const session = useSession();
  const router = useRouter();
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signIn("credentials", {
      ...credentials,
      redirect: false,
    })
      .then((res) => {
        if (res?.ok) {
          router.push(callbackUrl);
        } else setErrorMessage("Wrong email or password");
      })
      .catch((err) => setErrorMessage("Wrong email or password"));
  };
  return (
    <form
      onSubmit={onSubmit}
      method="post"
      className="flex flex-col gap-6 items-center"
    >
      <TextInput
        type="email"
        id="email"
        name="email"
        placeholder="Email address"
        required
        onChange={({ target }) =>
          setCredentials({ ...credentials, email: target.value })
        }
      />
      <fieldset className="w-full">
        <TextInput
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          required
          onChange={({ target }) =>
            setCredentials({ ...credentials, password: target.value })
          }
        />
        <p className="flex items-center gap-2 text-sm text-[var(--warn)]">
          <i className="fa-solid fa-circle-exclamation"></i>
          {errorMessage && errorMessage}
        </p>
      </fieldset>
      <Button
        type="submit"
        color="primary"
        disabled={session.status === "loading"}
        className="w-full text-xl font-bold min-h-[3rem]"
      >
        Log In
      </Button>
    </form>
  );
}
