import { parse } from "date-fns";
import { AddCardFormValues, Location } from "../../AddCardForm";


export type FormLocationItem = {
  location: Location;
};

export type CreateLocationFn = (name: string) => Promise<Location>;

export const getCleanLocations = (
  locations: AddCardFormValues["locations"]
) => {
  const cleaned = locations?.filter((location, index) => {
    const hasLocation = !!location.location?.id || !!location.location?.name;
    const hasDateFrom = !!location.date_from;
    const hasDateTo = !!location.date_to;

    return index === 0 || hasLocation || hasDateFrom || hasDateTo;
  });

  return cleaned
    ?.sort((a, b) => {
      const dateA = parse(String(a.date_from || ""), "dd/MM/yyyy", new Date());
      const dateB = parse(String(b.date_from || ""), "dd/MM/yyyy", new Date());

      return dateB.getTime() - dateA.getTime();
    })
    .map((location) => {
      if (location.location.isCustom && location.location.name) {
        return {
          location: { name: location.location.name },
          date_from: location.date_from,
          date_to: location.date_to,
        };
      } else {
        return {
          location: { id: location.location.id },
          date_from: location.date_from,
          date_to: location.date_to,
        };
      }
    });
};

export const prepareLocations = async (
  formLocations: FormLocationItem[],
  locationsData: Location[],
  createLocation: CreateLocationFn
): Promise<FormLocationItem[]> => {
  try {
    const cleanedLocations = getCleanLocations(formLocations) ?? [];
    const createdLocationsMap = new Map();

    for (const item of cleanedLocations) {
      const location = item.location;
      const nameKey = location?.name?.trim().toLowerCase();

      if (location?.id || !nameKey || createdLocationsMap.has(nameKey))
        continue;

      const existing = locationsData.find(
        (loc) => loc?.name?.trim().toLowerCase() === nameKey
      );

      if (existing) {
        createdLocationsMap.set(nameKey, existing);
      } else {
        if (!location.name) continue;

        const created = await createLocation(location.name);
        createdLocationsMap.set(nameKey, created);
      }
    }

    return cleanedLocations.map((item) => {
      const location = item.location;
      const nameKey = location?.name?.trim().toLowerCase();

      if (location.id || !nameKey) return item;

      const resolvedLocations = createdLocationsMap.get(nameKey);
      return {
        ...item,
        location: resolvedLocations ?? location,
      };
    });
  } catch (error) {
    throw error;
  }
};
