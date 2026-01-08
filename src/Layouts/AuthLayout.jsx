import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

export default function AuthLayout() {
  return (
    <>
      <Navbar/>
     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Outlet/>
     </div>
    </>
  );
}
