export const dateConverter = (date) => {
  const ukDate = date.toLocaleString("en-GB", { timeZone: "UTC" });

  const [pullDate, pullTime] = [
    ukDate.split("T")[0],
    ukDate.split("T")[1].split(".")[0],
  ];
  const [year, month, day] = [
    pullDate.split("-")[0],
    pullDate.split("-")[1],
    pullDate.split("-")[2],
  ];

  return `${day}/${month}/${year} ${pullTime}`;
};
