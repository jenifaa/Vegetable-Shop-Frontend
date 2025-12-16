import {  type ReactNode } from "react";

import Footer from "./Footer";
import Navbar from "./Navbar";



function CommonLayout({ children }: { children: ReactNode }) {



  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar></Navbar>
      <div className="grow">{children}</div>
      <Footer></Footer>
    </div>
  );
}

export default CommonLayout;
