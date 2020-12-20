import dayjs from 'dayjs';
import {eventMockData} from "../mock/data.js";
import {updateTripDates} from "../view/page-header/header-templates.js";
import {renderEvents} from "../view/trip-event/event-template.js";

const siteEventElement = document.querySelector(`.trip-events`);

const getFutureEvents = (data) => data.filter((elem) => (dayjs(elem.endTime) > dayjs()));

const getPastEvents = (data) => data.filter((elem) => (dayjs(elem.endTime) < dayjs()));

const getDurationOfTravel = (dates) => {
  const eventMockDataCopy = dates.slice();
  const tripDates = eventMockDataCopy.sort((a, b) => a.startTime.diff(b.startTime, `millisecond`)).map((event) => event.startTime);

  return {
    min: dayjs(tripDates[0]).format(`MMM DD`),
    max: dayjs(tripDates[tripDates.length - 1]).format(`DD MMM`)
  };
};

const updateTripEvents = (data) => {
  siteEventElement.appendChild(renderEvents(data));
  updateTripDates(data);
};

const onChangeTimeFilter = () => {
  const tripFilterElements = document.querySelector(`.trip-filters`);
  tripFilterElements.addEventListener(`click`, (evt) => {
    switch (evt.target.value) {
      case `past`:
        updateTripEvents(getPastEvents(eventMockData));
        break;
      case `future`:
        updateTripEvents(getFutureEvents(eventMockData));
        break;
      default:
        updateTripEvents(eventMockData);
    }
  });
};

export {
  updateTripEvents,
  getDurationOfTravel,
  onChangeTimeFilter
};
