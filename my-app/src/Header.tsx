import { ActiveLink } from "raviger";
import React from "react";
import logo from "./logo.svg";

export default function Header() {
  return (
    <div className="p-4 mx-auto flex flex-row">
      <img
        src={logo}
        alt="logo"
        className="animate-spin w-20"
        style={{ animation: "spin 2s linear infinite" }}
      />
      <div className="flex gap-2 items-center">
        {[
          { page: "Home", url: "/" },
          { page: "About", url: "/about" },
          { page: "Forms", url: "/forms" },
        ].map((link) => (
          <ActiveLink
            key={link.url}
            href={link.url}
            className="text-gray-800 p-2 m-2 uppercase"
            exactActiveClass="text-blue-800"
          >
            {link.page}
          </ActiveLink>
        ))}
      </div>
    </div>
  );
}
