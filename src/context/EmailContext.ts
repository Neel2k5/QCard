import { createContext, useContext } from "react";

export const EmailContext = createContext<string | null>(null);

export const useEmail = () => useContext(EmailContext);