import Logo from "../../components/logo";
import { PropsWithChildren } from "react";

export default function AuthLayout({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <div className={`auth-layout ${className}`}>
      <Logo />
      {children}
    </div>
  );
}
