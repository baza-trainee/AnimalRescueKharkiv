import * as Yup from "yup";

const emailRegexp =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;


export const forgotSchema = Yup.object().shape({
   email: Yup.string()
      .matches(emailRegexp, "Введіть дійсний email")
      .required("Введіть email"),
 
});


export type TypeForgotSchema = Yup.InferType<typeof forgotSchema>;