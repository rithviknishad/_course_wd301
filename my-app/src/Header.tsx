import { ActiveLink } from "raviger";
import React from "react";
import logo from "./logo.svg";
import { getCurrentUser } from "./utils/storageUtils";

export default function Header() {
  const currentUser = getCurrentUser();

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
          ...((currentUser?.username?.length ?? 0) > 0
            ? [
                {
                  page: "Logout",
                  onClick: () => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  },
                },
              ]
            : [{ page: "Login", url: "/login" }]),
          { page: "About", url: "/about" },
          { page: "Forms", url: "/forms" },
        ].map((link) =>
          link.url ? (
            <ActiveLink
              key={link.page}
              href={link.url}
              className="text-gray-800 p-2 m-2 uppercase"
              exactActiveClass="text-blue-800"
            >
              {link.page}
            </ActiveLink>
          ) : (
            <button
              key={link.page}
              onClick={link.onClick}
              className="text-gray-800 p-2 m-2 uppercase"
            >
              {link.page}
            </button>
          )
        )}
      </div>
    </div>
  );
}
