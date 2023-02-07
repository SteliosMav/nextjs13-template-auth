import Link from "next/link";
import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  color?: Color;
  outline?: boolean;
  href?: string;
}
type Color = "primary" | "secondary" | "warn";

export default function Button({
  href,
  color,
  outline,
  className,
  ...rest
}: Props) {
  const appearance = getAppearance({ color, outline });
  const basicClass =
    "text-base shadow rounded px-4 py-2 hover:opacity-80 active:opacity-100";
  const buttonClass = `${basicClass} ${appearance} ${className || ""}`;
  return href ? (
    <Link href={href} className={buttonClass} {...rest}>
      Login
    </Link>
  ) : (
    <button className={buttonClass} {...rest}></button>
  );
}

const getAppearance = ({
  color,
  outline,
}: {
  color?: Color;
  outline?: boolean;
}): string => {
  if (outline) {
    if (color) {
      // Outline with color
      return `bg-white border border-${color} text-${color}`;
    } else {
      // Default outline
      return `bg-white border border-black text-black`;
    }
  } else {
    if (color) {
      // Color without outline
      return `bg-${color} text-white`;
    } else {
      // Default button
      return `bg-white text-black`;
    }
  }
};
