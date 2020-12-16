import dayjs from 'dayjs';
import {eventMockData, today} from "./data.js";

const filteredFuturetArray = eventMockData.filter((elem) => (dayjs(elem.endTime) > dayjs(today)));

const filteredPastArray = eventMockData.filter((elem) => (dayjs(elem.endTime) < dayjs(today)));

const sortEventsByDate = () => {
  const eventMockDataCopy = eventMockData.slice();
  const tripDates = eventMockDataCopy.sort((a, b) => a.startTime.diff(b.startTime, `millisecond`)).map((event) => event.startTime);

  return {
    min: dayjs(tripDates[0]).format(`MMM DD`),
    max: dayjs(tripDates[tripDates.length - 1]).format(`DD MMM`)
  };
};

export {
  filteredPastArray,
  filteredFuturetArray,
  sortEventsByDate
};
