import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormTrigger,
  useWatch,
} from "react-hook-form";
import { TypeAddCardSchema } from "./schemas/addCardSchema";
import { CustomDatePicker } from "../../ui/inputs/CustomDatePicker";
import { CommentInput } from "./inputs/CommentInput";
import { BooleanRadio } from "../AddCardCrm/inputs/BooleanRadio";
import { TextInput } from "./inputs/TextInput";
import { AddCardFormValues } from "./AddCardForm";

interface PropsMedicalInfoForm {
  control: Control<any>;
  errors: FieldErrors<TypeAddCardSchema>;
  trigger: UseFormTrigger<AddCardFormValues>;
}

export const MedicalInfoForm: React.FC<PropsMedicalInfoForm> = ({
  control,
  errors,
  trigger,
}) => {
  const { fields: vaccinationsFields } = useFieldArray({
    control,
    name: "vaccinations",
  });

  const { fields: diagnosesFields, append: appendDiagnosis } = useFieldArray({
    control,
    name: "diagnoses",
  });

  const { fields: proceduresFields, append: appendProcedure } = useFieldArray({
    control,
    name: "procedures",
  });

  const diagnoses = useWatch({ control, name: "diagnoses" });
  const procedures = useWatch({ control, name: "procedures" });

  const handleAddDiagnosis = async () => {
    const lastField = diagnoses[diagnoses.length - 1];

    const isValid = await trigger("diagnoses");

    if (
      isValid &&
      lastField &&
      (lastField.name || lastField.date || lastField.comment)
    ) {
      appendDiagnosis({ name: null, date: null, comment: null });
    }
  };

  const handleAddProcedure = async () => {
    const lastField = procedures[procedures.length - 1];

    const isValid = await trigger("procedures");

    if (
      isValid &&
      lastField &&
      (lastField.name || lastField.date || lastField.comment)
    ) {
      appendProcedure({ name: null, date: null, comment: null });
    }
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <fieldset className="flex flex-col gap-[16px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <h3 className="text-[24px] font-semibold leading-[36px] border-b border-[#EDEEFA]">
          Стерилізація/кастрація
        </h3>
        <div className={errors?.sterilization__done && "pb-[26px]"}>
          <Controller
            name="sterilization__done"
            control={control}
            render={({ field }) => (
              <BooleanRadio
                {...field}
                name="sterilization__done"
                errorMessage={errors?.sterilization__done?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <Controller
          name="sterilization__date"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              {...field}
              label="Дата проведення"
              selected={field.value}
              onChange={(date) => {
                field.onChange(date);
                trigger("sterilization__date");
              }}
              errorMessage={errors?.sterilization__date?.message}
              lableMargin={false}
            />
          )}
        />
        <Controller
          name="sterilization__comment"
          control={control}
          render={({ field }) => (
            <CommentInput
              {...field}
              label="Рекомендації/коментар"
              placeholder="Залиште рекомендації"
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e);
                trigger("sterilization__comment");
              }}
              errorMessage={errors?.sterilization__comment?.message}
              styles="h-[46px]"
              lableMargin={false}
            />
          )}
        />
      </fieldset>
      <fieldset className="flex flex-col gap-[16px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <h3 className="text-[24px] font-semibold leading-[36px] border-b border-[#EDEEFA]">
          Чіпування
        </h3>
        <div className={errors?.microchipping__done && "pb-[26px]"}>
          <Controller
            name="microchipping__done"
            control={control}
            render={({ field }) => (
              <BooleanRadio
                {...field}
                name="microchipping__done"
                errorMessage={errors?.microchipping__done?.message}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <Controller
          name="microchipping__date"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              {...field}
              label="Дата проведення"
              selected={field.value}
              onChange={(date) => {
                field.onChange(date);
                trigger("microchipping__date");
              }}
              errorMessage={errors?.microchipping__date?.message}
              lableMargin={false}
            />
          )}
        />
        <Controller
          name="microchipping__comment"
          control={control}
          render={({ field }) => (
            <CommentInput
              {...field}
              label="Рекомендації/коментар"
              placeholder="Залиште рекомендації"
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e);
                trigger("microchipping__comment");
              }}
              errorMessage={errors?.microchipping__comment?.message}
              styles="h-[46px]"
              lableMargin={false}
            />
          )}
        />
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <h3 className="h-[36px] text-[24px] font-semibold leading-[36px] border-b border-[#EDEEFA]">
          Вакцинація
        </h3>
        {vaccinationsFields.map((field, index) => {
          return (
            <div key={field.id} className="flex flex-col gap-[8px]">
              <Controller
                name={`vaccinations.${index}.is_vaccinated`}
                control={control}
                render={({ field, fieldState }) => (
                  <BooleanRadio
                    {...field}
                    name={`vaccinations.${index}.is_vaccinated`}
                    errorMessage={fieldState.error?.message}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("vaccinations");
                    }}
                  />
                )}
              />
              <Controller
                name={`vaccinations.${index}.vaccine_type`}
                control={control}
                render={({ field, fieldState }) => (
                  <CommentInput
                    {...field}
                    label="Тип вакцини/препарат"
                    placeholder="Від чого провакциновано та яким препаратом"
                    value={field.value || ""}
                    errorMessage={fieldState.error?.message}
                    styles="h-[66px]"
                  />
                )}
              />
              <Controller
                name={`vaccinations.${index}.date`}
                control={control}
                render={({ field, fieldState }) => (
                  <CustomDatePicker
                    {...field}
                    label="Дата проведення"
                    selected={field.value}
                    onChange={(date) => {
                      field.onChange(date);
                      trigger("vaccinations");
                    }}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name={`vaccinations.${index}.comment`}
                control={control}
                render={({ field, fieldState }) => (
                  <CommentInput
                    {...field}
                    label="Рекомендації/коментар"
                    placeholder="Залиште рекомендації"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("vaccinations");
                    }}
                    errorMessage={fieldState.error?.message}
                    styles="h-[46px]"
                  />
                )}
              />
            </div>
          );
        })}
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <h3 className="h-[36px] text-[24px] font-semibold leading-[36px] border-b border-[#EDEEFA]">
          Хвороби і діагнози
        </h3>
        {diagnosesFields.map((field, index) => {
          const name = `diagnoses.${index}.name`;
          const date = `diagnoses.${index}.date`;
          const comment = `diagnoses.${index}.comment`;

          return (
            <div key={field.id} className="flex flex-col gap-[8px]">
              <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                  <TextInput
                    {...field}
                    label={`Діагноз ${index + 1}`}
                    placeholder="Впишіть діагноз"
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("diagnoses");
                    }}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name={date}
                control={control}
                render={({ field, fieldState }) => (
                  <CustomDatePicker
                    {...field}
                    label="Дата постановки"
                    selected={field.value}
                    onChange={(date) => {
                      field.onChange(date);
                      trigger("diagnoses");
                    }}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name={comment}
                control={control}
                render={({ field, fieldState }) => (
                  <CommentInput
                    {...field}
                    label="Рекомендації/коментар"
                    placeholder="Залиште рекомендації"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("diagnoses");
                    }}
                    errorMessage={fieldState.error?.message}
                    styles="h-[46px]"
                  />
                )}
              />
            </div>
          );
        })}
        <button
          type="button"
          onClick={handleAddDiagnosis}
          className="flex justify-center items-center w-full h-[56px] py-[13px] border-[1px] border-[#4855CC] rounded-[10px] text-[20px] text-[#4855CC] leading-[30px] bg-[#F8F9FD] transition duration-[350ms] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] hover:border-[#B6BBEB] focus:border-[#B6BBEB] hover:text-[#B6BBEB] focus:text-[#B6BBEB]"
        >
          Додати діагноз
        </button>
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <h3 className="h-[36px] text-[24px] font-semibold leading-[36px] border-b border-[#EDEEFA]">
          Процедури
        </h3>
        {proceduresFields.map((field, index) => {
          const name = `procedures.${index}.name`;
          const date = `procedures.${index}.date`;
          const comment = `procedures.${index}.comment`;

          return (
            <div key={field.id} className="flex flex-col gap-[8px]">
              <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                  <TextInput
                    {...field}
                    label={`Процедура ${index + 1}`}
                    placeholder="Впишіть назву проведеної процедури"
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("procedures");
                    }}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name={date}
                control={control}
                render={({ field, fieldState }) => (
                  <CustomDatePicker
                    {...field}
                    label="Дата проведення"
                    selected={field.value}
                    onChange={(date) => {
                      field.onChange(date);
                      trigger("procedures");
                    }}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name={comment}
                control={control}
                render={({ field, fieldState }) => (
                  <CommentInput
                    {...field}
                    label="Рекомендації/коментар"
                    placeholder="Залиште рекомендації"
                    value={field.value || ""}
                    onChange={(e) => {
                      field.onChange(e);
                      trigger("procedures");
                    }}
                    errorMessage={fieldState.error?.message}
                    styles="h-[46px]"
                  />
                )}
              />
            </div>
          );
        })}
        <button
          type="button"
          onClick={handleAddProcedure}
          className="flex justify-center items-center w-full h-[56px] py-[13px] border-[1px] border-[#4855CC] rounded-[10px] text-[20px] text-[#4855CC] leading-[30px] bg-[#F8F9FD] transition duration-[350ms] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] hover:border-[#B6BBEB] focus:border-[#B6BBEB] hover:text-[#B6BBEB] focus:text-[#B6BBEB]"
        >
          Додати процедуру
        </button>
      </fieldset>
    </div>
  );
};
