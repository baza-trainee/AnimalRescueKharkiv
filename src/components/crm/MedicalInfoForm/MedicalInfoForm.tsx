import { Control, Controller, FieldErrors } from "react-hook-form";
import { TypeAddCardSchema } from "../AddCardCrm/addCardSchema";
import { RadioInput } from "../../ui/inputs/RadioInput";
import { CustomDatePicker } from "../../ui/CustomDatePicker/CustomDatePicker";
import { CommentInput } from "../AddCardForm/inputs/CommentInput";

interface PropsMedicalInfoForm {
  control: Control<any>;
  errors: FieldErrors<TypeAddCardSchema>;
}

export const MedicalInfoForm: React.FC<PropsMedicalInfoForm> = ({
  control,
  errors,
}) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <fieldset className="flex flex-col gap-[16px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <h3 className="text-[24px] font-semibold leading-[36px] border-b border-[#EDEEFA]">
          Стерилізація/кастрація
        </h3>
        <div className={errors?.sterilization__done && "pb-[26px]"}>
          <div className="text-[18px] font-medium leading-[27px]">
            <span
              className={`block mb-[8px] ${
                !!errors.sterilization__done?.message
                  ? "text-[#B00000]"
                  : "text-[#212833]"
              }`}
            >
              Проведено?
            </span>
            <Controller
              name="sterilization__done"
              control={control}
              render={({ field }) => (
                <div className="flex">
                  <RadioInput
                    {...field}
                    label="Так"
                    name="sterilization__done"
                    value={true}
                    onChange={field.onChange}
                    errorMessage={errors?.sterilization__done?.message}
                  />
                  <RadioInput
                    {...field}
                    label="Ні"
                    name="sterilization__done"
                    value={false}
                    onChange={field.onChange}
                    errorMessage={errors?.sterilization__done?.message}
                  />
                </div>
              )}
            />
          </div>
        </div>
        <div className={errors?.sterilization__date && "pb-[26px]"}>
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
        </div>
        <div className={errors?.sterilization__comment?.message && "pb-[26px]"}>
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
        </div>
      </fieldset>
    </div>
  );
};
