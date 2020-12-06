import dayjs from 'dayjs';
import {currentMockArray, today} from "./data.js";

const filteredFuturetArray = currentMockArray.filter((elem) => {
  return (dayjs(elem.endTime) > dayjs(today));
});

const filteredPastArray = currentMockArray.filter((elem) => {
  return (dayjs(elem.endTime) < dayjs(today));
});

const sortEventsByDate = () => {
  const allDates = document.querySelectorAll(`.event__date`);
  const dateArray = [];
  for (let i = 0; i < allDates.length; i++) {
    dateArray.push(dayjs(allDates[i].textContent).toDate());
  }
  let allDatesFilter = dateArray.sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1));

  return {
    min: dayjs(allDatesFilter[0]).format(`MMM DD`),
    max: dayjs(allDatesFilter[allDatesFilter.length - 1]).format(`DD MMM`)
  };
};


export {
  filteredPastArray,
  filteredFuturetArray,
  sortEventsByDate
};