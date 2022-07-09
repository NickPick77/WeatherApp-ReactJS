import { useState, useEffect } from "react";

//HOOKS TO GET LOCAL DATE
export const useLocalDate = () => {
  const [currentDate, setCurrentDate] = useState({
    fullDate: undefined,
    day: undefined,
    month: undefined,
    year: undefined,

    fullHour: undefined,
    hour: undefined,
    minute: undefined,
  });

  useEffect(() => {
    const ISOdate = new Date();
    const date = ISOdate.toISOString().split("T");
    const day = `0${date[0].split("-")[2]}`;
    const month = date[0].split("-")[1];
    const year = date[0].split("-")[0];
    const hour = ISOdate.getHours();
    const minute = ISOdate.getMinutes();
    const fullHour = hour + ":0" + minute;
    console.log(date);

    setCurrentDate({
      fullDate: date[0],
      day: day,
      month: month,
      year: year,

      fullHour: fullHour,
      hour: hour,
      minute: minute,
    });
  }, []);

  return currentDate;
};

//HOOK TO GET FORMATTED DATE FROM API
export const useFormattedDate = (APIdate) => {
  const [date, setDate] = useState({
    day: undefined,
    month: undefined,
  });
  const [formattedDate, setFormattedDate] = useState({
    formattedDay: undefined,
    formattedMonth: undefined,
  });

  const formattedDateValue = {
    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  };
  useEffect(() => {
    const dateFromApi = new Date(APIdate);
    const dayName = formattedDateValue.days[dateFromApi.getDay()];
    const monthName = formattedDateValue.months[dateFromApi.getMonth()];
    console.log(dayName);
    setDate({
      day: dayName,
      month: monthName,
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFormattedDate({
      formattedDay: date.day,
      formattedMonth: date.month,
    });
    // eslint-disable-next-line
  }, [date]);

  return formattedDate;
};
