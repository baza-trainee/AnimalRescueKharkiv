export const cleanString = (field: string | null) => {
  return field?.trim().replace(/\s+/g, " ");
};
