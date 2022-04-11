import { Link } from "raviger";
import React from "react";
import logo from "../logo.svg";

export default function Home() {
  return (
    <div className="flex flex-col justify-center">
      <img className="h-48" src={logo} alt="" />
      <div className="flex-1 flex justify-center items-center h-48">
        <p>Welcome to home page...</p>
      </div>
      <Link
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
        href="/forms"
      >
        Show Form
      </Link>
    </div>
  );
}
