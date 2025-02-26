import * as yup from 'yup';

export const createDocumentValidation = yup.object().shape({
  url: yup.string().url().required(),
  src: yup.string().required(),
  title: yup.string().required(),
  description: yup.string().required(),
})