"use client";

import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput";
import { APISuccessResponse } from "@/types/api/response";
import { User } from "@prisma/client";
import { signIn } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function SignUpForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [formIsValid, setFormIsValid] = useState(false);

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
      const createUser = await axios.post<APISuccessResponse<User>>(
        "/api/auth/signup",
        { ...newUser }
      );
      const { email, password } = createUser.data.data;
      signIn("credentials", {
        email,
        password,
        callbackUrl: "/home",
      });
    } catch (error) {
      let message =
        "Something went wrong during user creation. A data-field may already exist with that value. Please try again.";
      if (axios.isAxiosError(error)) {
        if (error.response?.data.message)
          message = error.response?.data.message;
      }
      toast.error(message);
    }
  };

  return (
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
        onChange={({ target }) => setForm({ ...form, password: target.value })}
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
  );
}
