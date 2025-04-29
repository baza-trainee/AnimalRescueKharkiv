export interface Animal {
    id: string;
    name: string;
    origin: {
        origin__arrival_date: string | null;
        origin__city: string;
        origin__address: string;
    };
    general: {
        general__gender: "male" | "female" | "";
        general__animal_type: {
            id: string; 
            name : string;
            };
    };
    current_location: {
                location:{
                    name: string;
                }
    };
    death:{
        death__dead: boolean;
    }

    microchipping:{
        microchipping__date: string | null;
        microchipping__done: boolean;
    }

    sterilization:{
        sterilization__date: string | null;
        sterilization__done: boolean;
    }

    vaccinations: Vaccination[];

    media?: {
        uri: string;
    }[];
}

interface Vaccination {
  id: string;
  animal_id: string;
  is_vaccinated: boolean;
  comment?: string;
  date?: string;
  vaccine_type?: string;
}