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

/**
 * In TailwindCSS this doesn't work:
 *    `bg-${color}`
 *
 * But this does:
 *    `${bgColor} ${textColor}`
 */

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
      return `bg-white border ${getBorderColor(color)} ${getTextColor(color)}`;
    } else {
      // Outline without color
      return `bg-white border border-black text-black`;
    }
  } else {
    if (color) {
      // Color without outline
      return `${getBgColor(color)} text-white`;
    } else {
      // Default (Neither color nor outline)
      return `bg-white text-black`;
    }
  }
};

const getBgColor = (color: Color) => {
  switch (color) {
    case "primary":
      return "bg-primary";
    case "secondary":
      return "bg-secondary";
    default:
      return "bg-warn";
  }
};

const getTextColor = (color?: Color) => {
  switch (color) {
    case "primary":
      return "text-primary";
    case "secondary":
      return "text-secondary";
    default:
      return "text-warn";
  }
};

const getBorderColor = (color?: Color) => {
  switch (color) {
    case "primary":
      return "border-primary";
    case "secondary":
      return "border-secondary";
    default:
      return "border-warn";
  }
};
