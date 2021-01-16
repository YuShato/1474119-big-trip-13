import Abstract from "./abstract.js";

const createTripDatesTemplate = (dates) => `<p class="trip-info__dates">${dates.min}&nbsp;&mdash;&nbsp;${dates.max}</p>`;

export default class TripDates extends Abstract {
  constructor(dates) {
    super();
    this._dates = dates;
  }

  getTemplate() {
    return createTripDatesTemplate(this._dates);
  }
}
