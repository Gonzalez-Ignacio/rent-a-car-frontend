import * as yup from 'yup';

export const createCarValidation = yup.object().shape({
  brand: yup.string().required(),
  model: yup.string().required(),
  img: yup.string().required(),
  color: yup.string().required(),
  passengers: yup.number().required(),
  ac: yup.boolean().required(),
  pricePerDay: yup.number().required(),
})