import {timeGap, humanizeTaskDueTime, humanizeTaskDueDate} from "../../utils/utils.js";
import Abstract from "../abstract.js";

const createTripPointTemplate = (offer) => {
  const {
    city,
    tripEvent,
    totalSum,
    startTime,
    endTime,
    checkedOffers
  } = offer;
  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${startTime}">${humanizeTaskDueDate(startTime)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${tripEvent.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${tripEvent} ${city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${startTime}">${humanizeTaskDueTime(startTime)}</time>
        —
        <time class="event__end-time" datetime="${endTime}">${humanizeTaskDueTime(endTime)}</time>
      </p>
      <p class="event__duration">${timeGap(startTime, endTime)}</p>
    </div>
    <p class="event__price">
      €&nbsp;<span class="event__price-value">${totalSum}</span>
    </p>
    <div class = "trip-offers">
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${checkedOffers}
    </ul>
    </div>
    <button class="event__favorite-btn  event__favorite-btn" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

export default class TripPoint extends Abstract {
  constructor(offer) {
    super();
    this._offer = offer;
    this._clickArrowHandler = this._clickArrowHandler.bind(this);
  }

  _clickArrowHandler(evt) {
    evt.preventDefault();
    this._cb.click();
  }

  setClickArrowHandler(cb) {
    this._cb.click = cb;
    this.getElement()
      .querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, this._clickArrowHandler);
  }

  getTemplate() {
    return createTripPointTemplate(this._offer);
  }
}
