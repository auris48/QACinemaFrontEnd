import { createContext } from "react";

export const loginContext = createContext({});

const storeUser = () => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return {};
};
