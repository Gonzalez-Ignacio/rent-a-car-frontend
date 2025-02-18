import * as yup from "yup";

export interface IUserRegisterValidation {
  firstName: string;
  lastName: string;
  dob: Date;
  address: string;
  country: string;
}

export const registerCompleteValidation = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dob: yup.date().required(),
  address: yup.string().required(),
  country: yup.string().required(),
});