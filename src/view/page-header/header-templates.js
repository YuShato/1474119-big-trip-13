import {RenderPosition, renderTemplate} from "../../utils/utils.js";
import {createTripDatesTemplate} from "./dates.js";
import {getDurationOfTravel} from "../../utils/filter";

const updateTripDates = (dates) => {
  const tripInfoElement = document.querySelector(`.trip-info__main`);
  tripInfoElement.innerHTML = ``;
  renderTemplate(tripInfoElement, createTripDatesTemplate(getDurationOfTravel(dates)), RenderPosition.BEFORE_END);
};

export {
  updateTripDates
};
