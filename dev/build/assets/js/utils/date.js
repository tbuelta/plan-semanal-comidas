import { DAYS_ES } from "../config/constants.js";

export function formatDate(date) {

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;

}

export function getNextWeek() {

  const today = new Date();

  today.setHours(0,0,0,0);

  return Array.from({ length: 7 }, (_, i) => {

    const date = new Date(today);

    date.setDate(today.getDate() + i);

    return {
      date,
      dayName: DAYS_ES[date.getDay()],
      formattedDate: formatDate(date)
    };

  });

}