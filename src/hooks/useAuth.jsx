import { AuthContext } from "@/context/AuthProvider";
import { useContext } from "react";

export default function useAuth() {
  const authInfo = useContext(AuthContext);
  return authInfo;
}
