import dayjs from "dayjs";

export const getFutureEvents = (data) => data.filter((elem) => (dayjs(elem.endTime) > dayjs()));

export const getPastEvents = (data) => data.filter((elem) => (dayjs(elem.endTime) < dayjs()));

export const getDurationOfTravel = (dates) => {
  const eventMockDataCopy = dates.slice();
  const tripDates = eventMockDataCopy.sort((a, b) => a.startTime.diff(b.startTime, `millisecond`)).map((event) => event.startTime);

  return {
    min: dayjs(tripDates[0]).format(`MMM DD`),
    max: dayjs(tripDates[tripDates.length - 1]).format(`DD MMM`)
  };
};
