export const getFormattedDate = (date) => {
  return date.toISOString().slice(0, 10);
};

export const getDateMinusDays = (date, days) => {
  const resultDate = new Date(date);
  resultDate.setDate(date.getDate() - days);
  return resultDate;
};
