import React from "react";
import logo from "./logo.svg";

export default function Header(props: { title: string }) {
  return (
    <div className="p-4 mx-auto flex flex-row">
      <img
        src={logo}
        alt="logo"
        className="animate-spin w-20"
        style={{ animation: "spin 2s linear infinite" }}
      />
      <h1 className="text-center text-xl">{props.title}</h1>
    </div>
  );
}
