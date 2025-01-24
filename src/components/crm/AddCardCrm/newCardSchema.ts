import * as Yup from "yup";

export const newCardSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім’я повинно мати не менше 2 знаків")
    .max(50, "Ім’я повинно бути не більше 50 знаків")
    .required("Введіть ім’я"),
  files: Yup.mixed<FileList>()
    .test("fileFormat", "Тільки фото або відео", (value) => {
      if (!value || value.length === 0) return true;
      const file = value[0];
      if (!file.type || file.type === "") return false;
      return file && ["image", "video"].includes(file.type.split("/")[0]);
    })
    .notRequired(),
});

export type TypeNewCardSchema = Yup.InferType<typeof newCardSchema>;
