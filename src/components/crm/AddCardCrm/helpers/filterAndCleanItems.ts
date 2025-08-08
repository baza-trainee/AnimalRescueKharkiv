import { cleanString } from "./fieldFormatters";

export const filterAndCleanItems = (array: Array<any>) => {
  return array
    .filter((item) => item.name || item.date || item.comment)
    .map((item) => {
      return {
        ...item,
        name: item.name ? cleanString(item.name) : null,
        date: item.date ?? null,
        comment: item.comment ? cleanString(item.comment) : null,
      };
    });
};
