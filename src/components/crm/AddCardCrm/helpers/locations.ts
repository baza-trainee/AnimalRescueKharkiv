import { parse } from "date-fns";
import { AddCardFormValues } from "../../AddCardForm";

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
