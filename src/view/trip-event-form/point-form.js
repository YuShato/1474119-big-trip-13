import Abstract from "../abstract.js";

const createAddFormTemplate = (template) => {
  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
      ${template ? template.tripEvent : `Flight`}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${template ? template.city : ``}" list="destination-list-1">
    </div>
    <div class="event__field-group  event__field-group--time"></div>
    <div class="event__field-group  event__field-group--price"></div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__favorite-btn event__favorite-btn" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">
      </p>

      <div class="event__photos-container">
      </div>
    </section>
  </section>
</form>`;
};

export default class PointForm extends Abstract {
  constructor(template) {
    super();
    this._template = template;
    this._submitHandler = this._submitHandler.bind(this);
    this._clickArrowHandler = this._clickArrowHandler.bind(this);
    this._deleteButtonHandler = this._deleteButtonHandler.bind(this);
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

  setDeleteButtonHandler(cb) {
    this._cb.clickDelete = cb;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._deleteButtonHandler);
  }

  _deleteButtonHandler(evt) {
    evt.preventDefault();
    this._cb.clickDelete();
  }

  getTemplate() {
    return createAddFormTemplate(this._template);
  }
}
