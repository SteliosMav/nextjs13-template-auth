import Link from "next/link";
import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  color?: Color;
  outline?: boolean;
  href?: string;
  type?: ButtonType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
type Color = "primary" | "secondary" | "warn";
type ButtonType = "button" | "submit" | "reset";

export default function Button({
  href,
  color,
  outline,
  className,
  onClick,
  ...rest
}: Props) {
  const appearance = getAppearance({ color, outline });
  const buttonClass = `${appearance} ${className || ""}`;
  return href ? (
    <Link href={href} className={buttonClass} {...rest}></Link>
  ) : (
    <button onClick={onClick} className={buttonClass} {...rest}></button>
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
  const basicClass =
    "text-base rounded px-4 py-2 hover:opacity-80 active:opacity-100";
  if (outline) {
    if (color) {
      // Outline with color
      return `${basicClass}  bg-transparent border ${getBorderColor(
        color
      )} ${getTextColor(color)}`;
    } else {
      // Outline without color
      return `${basicClass}  bg-transparent border border-black text-black`;
    }
  } else {
    if (color) {
      // Color without outline
      return `${basicClass} shadow ${getBgColor(color)} text-white`;
    } else {
      // Default (Neither color nor outline)
      return `${basicClass} shadow bg-white text-black`;
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
