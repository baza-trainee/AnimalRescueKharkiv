  import * as Yup from "yup";

  const emailRegexp =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?!ru$|by$|рф$)[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

  export const loginSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegexp, "Введіть дійсний email(не допускаються домени .ru, .by, .рф)")
      .email( "Введіть дійсний email")
      .required("Введіть email"),
    password: Yup.string()
        .required("Введіть пароль"),
  
  });


  export type TypeLoginSchema = Yup.InferType<typeof loginSchema>;