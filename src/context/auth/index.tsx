import { PropsWithChildren } from "react";
import AuthProvider from "./authProvider";

export default function Providers({children}: PropsWithChildren) {
  return (
    <AuthProvider>
      { children }
    </AuthProvider>
  )
}