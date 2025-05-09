import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { TextInput } from "../../ui/inputs/TextInput";
import { NumberInput } from "../../ui/inputs/NumberInput";
import { CommentInput } from "../../ui/inputs/CommentInput";
import { CustomDatePicker } from "../../ui/inputs/CustomDatePicker";
import { AnimalTypesPopup } from "../../ui/popUp/AnimalTypesPopup";
import { GendersPopup } from "../../ui/popUp/GendersPopup";
import { LocationsPopup } from "../../ui/popUp/LocationsPopup";

const BasicInfo = () => {
  const { control, trigger } = useFormContext();

  const { fields: locationsFields, append: appendLocation } = useFieldArray({
    control,
    name: "locations",
  });

  const locations = useWatch({ control, name: "locations" });

  const handleAddLocation = async () => {
    const lastIndex = locations.length - 1;
    const lastField = locations[lastIndex];

    const hasLocation =
      !!lastField?.location?.id || !!lastField?.location?.name;
    const hasDateFrom = !!lastField?.date_from;
    const hasDateTo = !!lastField?.date_to;
    const hasBothDates = hasDateFrom && hasDateTo;
    const validDateOrder =
      hasBothDates && lastField.date_to >= lastField.date_from;

    const isValid = await trigger("locations");

    if (
      isValid &&
      (hasLocation || hasDateFrom || hasDateTo || validDateOrder)
    ) {
      appendLocation({
        location: { id: null, name: null },
        date_from: "",
        date_to: null,
      });
    }
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <fieldset className="flex flex-col gap-[8px] p-[12px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <Controller
          name="origin__arrival_date"
          control={control}
          render={({ field, fieldState }) => (
            <CustomDatePicker
              {...field}
              label="Дата прибуття*"
              selected={field.value}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="origin__city"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              label="Звідки (місто)*"
              placeholder="Введіть назву міста"
              errorMessage={fieldState.error?.message}
              className="bg-transparent"
              {...field}
            />
          )}
        />
        <Controller
          name="origin__address"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              label="Адреса"
              placeholder="Введіть назву вулиці та номер будинку"
              value={field.value ?? ""}
              errorMessage={fieldState.error?.message}
              className="bg-transparent"
            />
          )}
        />
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <Controller
          name="general__animal_type.id"
          control={control}
          render={({ field, fieldState }) => (
            <AnimalTypesPopup
              onChange={field.onChange}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="general__gender"
          control={control}
          render={({ field, fieldState }) => (
            <GendersPopup
              onChange={field.onChange}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="general__weight"
          control={control}
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Вага тварини"
              placeholder="Введіть вагу"
              value={field.value}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="general__age"
          control={control}
          render={({ field, fieldState }) => (
            <NumberInput
              {...field}
              label="Вік тварини"
              placeholder="Введіть вік"
              value={field.value}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="general__specials"
          control={control}
          render={({ field, fieldState }) => (
            <CommentInput
              {...field}
              label="Особливі прикмети"
              placeholder="Напишіть особливі прикмети"
              value={field.value ?? ""}
              errorMessage={fieldState.error?.message}
              initialHeight="45px"
            />
          )}
        />
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <Controller
          name="locations.0.location"
          control={control}
          render={({ field, fieldState }) => (
            <LocationsPopup
              label="Поточна локація*"
              onChange={(location) => {
                if (location.id) {
                  field.onChange({
                    id: location.id,
                    name: location.name,
                    isCustom: false,
                  });
                } else {
                  field.onChange({
                    id: null,
                    name: location.name,
                    isCustom: true,
                  });
                }
                trigger("locations");
              }}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
        <Controller
          name="locations.0.date_from"
          control={control}
          render={({ field, fieldState }) => (
            <CustomDatePicker
              {...field}
              label="З"
              selected={field.value || null}
              onChange={(date) => {
                field.onChange(date);
                trigger("locations");
              }}
              errorMessage={fieldState.error?.message}
              labelStyles="font-normal text-[14px]"
            />
          )}
        />

        <h3 className="text-[18px] text-[#212833] font-medium leading-[27px] mt-4">
          Історія переміщень
        </h3>

        {locationsFields.slice(1).map((field, index) => {
          const locIndex = index + 1;
          const location = `locations.${locIndex}.location`;
          const date_from = `locations.${locIndex}.date_from`;
          const date_to = `locations.${locIndex}.date_to`;

          return (
            <div key={field.id}>
              <Controller
                name={location}
                control={control}
                render={({ field, fieldState }) => (
                  <LocationsPopup
                    label={`Локація ${locIndex}`}
                    onChange={(location) => {
                      if (location.id) {
                        field.onChange({
                          id: location.id,
                          name: location.name,
                          isCustom: false,
                        });
                      } else {
                        field.onChange({
                          id: null,
                          name: location.name,
                          isCustom: true,
                        });
                      }
                      trigger("locations");
                    }}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />

              <div className="flex gap-[16px]">
                <div className="flex-grow w-[151px]">
                  <Controller
                    name={date_from}
                    control={control}
                    render={({ field, fieldState }) => (
                      <CustomDatePicker
                        {...field}
                        label="З"
                        selected={field.value || null}
                        onChange={(date) => {
                          field.onChange(date);
                          trigger("locations");
                        }}
                        errorMessage={fieldState.error?.message}
                        labelStyles="font-normal text-[14px]"
                      />
                    )}
                  />
                </div>
                <div className="flex-grow w-[151px]">
                  <Controller
                    name={date_to}
                    control={control}
                    render={({ field, fieldState }) => (
                      <CustomDatePicker
                        {...field}
                        label="По"
                        selected={field.value || null}
                        onChange={(date) => {
                          field.onChange(date);
                          trigger("locations");
                        }}
                        errorMessage={fieldState.error?.message}
                        labelStyles="font-normal text-[14px]"
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          );
        })}
        <button
          type="button"
          onClick={handleAddLocation}
          className="flex justify-center items-center w-full h-[56px] py-[13px] border-[1px] border-[#4855CC] rounded-[10px] text-[20px] text-[#4855CC] leading-[30px] bg-[#F8F9FD] transition duration-[350ms] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] hover:border-[#B6BBEB] focus:border-[#B6BBEB] hover:text-[#B6BBEB] focus:text-[#B6BBEB]"
        >
          Додати локацію
        </button>
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px]">
        <Controller
          name="owner__info"
          control={control}
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              label="Інформація про власника"
              placeholder="Введіть інформацію"
              value={field.value ?? "Відсутня"}
              errorMessage={fieldState.error?.message}
              className="bg-transparent"
            />
          )}
        />
      </fieldset>
      <fieldset className="flex flex-col gap-[8px] px-[12px] py-[8px] shadow-[4px_4px_10px_0px_#B6BBEB4D,_-4px_-4px_10px_0px_#B6BBEB4D] rounded-[10px] mb-[16px]">
        <Controller
          name="comment__text"
          control={control}
          render={({ field, fieldState }) => (
            <CommentInput
              {...field}
              label="Загальний коментар"
              placeholder="Додайте інформацію, яку вважаєте важливою"
              value={field.value ?? ""}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
      </fieldset>
    </div>
  );
};

export default BasicInfo;
