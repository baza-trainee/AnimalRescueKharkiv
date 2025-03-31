import * as Yup from "yup";


export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Пароль має містити мінімум 8 символів")
    .max(14, "Пароль має містити максимум 14 символів")
    .required("Введіть пароль"),
  doublePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Введені паролі не співпадають")
    .required("Введіть пароль"),
  
});

export type TypeResetSchema = Yup.InferType<typeof resetPasswordSchema>;