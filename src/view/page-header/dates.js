import {createElement} from "../../utils/utils.js";

const createTripDatesTemplate = (dates) => `<p class="trip-info__dates">${dates.min}&nbsp;&mdash;&nbsp;${dates.max}</p>`;

export default class TripDates {
  constructor(dates) {
    this._element = null;
    this._dates = dates;
  }

  getTemplate() {
    return createTripDatesTemplate(this._dates);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
