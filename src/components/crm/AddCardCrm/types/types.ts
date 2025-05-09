import { TypeAddCardSchema } from "../schemas/addCardSchema";

export interface Location {
  id: number | null;
  name: string | null;
  isCustom: boolean;
}

export interface AnimalTypes {
  id: number;
  name: string;
}

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
} as const;

export type AddCardFormValues = typeof defaultValues;

export type AnimalCard = {
  id: string;
  name: string;
  created_at: string;
  created_by: string;
  updated_at: string;
  updated_by: string;
  editable_attributes: string[];
  origin: {
    origin__arrival_date: string;
    origin__city: string;
  };
  general: {
    general__animal_type_id: number;
    general__gender: string;
    general__weight: number;
    general__age: number;
    general__animal_type: {
      id: number;
      name: string;
    };
  };
  current_location: {
    id: string;
    animal_id: string;
    location: {
      id: string;
      name: string;
    };
    date_from: string;
    date_to: string | null;
  };
  locations: Array<{
    id: string;
    location: { id: string; name: string };
    date_from: string;
    date_to: string | null;
  }>;
  media: Array<any>;
  microchipping: { microchipping__done: boolean };
  sterilization: { sterilization__done: boolean };
  death: { death__dead: boolean };
  owner: Record<string, any>;
  adoption: Record<string, any>;
  comment: Record<string, any>;
  vaccinations: Array<any>;
};
