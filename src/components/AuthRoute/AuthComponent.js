// 1. Check if token exists
// 2. If so, render
// 3. If not, go to the login route

import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

function AuthComponent({ children }) {
  const isToken = getToken();
  if (isToken) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
}

export { AuthComponent };
