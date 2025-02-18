import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import InputField from "../components/inputFields";
import { IUserRegisterValidation, registerCompleteValidation } from "../validation/registerValidation";
import { useRegister } from "../hook/useRegister";
import { fetchAuthSession } from "@aws-amplify/auth";
import { useUser } from "../hook/useUser";

export default function CompleteRegisterForm() {
  const { user } = useUser();
  const email = user?.email;

  const { formState, handleSubmit, register } = useForm({
    resolver: yupResolver(registerCompleteValidation),
  });

  const { userRegister } = useRegister();

  const onSubmit = async (data: IUserRegisterValidation) => {
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken.toString();

    if (!token || !email) {
      console.error("User Unauthenticated");
      return;
    }

    try {
      const response = await userRegister({...data, email}, token);
      console.log("User registered successfully:", response);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm p-5">
        <InputField
          id="firstName"
          label="First Name"
          type="text"
          register={register}
          error={formState.errors?.firstName}
        />

        <InputField
          id="lastName"
          label="Last Name"
          type="text"
          register={register}
          error={formState.errors?.lastName}
        />

        <InputField
          id="dob"
          label="Date of Birth"
          type="date"
          register={register}
          error={formState.errors?.dob}
        />

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="email"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              id="email"
              type="email"
              value={email}
              disabled
            />
          </div>
        </div>

        <InputField
          id="address"
          label="Address"
          type="text"
          register={register}
          error={formState.errors?.address}
        />

        <InputField
          id="country"
          label="Country"
          type="text"
          register={register}
          error={formState.errors?.country}
        />

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Register
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
