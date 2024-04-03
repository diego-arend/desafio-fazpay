import { useContext } from "react";
import { authContext } from "./authContext";

export default function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("useAuth erro AuthProvider");
  }

  return context;
}