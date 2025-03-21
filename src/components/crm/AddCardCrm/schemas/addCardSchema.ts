import { format, isValid, parse } from "date-fns";
import * as Yup from "yup";

const nameRegExp = /^[a-zA-Zа-яА-ЯґҐєЄіІїЇ'’\-\s]+$/;

const today = new Date();
today.setHours(0, 0, 0, 0);
const formattedTodayDate = format(new Date(), "dd.MM.yyyy");

export const addCardSchema = Yup.object().shape({
  // name: Yup.string()
  //   .matches(nameRegExp, "Введіть коректне ім'я")
  //   .min(2, "Ім’я має бути не менше 2 символів")
  //   .max(30, "Ім’я має бути не більше 30 символів")
  //   .required("Введіть ім’я"),
  // origin__arrival_date: Yup.mixed()
  //   .transform((value) =>
  //     value instanceof Date ? format(value, "dd/MM/yyyy") : value
  //   )
  //   .required("Дата прибуття обов’язкова")
  //   .test(
  //     "no-later-than-today",
  //     `Не пізніше за ${formattedTodayDate}`,
  //     function (value) {
  //       if (!value || typeof value !== "string") return true;
  //       const parsedDate = parse(value, "dd/MM/yyyy", new Date());
  //       return isValid(parsedDate) && parsedDate <= today;
  //     }
  //   ),
  // origin__city: Yup.string()
  //   .min(2, "Місто має бути не менше 2 символів")
  //   .max(100, "Місто має бути не більше 100 символів")
  //   .required("Введіть місто"),
  // origin__address: Yup.string().nullable().notRequired(),
  general__animal_type: Yup.object()
    .shape({
      id: Yup.number().nullable(),
    })
    .required("Оберіть тип тварини"),
  // gender: Yup.string().required("Оберіть стать тварини"),
  // weight: Yup.string().max(50, "Не більше 50 символів").notRequired(),
  // age: Yup.string().max(50, "Не більше 50 символів").notRequired(),
  // specialMarks: Yup.string().max(200, "Не більше 200 символів").notRequired(),
  // locations: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       location: Yup.object().shape({
  //         id: Yup.number().nullable().required("Оберіть локацію"),
  //       }),
  //       date_from: Yup.mixed()
  //         .transform((value) =>
  //           value instanceof Date ? format(value, "dd/MM/yyyy") : value
  //         )
  //         .test(
  //           "no-later-than-today",
  //           `Не пізніше за ${formattedTodayDate}`,
  //           function (value) {
  //             if (!value || typeof value !== "string") return true;
  //             const parsedDate = parse(value, "dd/MM/yyyy", new Date());
  //             return isValid(parsedDate) && parsedDate <= today;
  //           }
  //         )
  //         .test("required-date-from", "Оберіть дату 'З'", function (value) {
  //           const { location } = this.parent;
  //           if (location?.id && !value) {
  //             return this.createError({ message: "Оберіть дату 'З'" });
  //           }
  //           return true;
  //         }),
  //       date_to: Yup.mixed()
  //         .transform((value) =>
  //           value instanceof Date ? format(value, "dd/MM/yyyy") : value
  //         )
  //         .nullable()
  //         .test(
  //           "no-later-than-today",
  //           `Не пізніше за ${formattedTodayDate}`,
  //           function (value) {
  //             if (!value || typeof value !== "string") return true;
  //             const parsedDate = parse(value, "dd/MM/yyyy", new Date());
  //             return isValid(parsedDate) && parsedDate <= today;
  //           }
  //         )
  //         .test("date-to-after-from", 'Не раніше дати "З"', function (value) {
  //           const { date_from } = this.parent;

  //           if (!date_from || !value) {
  //             return true;
  //           }

  //           return value >= date_from;
  //         }),
  //     })
  //   )
  //   .test(
  //     "current-location-required",
  //     "Оберіть поточну локацію",
  //     function (value) {
  //       if (!value || !value[0]?.location?.id) {
  //         return this.createError({
  //           path: "locations.0.location.id",
  //           message: "Оберіть поточну локацію",
  //         });
  //       }
  //       return true;
  //     }
  //   ),
  owner__info: Yup.string().notRequired(),
  comment__text: Yup.string().notRequired(),
  sterilization__done: Yup.boolean().notRequired(),
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
  sterilization__comment: Yup.string().notRequired(),
  microchipping__done: Yup.boolean().notRequired(),
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
  microchipping__comment: Yup.string().notRequired(),
  vaccinations: Yup.array()
    .of(
      Yup.object({
        is_vaccinated: Yup.boolean().notRequired(),
        vaccine_type: Yup.string().notRequired(),
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
        comment: Yup.string().notRequired(),
      })
    )
    .notRequired()
    .default([]),
  diagnoses: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().notRequired(),
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
        comment: Yup.string().notRequired(),
      })
    )
    .notRequired(),
  procedures: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().notRequired(),
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
        comment: Yup.string().notRequired(),
      })
    )
    .notRequired(),
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
});

export type TypeAddCardSchema = Yup.InferType<typeof addCardSchema>;
