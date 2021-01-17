import dayjs from "dayjs";
import {TRIP_INFO_END_DATE_FORMAT, TRIP_INFO_START_DATE_FORMAT} from "../const.js";

export const getDurationOfTravel = (dates) => {
  const eventMockDataCopy = dates.slice();
  const tripDates = eventMockDataCopy.sort((a, b) => a.startTime.diff(b.startTime, `millisecond`)).map((event) => event.startTime);

  return {
    min: dayjs(tripDates[0]).format(TRIP_INFO_END_DATE_FORMAT),
    max: dayjs(tripDates[tripDates.length - 1]).format(TRIP_INFO_START_DATE_FORMAT)
  };
};

export const getFutureEvents = (data) => data.filter((elem) => (dayjs(elem.startTime) > dayjs()));

export const getPastEvents = (data) => data.filter((elem) => (dayjs(elem.endTime) < dayjs()));
