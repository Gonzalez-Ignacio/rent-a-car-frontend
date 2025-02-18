import * as yup from "yup";

export const registerAwsValidation = yup.object().shape({
  email: yup.string().email().required(),
});