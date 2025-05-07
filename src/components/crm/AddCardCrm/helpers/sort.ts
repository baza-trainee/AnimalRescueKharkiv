import { format, parse } from "date-fns";

export const sortDiagnosesOrProcedures = (array: Array<any>) => {
  return array
    .filter((item) => item.name || item.date || item.comment)
    .map((item) => ({
      ...item,
      date: item.date
        ? parse(String(item.date), "dd/MM/yyyy", new Date())
        : null,
    }))
    .sort((a, b) => {
      if (a.date && b.date) {
        return a.date.getTime() - b.date.getTime();
      }

      if (a.date) return -1;

      if (b.date) return 1;

      return 0;
    })
    .map((item) => ({
      ...item,
      date: item.date ? format(item.date, "dd/MM/yyyy") : null,
    }));
};
