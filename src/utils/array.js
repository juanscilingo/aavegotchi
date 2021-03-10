import { isSameDay, startOfDay } from "date-fns";

export const groupByDay = data => {
  const groups = data.reduce((acc, d) => {
    const date = startOfDay(new Date(d.time * 1000));
    const existing_day = acc.find(d => isSameDay(d.date, date));
    if (existing_day)
      existing_day.values.push(d);
    else
      acc.push({ date, values: [d] });

    return acc;
  }, []);

  groups.sort((a, b) => a.date - b.date);

  return groups;
}