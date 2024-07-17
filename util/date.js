export const getFormattedDate = (date) => {
  return `${date?.getFullYear()}-${(date?.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date?.getDate().toString().padStart(2, "0")}`;
};

export const getDateMinusDays = (date, days) => {
  const resultDate = new Date(date);
  resultDate.setDate(date.getDate() - days);
  return resultDate;
};
