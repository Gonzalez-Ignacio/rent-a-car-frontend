import * as yup from "yup";

export const loginValidation = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});