"use client";

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { User } from "@prisma/client";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { ApiSuccess } from "@/lib/utils/api/types/api-response";

export default function SignUpForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    setFormIsValid(!!form.email && !!form.password && !!form.name);
  }, [form]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser: User = {
      id: new Date().toJSON(),
      emailVerified: null,
      image: null,
      role: "USER",
      ...form,
    };
    try {
      const { data } = await axios.post<ApiSuccess<User>>(
        "/api/authentication/signup",
        {
          ...newUser,
        }
      );
      if ("error" in data) throw data.error.message;
      setEmailSent(true);
    } catch (error) {
      let message =
        typeof error === "string"
          ? error
          : "Something went wrong during user creation. A data-field may already exist with that value. Please try again.";
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message)
          message = error.response?.data.message;
      }
      toast.error(message);
    }
  };

  if (emailSent) {
    return (
      <article className="flex flex-col w-full max-w-lg gap-4">
        <div className="flex justify-center">
          <Image
            src="circle_green_checkmark.svg"
            alt="Done"
            width={64}
            height={64}
          ></Image>
        </div>
        <h1 className="text-4xl mb-4 font-semibold flex justify-center">
          Email has been sent
        </h1>
        <p>
          An email has been sent to your account. Click on the link we went you
          to activate it.
        </p>
      </article>
    );
  } else
    return (
      <div className="flex flex-col w-full max-w-lg gap-4">
        <h1 className="text-4xl mb-4 font-semibold flex justify-center">
          Create your account
        </h1>
        <form
          onSubmit={onSubmit}
          method="post"
          className="flex flex-col gap-6 items-center"
        >
          <TextInput
            type="name"
            id="name"
            name="name"
            placeholder="Name"
            required
            onChange={({ target }) => setForm({ ...form, name: target.value })}
          />
          <TextInput
            type="email"
            id="email"
            name="email"
            placeholder="Email address"
            required
            onChange={({ target }) => setForm({ ...form, email: target.value })}
          />
          <TextInput
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            onChange={({ target }) =>
              setForm({ ...form, password: target.value })
            }
          />
          <Button
            type="submit"
            color="primary"
            disabled={!formIsValid}
            className="w-full px-4 py-4 text-xl font-bold"
          >
            Continue
          </Button>
        </form>
        <p className="flex justify-center">
          Already have an account? &nbsp;
          <Link href="/login" className="text-[var(--primary)]">
            Log in
          </Link>
        </p>
      </div>
    );
}
