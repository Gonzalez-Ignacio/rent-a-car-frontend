import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../inputFields";
import { useForm } from "react-hook-form";
import { createCarValidation } from "../../validation/Car/createCarValidation";
import { useCreateCar } from "../../hook/car/useCreateCar";
import { ICarsCreate } from "../../interface/car/carCreate.interface";
import { fetchAuthSession } from "@aws-amplify/auth";

export interface CarFormProps {
  fetchCars: () => void;
}

export function CarForm({ fetchCars }: CarFormProps) {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createCarValidation),
  });

  const { createCar } = useCreateCar();

  const handleOnSubmit = async (data: ICarsCreate) => {
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken.toString();
    if (!token) {
      console.error("User Unauthenticated");
      return;
    }

    try {
      const response = await createCar(token, data);
      console.log("User registered successfully:", response);
      fetchCars();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <InputField
        id="brand"
        label="Brand"
        type="text"
        register={register}
        error={formState.errors.brand}
      />

      <InputField
        id="model"
        label="Model"
        type="text"
        register={register}
        error={formState.errors.model}
      />

      <InputField
        id="color"
        label="Color"
        type="text"
        register={register}
        error={formState.errors.color}
      />

      <InputField
        id="passengers"
        label="Passengers"
        type="number"
        register={register}
        error={formState.errors.passengers}
      />

      <InputField
        id="ac"
        label="AC"
        type="checkbox"
        register={register}
        error={formState.errors.ac}
      />

      <InputField
        id="pricePerDay"
        label="Price per day"
        type="number"
        register={register}
        error={formState.errors.pricePerDay}
      />

      <button
        className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white 
      font-bold py-2 px-4 rounded mt-4"
      >
        Enviar
      </button>
    </form>
  );
}
