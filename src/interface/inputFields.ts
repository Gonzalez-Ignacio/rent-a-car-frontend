import { FieldError, FieldValues, Path, UseFormRegister } from "react-hook-form";
// import { IUserRegisterValidation } from "../validation/registerValidation";

export interface IInputFields<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type: string;
  register: UseFormRegister<T>;
  error?: FieldError;
}