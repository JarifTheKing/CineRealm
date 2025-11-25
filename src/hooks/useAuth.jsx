// import { use } from "react";
// import { AuthContext } from "../Context/AuthProvider";

// const useAuth = () => {
//   const authInfo = use(AuthContext);
//   return authInfo;
// };

// export default useAuth;
import { AuthContext } from "@/context/AuthProvider";
import React, { use } from "react";

export default function useAuth() {
  const authInfo = use(AuthContext);
  return authInfo;
}
