import "./button.css";
import { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "gray" | "purple";

export const getButtonClassName = (
  variant: ButtonVariant,
  className?: string,
) => `btn btn-${variant} ${className}`;

export default function Button({
  variant = "gray",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
}) {
  return (
    <button className={getButtonClassName(variant, className)} {...props}>
      {children}
    </button>
  );
}
