import { FieldValues } from "react-hook-form";
import { IInputFields } from "../interface/inputFields";

export default function InputField<T extends FieldValues>({
  id,
  label,
  type,
  register,
  error,
}: IInputFields<T>) {
  return (
    <div className="md:flex md:items-center mb-6">
      <div className="md:w-1/3">
        <label
          className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
          htmlFor={id.toString()}
        >
          {label}
        </label>
      </div>
      <div className="md:w-2/3">
        {type === "checkbox" ? (
          <div className="flex items-center">
            <input
              id={id.toString()}
              type="checkbox"
              className="w-5 h-5 text-purple-600 bg-gray-200 border-gray-300 rounded focus:ring-2 focus:ring-purple-500"
              {...register(id)}
            />
            <label
              htmlFor={id.toString()}
              className="ml-2 text-gray-700 font-medium cursor-pointer"
            >
              {label}
            </label>
          </div>
        ) : (
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id={id.toString()}
            type={type}
            {...register(id)}
          />
        )}
        {error && <span className="text-red-500">{error.message}</span>}
      </div>
    </div>
  );
}
