import "./input.css";
import { Dispatch, InputHTMLAttributes, SetStateAction } from "react";

export default function Input({
  value= "",
  className,
  onChange,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`input ${className}`}
      value={value}
      onChange={(e) => {
        onChange?.(e);
      }}
      {...props}
    />
  );
}
