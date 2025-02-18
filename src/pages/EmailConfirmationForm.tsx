import { useForm } from "react-hook-form";
import { confirmSignUp } from "@aws-amplify/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { IUserRegisterAws } from "../interface/userRegisterAws";
import { IConfirmEmailCode } from "../interface/confirmEmailCode";

export default function EmailConfirmationForm() {
  const location = useLocation();
  const { dataRegister } = location.state as { dataRegister: IUserRegisterAws };

  const { register, handleSubmit, formState } = useForm<IConfirmEmailCode>();
  const navigate = useNavigate();

  const onSubmit = async (data: IConfirmEmailCode) => {
    try {
      await confirmSignUp({
        username: dataRegister.email,
        confirmationCode: data.confirmationCode,
      });
      console.log("Confirmation code submitted successfully");

      setTimeout(() => {
        navigate("/login-aws-form")
      })
    } catch (error) {
      console.error("Error confirming sign up", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm p-5">
      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="confirmationCode"
          >
            Confirmation Code
          </label>
        </div>
        <div className="md:w-2/3">
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="confirmationCode"
            type="text"
            {...register("confirmationCode", {
              required: "Confirmation code is required",
            })}
          />
          {formState.errors?.confirmationCode && (
            <span className="text-red-500">
              {formState.errors.confirmationCode.message}
            </span>
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
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
