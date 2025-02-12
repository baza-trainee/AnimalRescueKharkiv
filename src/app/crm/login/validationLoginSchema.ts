import * as Yup from "yup";


export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email( "Введіть дійсний email")
    .required("Введіть email"),
  password: Yup.string()
     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
    message: "Пароль повинен містити одну велику літеру, одну малу літеру і одну цифру",
    excludeEmptyString: true,
  })
    .min(8, "Пароль має містити мінімум 8 символів")
    .max(12, "Пароль має містити максимум 12 символів")
    .required("Введіть пароль"),
 
});


export type TypeLoginSchema = Yup.InferType<typeof loginSchema>;
