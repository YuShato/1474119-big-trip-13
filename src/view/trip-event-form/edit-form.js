import Abstract from "../abstract.js";
import {editFormPartsTemplate} from "./form-templates.js";

const createEditFormTemplate = (point) => {
  const editFormTemplate = editFormPartsTemplate(point);
  const {
    id,
    city,
    tripEvent,
    startTime,
    endTime,
    types,
    offers,
    cities,
    price,
    description,
    photos
  } = editFormTemplate;

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${tripEvent}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="${id}" type="checkbox">

                     <div class="event__type-list">
                      <fieldset class="event__type-group">
                        <legend class="visually-hidden">Event type</legend>
                        ${types}
                      </fieldset>
                    </div>
                  </div>

                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">
                      ${tripEvent}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-${id}" type="text" name="event-destination" value="${city}" list="destination-list-${id}">
                    <datalist id="destination-list-${id}">
                      ${cities}
                    </datalist>
                  </div>

                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-${id}">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-${id}" type="text" name="event-start-time" value="${startTime}">
                    —
                    <label class="visually-hidden" for="event-end-time-${id}">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-${id}" type="text" name="event-end-time" value="${endTime}">
                  </div>

                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      €
                    </label>
                    <input class="event__input  event__input--price" id="event-price-${id}" type="text" name="event-price" value="${price}">
                  </div>

                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>

                    <div class="event__available-offers">
                      ${offers}
                    </div>
                  </section>

                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photos}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
};

export default class EditForm extends Abstract {
  constructor(point) {
    super();
    this._point = point;
    this._submitHandler = this._submitHandler.bind(this);
    this._clickArrowHandler = this._clickArrowHandler.bind(this);
  }

  _submitHandler(evt) {
    evt.preventDefault();
    this._cb.submit();
  }

  _clickArrowHandler(evt) {
    evt.preventDefault();
    this._cb.click();
  }

  setSubmitHandler(cb) {
    this._cb.submit = cb;
    this.getElement().addEventListener(`submit`, this._submitHandler);
  }

  setClickArrowHandler(cb) {
    this._cb.click = cb;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickArrowHandler);
  }

  getTemplate() {
    return createEditFormTemplate(this._point);
  }
}
