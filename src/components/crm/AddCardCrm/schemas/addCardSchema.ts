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
  general__animal_type: Yup.object({
    id: Yup.number()
      .min(1, "Оберіть тип тварини")
      .required("Оберіть тип тварини"),
  }),
  general__gender: Yup.string()
    .oneOf(["male", "female", ""], "Оберіть стать тварини")
    .required("Оберіть стать тварини"),
  general__weight: Yup.number()
    .nullable()
    .min(0, "Вага не може бути від'ємною")
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired(),
  general__age: Yup.number()
    .nullable()
    .min(0, "Вік не може бути від'ємним")
    .max(100, "Вік не може перевищувати 100 років")
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .notRequired(),
  general__specials: Yup.string()
    .nullable()
    .max(200, "Не більше 200 символів")
    .notRequired(),
  owner__info: Yup.string()
    .nullable()
    .max(500, "Не більше 500 символів")
    .notRequired(),
  comment__text: Yup.string()
    .nullable()
    .max(1000, "Не більше 1000 символів")
    .notRequired(),
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
    .max(500, "Не більше 500 символів")
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
    .max(500, "Не більше 500 символів")
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
  locations: Yup.array()
    .of(
      Yup.object()
        .shape({
          location: Yup.object().shape({
            id: Yup.number().nullable(),
            name: Yup.string().nullable(),
            isCustom: Yup.boolean(),
          }),
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
            .test(
              "required-date-from-for-index-0",
              "Оберіть дату 'З'",
              function (value) {
                const { index } = this.options as unknown as { index: number };
                console.log(this.options);

                if (index === 0 && !value) {
                  return this.createError({
                    path: `locations[${index}].date_from`,
                    message: "Оберіть дату",
                  });
                }
                return true;
              }
            ),
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
            .test(
              "date-to-after-from",
              'Не раніше за дату "З"',
              function (value) {
                const { date_from } = this.parent;

                const parsedFrom = parse(
                  String(date_from),
                  "dd/MM/yyyy",
                  new Date()
                );
                const parsedTo = parse(String(value), "dd/MM/yyyy", new Date());

                if (!isValid(parsedFrom) || !isValid(parsedTo)) return true;

                return parsedTo >= parsedFrom;
              }
            ),
        })
        .test("required-fields-by-index", "", function (value) {
          const { index } = this.options as unknown as { index: number };

          const hasLocation = !!value?.location?.id || !!value?.location?.name;
          const hasDateFrom = !!value?.date_from;

          if (index === 0) {
            if (!hasLocation) {
              return this.createError({
                path: `locations[0].location`,
                message: "Оберіть поточну локацію",
              });
            }
          }

          if (index > 0) {
            if (hasDateFrom && !hasLocation) {
              return this.createError({
                path: `locations[${index}].location`,
                message: "Оберіть локацію",
              });
            }
          }

          if (hasLocation && !hasDateFrom) {
            return this.createError({
              path: `locations[${index}].date_from`,
              message: "Оберіть дату",
            });
          }

          return true;
        })
    )
    .compact((obj) => !obj.location && !obj.date_from && !obj.date_to),
  vaccinations: Yup.array()
    .of(
      Yup.object().shape({
        is_vaccinated: Yup.boolean().notRequired(),
        vaccine_type: Yup.string()
          .nullable()
          .transform((value) => (value === "" ? null : value))
          .min(2, "Не менше 2 символів")
          .max(100, "Не більше 100 символів")
          .notRequired(),
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
          .transform((value) => (value === "" ? null : value))
          .min(2, "Не менше 2 символів")
          .max(100, "Не більше 100 символів")
          .notRequired(),
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
    .compact((obj) => !obj.name && !obj.date && !obj.comment)
    .notRequired(),
  procedures: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .nullable()
          .transform((value) => (value === "" ? null : value))
          .min(2, "Не менше 2 символів")
          .max(100, "Не більше 100 символів")
          .notRequired(),
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
    .compact((obj) => !obj.name && !obj.date && !obj.comment)
    .notRequired(),
});

export type TypeAddCardSchema = Yup.InferType<typeof addCardSchema>;
