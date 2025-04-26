import * as Yup from "yup";

const emailRegexp =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?!ru$|by$|рф$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;


export const forgotSchema = Yup.object().shape({
  email: Yup.string()
    .email( "Введіть дійсний email")
   .matches(emailRegexp, "Введіть дійсний email(не допускаються домени .ru, .by, .рф)")
    .required("Введіть email"),
 
});


export type TypeForgotSchema = Yup.InferType<typeof forgotSchema>;  