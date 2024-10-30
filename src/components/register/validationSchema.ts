import * as Yup from "yup";

const emailRegexp =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

const phonePattern = /^\+380 \d{2} \d{3} \d{2} \d{2}$/;

export const step1Schema = Yup.object().shape({
  login: Yup.string()
    .matches(emailRegexp, "Введіть дійсний email")
    .required("Введіть email"),
  password: Yup.string()
    .min(8, "Пароль має містити мінімум 8 символів")
    .max(14, "Пароль має містити максимум 14 символів")
    .required("Введіть пароль"),
  doublePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Введені паролі не співпадають")
    .required("Введіть пароль"),
});

export const step2Schema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Ім’я повинно мати не менше 2 знаків")
    .max(50, "Ім’я повинно бути не більше 50 знаків")
    .required("Введіть ім’я"),
  lastName: Yup.string()
    .min(2, "Прізвище повинно мати не менше 2 знаків")
    .max(50, "Прізвище повинно бути не більше 50 знаків")
    .required("Введіть прізвище"),
  phone: Yup.string()
    .matches(phonePattern, "Введіть номер телефону")
    .required("Введіть номер телефону"),
  agreeTerms: Yup.boolean()
    .oneOf([true], "Необхідна згода з правилами")
    .required(),
  agreeDataProcessing: Yup.boolean()
    .oneOf([true], "Необхідна згода на обробку даних")
    .required(),
});

export type TypeStep1Schema = Yup.InferType<typeof step1Schema>;
export type TypeStep2Schema = Yup.InferType<typeof step2Schema>;
