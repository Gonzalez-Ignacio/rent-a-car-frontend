import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signIn, signOut, fetchAuthSession } from "@aws-amplify/auth";
import { IUserLoginAws } from "../interface/userLoginAws";
import { useNavigate } from "react-router-dom";
import { loginValidation } from "../validation/loginAwsValidation";
import { useUser } from "../hook/useUser";
import { useState } from "react";
import { useLogin } from "../hook/useLogin";

export default function LoginAwsForm() {
  const { formState, handleSubmit, register } = useForm({
    resolver: yupResolver(loginValidation),
  });
  const { setUser } = useUser();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { userLogin } = useLogin();


  const handleOnsubmit = async (data: IUserLoginAws) => {
    try {
      const response = await signIn({
        username: data.email,
        password: data.password,
      });
      console.log("User login successfully:", response);
      const session = await fetchAuthSession();
      const token = session.tokens?.accessToken.toString();

      if (!token) {
        throw new Error("No token found");
      }

      const user = await userLogin(token);
      console.log("user:", user);

      if(user) {
        const dataUser = {
          email: data.email,
          uuid: user.uuid,
          firstName: user.firstName,
          lastName: user.lastName,
          dob: user.dob,
          address: user.address,
          country: user.country,
        };
        localStorage.setItem("user", JSON.stringify(dataUser));
        setUser({email: data.email, password: data.password,});
        navigate("/");
      }
      // } else {
      //   setUser({email: data.email, password: data.password});
      //   navigate("/complete-register-form");
      // }


    } catch (error: unknown) {
      console.error("Error logging in:", error);

      const err = error as { name?: string };
      if (err.name === "UserAlreadyAuthenticatedException") {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (err.name === "NotAuthorizedException") {
        setErrorMessage("Incorrect credentials.");
      } else {
        setErrorMessage("You must complete the following fields to finish the registration.");
        setTimeout(() => {
          setUser({email: data.email, password: data.password});
          navigate("/complete-register-form");
        }, 1000);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleOnsubmit)}
        className="w-full max-w-sm p-5"
      >
        <button type="button" onClick={() => signOut()}>
          salir
        </button>
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          htmlFor="email"
        >
          Set email
        </label>
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="email-login"
          type="text"
          {...register("email")}
        />
        {formState.errors?.email && (
          <span className="text-red-500">{formState.errors.email.message}</span>
        )}

        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          htmlFor="password"
        >
          Set password
        </label>
        <input
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          id="password-login"
          type="text"
          {...register("password")}
        />
        <button
          className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
        {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
      </form>
    </>
  );
}
