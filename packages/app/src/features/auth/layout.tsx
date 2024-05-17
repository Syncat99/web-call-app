import Logo from "../../components/logo";
import { PropsWithChildren } from "react";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

import "./layout.css"
export default function AuthLayout({
  children,
  className,
}: PropsWithChildren<{
  className?: string;
}>) {
  return (
    <div className={`auth-layout ${className}`}>
      <div className="layoutLogo">
        <Logo />
        {className === "signup" ? <Link to="/login"><ChevronLeft color="white" size={32} strokeWidth={2.5} /></Link> : null}
      </div>
      {children}
    </div>
  );
}
