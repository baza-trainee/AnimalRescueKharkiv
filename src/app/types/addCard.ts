import { TypeAddCardSchema } from "../../components/crm/AddCardCrm/schemas/addCardSchema";

export interface Location {
  id: number | null;
  name: string | null;
  isCustom: boolean;
}

export interface AnimalTypes {
  id: number;
  name: string;
}

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
