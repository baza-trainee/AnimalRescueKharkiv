import { Control, Controller, FieldErrors } from "react-hook-form";
import { TypeAddCardSchema } from "./addCardSchema";
import { RadioInput } from "../../ui/inputs/RadioInput";
import { CustomDatePicker } from "../../ui/CustomDatePicker/CustomDatePicker";
import { CommentInput } from "./inputs/CommentInput";
import { BooleanRadio } from "./BooleanRadio";

interface PropsMedicalInfoForm {
  control: Control<any>;
  errors: FieldErrors<TypeAddCardSchema>;
}

interface Vaccination {
  is_vaccinated: boolean;
  vaccine_type: string;
  date: string;
  comment?: string;
}

export const MedicalInfoForm: React.FC<PropsMedicalInfoForm> = ({
  control,
  errors,
  defaultValues,
}) => {
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
              onChange={(date) => field.onChange(date)}
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
              onChange={(date) => field.onChange(date)}
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
              errorMessage={errors?.microchipping__comment?.message}
              styles="h-[46px]"
              lableMargin={false}
            />
          )}
        />
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <h3 className="text-[24px] font-semibold leading-[36px] border-b border-[#EDEEFA]">
          Вакцинація
        </h3>
        {defaultValues.vaccinations.map((item: Vaccination, index: number) => {
          return (
            <div key={index} className="flex flex-col gap-[8px]">
              <Controller
                name={`vaccinations[${index}].is_vaccinated`}
                control={control}
                render={({ field, fieldState }) => (
                  <BooleanRadio
                    {...field}
                    name={`vaccinations[${index}].is_vaccinated`}
                    errorMessage={fieldState.error?.message}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name={`vaccinations[${index}].vaccine_type`}
                control={control}
                render={({ field, fieldState }) => (
                  <CommentInput
                    {...field}
                    label="Тип вакцини/препарат"
                    placeholder="Від чого провакциновано та яким препаратом"
                    errorMessage={fieldState.error?.message}
                    styles="h-[66px]"
                  />
                )}
              />
              <Controller
                name={`vaccinations[${index}].date`}
                control={control}
                render={({ field, fieldState }) => (
                  <CustomDatePicker
                    {...field}
                    label="Дата проведення"
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name={`vaccinations[${index}].comment`}
                control={control}
                render={({ field, fieldState }) => (
                  <CommentInput
                    {...field}
                    label="Рекомендації/коментар"
                    placeholder="Залиште рекомендації"
                    errorMessage={fieldState.error?.message}
                    styles="h-[46px]"
                  />
                )}
              />
            </div>
          );
        })}
      </fieldset>
    </div>
  );
};
