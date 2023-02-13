import React, { InputHTMLAttributes } from "react";

export default function TextInput({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`p-4 w-full rounded outline-none shadow-[0_0_0_1px_var(--gray-mid)] focus:shadow-[0_0_0_2px_var(--primary)] ${
        className || ""
      }`}
      {...rest}
    ></input>
  );
}
