import { PropsWithChildren } from "react";
import Navbar from "./navbar/navbar";
import Footer from "./footer/footer";
import { Outlet } from "react-router-dom";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
