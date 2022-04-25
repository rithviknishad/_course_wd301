import { navigate } from "raviger";
import { ReactNode, useEffect } from "react";
import { toast } from "react-toastify";
import { isAuthenticated } from "../utils/storageUtils";

export default function Authenticated(props: { children: ReactNode }) {
  useEffect(() => {
    if (!isAuthenticated()) {
      toast("You must be authenticated to access this page");
      navigate("/login");
    }
  });
  return <>{props.children}</>;
}
