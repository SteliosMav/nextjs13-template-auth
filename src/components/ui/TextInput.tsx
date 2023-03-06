import React, { InputHTMLAttributes } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  error?: null | string;
}

export default function TextInput({ className, error, ...rest }: Props) {
  const calcErrorClasses = (error: null | undefined | string) =>
    error
      ? "shadow-[0_0_0_1px_var(--warn)] focus:shadow-[0_0_0_2px_var(--warn)]"
      : "shadow-[0_0_0_1px_var(--gray-mid)] focus:shadow-[0_0_0_2px_var(--primary)]";
  return (
    <fieldset className="w-full">
      <input
        className={`p-4 w-full rounded outline-none ${calcErrorClasses(
          error
        )} ${className || ""}`}
        {...rest}
      ></input>
      {error && (
        <p className="mt-1 flex items-center gap-2 text-sm text-[var(--warn)]">
          <FontAwesomeIcon icon={faCircleExclamation} />
          {error}
        </p>
      )}
    </fieldset>
  );
}
