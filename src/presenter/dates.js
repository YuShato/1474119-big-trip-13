import {RenderPosition, render} from "../utils/render.js";
import TripDates from "../view/trip-dates.js";
import {getDurationOfTravel} from "../utils/filter";

export default class Dates {
  constructor(events) {
    this._events = events;
    this._tripInfoElement = document.querySelector(`.trip-info__main`);
  }

  init() {
    this._renderTripDates(this._events);
  }

  _renderTripDates() {
    this._createdDatesElement = this._tripInfoElement.querySelector(`.trip-info__dates`);
    if (this._createdDatesElement) {
      this._cleanTripDates(this._createdDatesElement);
    }
    render(this._tripInfoElement, new TripDates(getDurationOfTravel(this._events)), RenderPosition.BEFORE_END);
  }

  _cleanTripDates(createdDatesElement) {
    this._createdDatesElement = createdDatesElement;

    this._tripInfoElement.removeChild(this._createdDatesElement);
  }
}
