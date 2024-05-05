import "./input.css";
import { Dispatch, InputHTMLAttributes, SetStateAction } from "react";

export default function Input({
  value = "",
  setValue,
  className,
  onChange,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <input
      className={`input ${className}`}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange?.(e);
      }}
      {...props}
    />
  );
}
