import React, { InputHTMLAttributes } from "react";

export default function TextInput({
  className,
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`p-4 w-full rounded  outline-primary outline-4 ${
        className || ""
      }`}
      {...rest}
    ></input>
  );
}
