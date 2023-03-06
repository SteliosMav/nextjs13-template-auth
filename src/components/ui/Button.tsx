import Link from "next/link";
import React from "react";

interface Props {
  children?: React.ReactNode;
  className?: string;
  color?: Color;
  outline?: boolean;
  href?: string;
  type?: ButtonType;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
type Color = "primary" | "secondary" | "warn";
type ButtonType = "button" | "submit" | "reset";

export default function Button({
  href,
  color,
  outline,
  className,
  disabled,
  onClick,
  ...rest
}: Props) {
  const appearance = getAppearance({ color, outline, disabled });
  const buttonClass = `${appearance} ${className || ""}`;
  return href ? (
    <Link href={href} className={buttonClass} {...rest}></Link>
  ) : (
    <button
      onClick={onClick}
      className={buttonClass}
      disabled={disabled}
      {...rest}
    ></button>
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
  disabled,
}: {
  color?: Color;
  outline?: boolean;
  disabled?: boolean;
}): string => {
  const basicClass = `text-base rounded px-4 py-2 flex justify-center items-center ${
    disabled ? "opacity-50" : "hover:opacity-80 active:opacity-100"
  }`;
  if (outline) {
    if (color) {
      // Outline with color
      return `${basicClass}  bg-transparent border ${getBorderColor(
        color
      )} ${getTextColor(color)}`;
    } else {
      // Outline without color
      return `${basicClass}  bg-transparent border border-[var(--gray-mid)] text-[var(black)]`;
    }
  } else {
    if (color) {
      // Color without outline
      return `${basicClass} shadow ${getBgColor(color)} text-white`;
    } else {
      // Default (Neither color nor outline)
      return `${basicClass} shadow bg-white text-[var(black)]`;
    }
  }
};

const getBgColor = (color: Color) => {
  switch (color) {
    case "primary":
      return "bg-[var(--primary)]";
    case "secondary":
      return "bg-[var(--secondary)]";
    default:
      return "bg-[var(--warn)]";
  }
};

const getTextColor = (color?: Color) => {
  switch (color) {
    case "primary":
      return "text-[var(--primary)]";
    case "secondary":
      return "text-[var(--secondary)]";
    default:
      return "text-[var(--warn)]";
  }
};

const getBorderColor = (color?: Color) => {
  switch (color) {
    case "primary":
      return "border-[var(--primary)]";
    case "secondary":
      return "border-[var(--secondary)]";
    default:
      return "border-[var(--warn)]";
  }
};
