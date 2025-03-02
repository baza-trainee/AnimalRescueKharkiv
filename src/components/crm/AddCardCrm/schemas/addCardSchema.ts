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
  arrivalDate: Yup.string().required("Дата прибуття обов’язкова"),
  currentLocation: Yup.string().required("Оберіть або введіть поточну локацію"),
  currentDate: Yup.date().nullable().notRequired(),
  locations: Yup.array().of(
    Yup.object().shape({
      location: Yup.string().when(["date_from", "date_to"], {
        is: (date_from: Date | null, date_to: Date | null) =>
          !!date_from || !!date_to,
        then: (schema) => schema.required("Оберіть локацію"),
        otherwise: (schema) => schema.notRequired(),
      }),
      date_from: Yup.date()
        .nullable()
        .test("required-date-from", "Оберіть дату 'З'", function (value) {
          const { location } = this.parent;
          if (location && !value) {
            return this.createError({ message: "Оберіть дату 'З'" });
          }
          return true;
        }),
      date_to: Yup.date()
        .nullable()
        .test("date-to-after-from", 'Не раніше дати "З"', function (value) {
          const { date_from } = this.parent;

          if (!date_from || !value) {
            return true;
          }

          return value >= date_from;
        }),
    })
  ),
  owner__info: Yup.string().notRequired(),
  comment__text: Yup.string().notRequired(),
  sterilization__done: Yup.boolean().notRequired(),
  sterilization__date: Yup.date().notRequired(),
  sterilization__comment: Yup.string().notRequired(),
  microchipping__done: Yup.boolean().notRequired(),
  microchipping__date: Yup.date().notRequired(),
  microchipping__comment: Yup.string().notRequired(),
  vaccinations: Yup.array()
    .of(
      Yup.object({
        is_vaccinated: Yup.boolean().notRequired(),
        vaccine_type: Yup.string().notRequired(),
        date: Yup.string().notRequired(),
        comment: Yup.string().notRequired(),
      })
    )
    .notRequired()
    .default([]),
  diagnoses: Yup.array().of(
    Yup.object({
      name: Yup.string().notRequired(),
      date: Yup.date().notRequired(),
      comment: Yup.string().notRequired(),
    })
  ),
});

export type TypeAddCardSchema = Yup.InferType<typeof addCardSchema>;
