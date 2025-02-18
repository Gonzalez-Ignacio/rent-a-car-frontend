import { createContext, useCallback, useEffect, useState } from "react";
import React from "react";
import { IUserLoginAws } from "../interface/userLoginAws";
import { fetchAuthSession, fetchUserAttributes } from "@aws-amplify/auth";
import { IUserProvider } from "../interface/userProvider";

export const UserContext = createContext<IUserProvider | null>(null);

export default function UserProvider({
  children,
  userApi,
}: {
  children: React.ReactNode;
  userApi: IUserLoginAws;
}): React.JSX.Element {
  const [user, setUser] = useState<IUserLoginAws | null>(userApi);
  const setEmail = (email: string) => {
    setUser({
      ...user!,
      email,
      password: "",
    });
  };

  const getEmail = useCallback(async () => {
    try {
      const session = await fetchAuthSession();
      if (!session.tokens?.accessToken) {
        setUser(null);
        return;
      }

      const { email } = await fetchUserAttributes();
      if (email && email !== user?.email) {
        setEmail(email);
      }
    } catch (error) {
      setUser(null);
      console.error("Error fetching user attributes:", error);
    }
  }, [user?.email]);

  useEffect(() => {
    getEmail();
  }, [getEmail]);

  const state = {
    user,
    setUser,
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}
