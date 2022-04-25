import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import { me } from "./utils/apiUtils";
import "react-toastify/dist/ReactToastify.css";

export default function AppContainer(props: { children: React.ReactNode }) {
  useEffect(() => {
    me();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 items-center">
      <ToastContainer />
      <div className="w-1/2 p-8 mx-auto bg-white shadow-lg rounded-xl">
        <Header />
        {props.children}
      </div>
    </div>
  );
}
