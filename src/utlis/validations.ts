import * as yup from "yup";

const stringRequired = yup.string().required();
const stringValidation = yup.string().nullable();

export const signUpFormValidation = yup.object().shape({
  email: stringRequired.email(),
});
