import { FieldError, UseFormRegister } from "react-hook-form";
import { IUserRegisterValidation } from "../validation/registerValidation";

export interface IInputFields {
  id: keyof IUserRegisterValidation;
  label: string;
  type: string;
  register: UseFormRegister<IUserRegisterValidation>;
  error?: FieldError;
}