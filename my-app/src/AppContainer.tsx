import React, { useEffect } from "react";
import Header from "./Header";
import { me } from "./utils/apiUtils";

export default function AppContainer(props: { children: React.ReactNode }) {
  useEffect(() => {
    me();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 items-center">
      <div className="w-1/2 p-8 mx-auto bg-white shadow-lg rounded-xl">
        <Header />
        {props.children}
      </div>
    </div>
  );
}
