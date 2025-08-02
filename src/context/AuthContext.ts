import app from "../lib/firebase";
import { getAuth } from "firebase/auth";
import { createContext, useContext } from "react"; 

const auth = getAuth(app);
export const AuthContext = createContext(auth);

export const useAuth = ()=>useContext(AuthContext);
