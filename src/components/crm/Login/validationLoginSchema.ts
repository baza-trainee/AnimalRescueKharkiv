  import * as Yup from "yup";


  export const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email( "Введіть дійсний email")
      .required("Введіть email"),
    password: Yup.string()
        .required("Введіть пароль"),
  
  });


  export type TypeLoginSchema = Yup.InferType<typeof loginSchema>;