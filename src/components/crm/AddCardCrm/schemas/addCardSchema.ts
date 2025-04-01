import { format, isValid, parse } from "date-fns";
import * as Yup from "yup";

const nameRegExp = /^[a-zA-Zа-яА-ЯґҐєЄіІїЇ'’\-\s]+$/;

const today = new Date();
today.setHours(0, 0, 0, 0);
const formattedTodayDate = format(new Date(), "dd.MM.yyyy");

export const addCardSchema = Yup.object().shape({
  name: Yup.string()
    .matches(nameRegExp, "Введіть коректне ім'я")
    .min(2, "Ім’я має бути не менше 2 символів")
    .max(30, "Ім’я має бути не більше 30 символів")
    .required("Введіть ім’я"),
  origin__arrival_date: Yup.mixed()
    .nullable()
    .transform((value) =>
      value instanceof Date ? format(value, "dd/MM/yyyy") : value
    )
    .required("Дата прибуття обов’язкова")
    .test(
      "no-later-than-today",
      `Не пізніше за ${formattedTodayDate}`,
      function (value) {
        if (!value || typeof value !== "string") return true;
        const parsedDate = parse(value, "dd/MM/yyyy", new Date());
        return isValid(parsedDate) && parsedDate <= today;
      }
    ),
  origin__city: Yup.string()
    .min(2, "Місто має бути не менше 2 символів")
    .max(100, "Місто має бути не більше 100 символів")
    .required("Введіть місто"),
  origin__address: Yup.string().nullable().notRequired(),
  general__animal_type: Yup.object().shape({
    id: Yup.number().nullable().required("Оберіть тип тварини"),
  }),
  general__gender: Yup.string().required("Оберіть стать тварини"),
  general__weight: Yup.number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired(),
  general__age: Yup.number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired(),
  general__specials: Yup.string().nullable().notRequired(),
  owner__info: Yup.string().nullable().notRequired(),
  comment__text: Yup.string().nullable().notRequired(),
  sterilization__done: Yup.boolean().nullable().notRequired(),
  sterilization__date: Yup.mixed()
    .nullable()
    .transform((value) =>
      value instanceof Date ? format(value, "dd/MM/yyyy") : value
    )
    .test(
      "no-later-than-today",
      `Не пізніше за ${formattedTodayDate}`,
      function (value) {
        if (!value || typeof value !== "string") return true;
        const parsedDate = parse(value, "dd/MM/yyyy", new Date());
        return isValid(parsedDate) && parsedDate <= today;
      }
    )
    .notRequired(),
  sterilization__comment: Yup.string()
    .nullable()
    .max(500, "Коментар не може бути більше 500 символів")
    .notRequired(),
  microchipping__done: Yup.boolean().nullable().notRequired(),
  microchipping__date: Yup.mixed()
    .nullable()
    .transform((value) =>
      value instanceof Date ? format(value, "dd/MM/yyyy") : value
    )
    .test(
      "no-later-than-today",
      `Не пізніше за ${formattedTodayDate}`,
      function (value) {
        if (!value || typeof value !== "string") return true;
        const parsedDate = parse(value, "dd/MM/yyyy", new Date());
        return isValid(parsedDate) && parsedDate <= today;
      }
    )
    .notRequired(),
  microchipping__comment: Yup.string()
    .nullable()
    .max(500, "Коментар не може бути більше 500 символів")
    .notRequired(),
  media: Yup.mixed<FileList>()
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
  locations: Yup.array().of(
    Yup.object().shape({
      location: Yup.object()
        .shape({
          id: Yup.number().nullable(),
          name: Yup.string().nullable(),
        })
        .test(
          "location-required",
          "Оберіть локацію",
          (value) => !!value?.id || !!value?.name
        ),
      date_from: Yup.mixed()
        .transform((value) =>
          value instanceof Date ? format(value, "dd/MM/yyyy") : value
        )
        .nullable()
        .test(
          "no-later-than-today",
          `Не пізніше за ${formattedTodayDate}`,
          function (value) {
            if (!value || typeof value !== "string") return true;
            const parsedDate = parse(value, "dd/MM/yyyy", new Date());
            return isValid(parsedDate) && parsedDate <= today;
          }
        )
        .test("required-date-from", "Оберіть дату 'З'", function (value) {
          const { location } = this.parent;
          if (location && !value) {
            return this.createError({ message: "Оберіть дату 'З'" });
          }
          return true;
        }),
      date_to: Yup.mixed()
        .transform((value) =>
          value instanceof Date ? format(value, "dd/MM/yyyy") : value
        )
        .nullable()
        .test(
          "no-later-than-today",
          `Не пізніше за ${formattedTodayDate}`,
          function (value) {
            if (!value || typeof value !== "string") return true;
            const parsedDate = parse(value, "dd/MM/yyyy", new Date());
            return isValid(parsedDate) && parsedDate <= today;
          }
        )
        .test("date-to-after-from", 'Не раніше дати "З"', function (value) {
          const { date_from } = this.parent;
          if (!date_from || !value) {
            return true;
          }
          return value >= date_from;
        }),
    })
  ),
  vaccinations: Yup.array()
    .of(
      Yup.object().shape({
        is_vaccinated: Yup.boolean(),
        vaccine_type: Yup.string().nullable().notRequired(),
        date: Yup.mixed()
          .nullable()
          .transform((value) =>
            value instanceof Date ? format(value, "dd/MM/yyyy") : value
          )
          .test(
            "no-later-than-today",
            `Не пізніше за ${formattedTodayDate}`,
            function (value) {
              if (!value || typeof value !== "string") return true;
              const parsedDate = parse(value, "dd/MM/yyyy", new Date());
              return isValid(parsedDate) && parsedDate <= today;
            }
          )
          .notRequired(),
        comment: Yup.string()
          .nullable()
          .max(500, "Коментар не може бути більше 500 символів")
          .notRequired(),
      })
    )
    .notRequired(),
  diagnoses: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .nullable()
          .when(["date", "comment"], {
            is: (date: string, comment: string) =>
              date !== null || comment !== null,
            then: (schema) => schema.required("Введіть назву діагнозу"),
            otherwise: (schema) => schema,
          }),
        date: Yup.mixed()
          .nullable()
          .transform((value) =>
            value instanceof Date ? format(value, "dd/MM/yyyy") : value
          )
          .test(
            "no-later-than-today",
            `Не пізніше за ${formattedTodayDate}`,
            function (value) {
              if (!value || typeof value !== "string") return true;
              const parsedDate = parse(value, "dd/MM/yyyy", new Date());
              return isValid(parsedDate) && parsedDate <= today;
            }
          )
          .notRequired(),
        comment: Yup.string()
          .nullable()
          .max(500, "Коментар не може бути більше 500 символів")
          .notRequired(),
      })
    )
    .notRequired(),
  procedures: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .nullable()
          .when(["date", "comment"], {
            is: (date: string, comment: string) =>
              date !== null || comment !== null,
            then: (schema) => schema.required("Введіть назву діагнозу"),
            otherwise: (schema) => schema,
          }),
        date: Yup.mixed()
          .nullable()
          .transform((value) =>
            value instanceof Date ? format(value, "dd/MM/yyyy") : value
          )
          .test(
            "no-later-than-today",
            `Не пізніше за ${formattedTodayDate}`,
            function (value) {
              if (!value || typeof value !== "string") return true;
              const parsedDate = parse(value, "dd/MM/yyyy", new Date());
              return isValid(parsedDate) && parsedDate <= today;
            }
          )
          .notRequired(),
        comment: Yup.string()
          .nullable()
          .max(500, "Коментар не може бути більше 500 символів")
          .notRequired(),
      })
    )
    .notRequired(),
});

export type TypeAddCardSchema = Yup.InferType<typeof addCardSchema>;
