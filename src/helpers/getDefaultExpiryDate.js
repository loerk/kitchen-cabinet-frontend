export const addWeeks = (numOfWeeks, date = new Date()) => {
  date.setDate(date.getDate() + numOfWeeks * 7);
  return date.toISOString().substring(0, 10);
};
