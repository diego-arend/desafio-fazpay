import { useContext } from "react";
import { AuthContext } from "./authContext";


export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth erro AuthProvider");
  }

  return context;
}