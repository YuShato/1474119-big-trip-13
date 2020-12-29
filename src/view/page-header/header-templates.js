import {RenderPosition, render} from "../../utils/utils.js";
import TripDates from "./dates.js";
import {getDurationOfTravel} from "../../utils/filter";

const updateTripDates = (dates) => {
  const tripInfoElement = document.querySelector(`.trip-info__main`);
  const createdDatesElement = tripInfoElement.querySelector(`.trip-info__dates`);
  if (createdDatesElement) {
    tripInfoElement.removeChild(createdDatesElement);
  }
  render(tripInfoElement, new TripDates(getDurationOfTravel(dates)).getElement(), RenderPosition.BEFORE_END);
};

export {
  updateTripDates
};
