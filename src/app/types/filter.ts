type FiltersType = {
        search: string;
        id: string;
        name: string;
        date: Date | null;
        fromCity: string;
        animal_type: string;
        gender: "male" | "female" | "";
        current_location: string;
        animal_status: boolean | "";
        microchipping: boolean | "";
        microchipping_date: Date | null;
        sterilization: boolean | "";
        sterilization_date: Date | null;
        vaccination: boolean | "";
        vaccination_date: Date | null;
};
