import React from "react";
import { UserContext } from "../context/UserProvider";
import { IUserProvider } from "../interface/userProvider";


export const useUser = (): IUserProvider => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};