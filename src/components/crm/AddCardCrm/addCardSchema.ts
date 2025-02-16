import * as Yup from "yup";

const nameRegExp = /^[a-zA-Zа-яА-ЯґҐєЄіІїЇ'’\-\s]+$/;

const animalTypes = [
  "Кіт/кішка",
  "Собака",
  "Кінь",
  "Корова",
  "Коза",
  "Кролик",
  "Птах",
  "Лис",
  "Інші",
];

const genders = ["Самець", "Самка"];

export const addCardSchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegExp, "Введіть коректне ім'я")
    .min(2, "Ім’я має бути не менше 2 символів")
    .max(30, "Ім’я має бути не більше 30 символів")
    .required("Введіть ім’я"),
  files: Yup.mixed<FileList>()
    .test("fileFormat", "Тільки фото або відео", (value) => {
      if (!value || value.length === 0) return true;

      for (let i = 0; i < value.length; i++) {
        const file = value[i];
        if (!file.type || file.type === "") return false;
        if (!["image", "video"].includes(file.type.split("/")[0])) return false;
      }
      return true;
    })
    .notRequired(),
  city: Yup.string()
    .min(2, "Місто має бути не менше 2 символів")
    .max(50, "Місто має бути не більше 50 символів")
    .required("Введіть місто"),
  address: Yup.string().notRequired(),
  animalType: Yup.string()
    .oneOf(animalTypes, "Оберіть тип тварини зі списку")
    .required("Оберіть тип тварини"),
  gender: Yup.string()
    .oneOf(genders, "Оберіть стать тварини зі списку")
    .required("Оберіть стать тварини"),
  weight: Yup.string().max(50, "Не більше 50 символів").notRequired(),
  age: Yup.string().max(50, "Не більше 50 символів").notRequired(),
  specialMarks: Yup.string().max(200, "Не більше 200 символів").notRequired(),
  arrivalDate: Yup.date().nullable().required("Дата прибуття обов’язкова"),
  currentLocation: Yup.string().required("Оберіть або введіть поточну локацію"),
  currentDate: Yup.date().nullable().notRequired(),
  locations: Yup.array().of(
    Yup.object({
      location: Yup.string().notRequired(),
      date_from: Yup.date().notRequired(),
      date_to: Yup.date()
        .nullable()
        .min(Yup.ref("date_from"), 'Не раніше дати "З"')
        .notRequired(),
    })
  ),
  owner__info: Yup.string().notRequired(),
  comment__text: Yup.string().notRequired(),
  sterilization__done: Yup.boolean().notRequired(),
  sterilization__date: Yup.date().notRequired(),
  sterilization__comment: Yup.string().notRequired(),
});

export type TypeAddCardSchema = Yup.InferType<typeof addCardSchema>;
