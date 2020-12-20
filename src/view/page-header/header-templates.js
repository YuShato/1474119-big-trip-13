import {TemplatePosition, render} from "../../utils/utils.js";
import {tripInfoDates} from "./dates.js";
import {getDurationOfTravel} from "../../utils/filter";

const updateTripDates = (dates) => {
  const tripInfoElement = document.querySelector(`.trip-info__main`);
  tripInfoElement.innerHTML = ``;
  render(tripInfoElement, tripInfoDates(getDurationOfTravel(dates)), TemplatePosition.BEFORE_END);
};

export {
  updateTripDates
};
