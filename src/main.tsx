import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import UserProvider from "./context/UserProvider.tsx";
import { Amplify } from "aws-amplify";
import { IUserLoginAws } from "./interface/userLoginAws.ts";

const userApi: IUserLoginAws = {
  email: "",
  password: "",
};

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId: "460fsec8h85e8ko4c70bjdr2fu",
      userPoolId: "us-east-2_VpHcXMMIg",
      loginWith: {
        oauth: {
          domain: "https://us-east-2vphcxmmig.auth.us-east-2.amazoncognito.com",
          scopes: ['email', 'openid', 'phone'],
          redirectSignIn: ["http://localhost:5173/"],
          redirectSignOut: ["http://localhost:5173/"],
          responseType: "token",
        },
      },
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider userApi={userApi}>
      <App />
    </UserProvider>
  </StrictMode>
);
