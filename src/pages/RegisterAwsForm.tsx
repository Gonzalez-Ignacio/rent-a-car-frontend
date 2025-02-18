import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { signUp } from "@aws-amplify/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerAwsValidation } from "../validation/registerAwsValidation";
import { IUserRegisterAws } from "../interface/userRegisterAws";

export default function RegisterAwsForm() {
  const { formState, handleSubmit, register } = useForm<IUserRegisterAws>({
    resolver: yupResolver(registerAwsValidation),
  });

  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: IUserRegisterAws) => {
    if (!password) {
      setPasswordError("Password is required");
      return;
    } else {
      setPasswordError(null);
    }
    try {
      await signUp({
        username: data.email,
        password: password,
      });
      console.log("User registered successfully:", data);

      setTimeout(() => {
        navigate("/email-confirmation-form", {
          state: { dataRegister: data },
        });
      }, 2000);
    } catch (error: unknown) {
      const err = error as { name: string };
      if (err.name === "UsernameExistsException") {
        setErrorMessage("User already exists");
      } else {
        setErrorMessage("Error registering user");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm p-5">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="email"
            >
              Set email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="email-register"
              type="text"
              {...register("email")}
            />
            {formState.errors?.email && (
              <span className="text-red-500">
                {formState.errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <span className="text-red-500">{passwordError}</span>
            )}
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Register
            </button>
            {errorMessage && (
              <div className="text-red-500 text-center mb-4">
                {errorMessage}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
