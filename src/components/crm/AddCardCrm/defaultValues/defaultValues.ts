import { TypeAddCardSchema } from "../schemas/addCardSchema";

export const defaultValues: TypeAddCardSchema = {
  name: "",
  origin__arrival_date: null as unknown as string,
  origin__city: "",
  origin__address: null,
  general__animal_type: { id: 0 },
  general__gender: "",
  general__weight: null,
  general__age: null,
  general__specials: null,
  owner__info: null,
  comment__text: null,
  sterilization__done: null,
  sterilization__date: null,
  sterilization__comment: null,
  microchipping__done: null,
  microchipping__date: null,
  microchipping__comment: null,
  media: null,
  locations: [
    {
      location: { id: null, name: null, isCustom: false },
      date_from: "",
      date_to: null,
    },
    {
      location: { id: null, name: null, isCustom: false },
      date_from: "",
      date_to: null,
    },
  ],
  vaccinations: [
    {
      is_vaccinated: false,
      vaccine_type: null,
      date: null,
      comment: null,
    },
  ],
  diagnoses: [
    {
      name: null,
      date: null,
      comment: null,
    },
  ],
  procedures: [
    {
      name: null,
      date: null,
      comment: null,
    },
  ],
};
