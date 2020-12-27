const createAddFormTemplate = (template) => {
  return `<form class="event event--edit" action="#" method="post">
  <header class="event__header">
    ${template.types}
    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        Flight
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
      <datalist id="destination-list-1">
        ${template.cities}
      </datalist>
    </div>

    <div class="event__field-group  event__field-group--time">
      ${template.time}
    </div>
      ${template.price}
      ${template.buttons}
  </header>
  <section class="event__details">
    <section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
       ${template.offers}
      </div>
    </section>

    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description">
        ${template.description}
      </p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${template.photos}
        </div>
      </div>
    </section>
  </section>
</form>`;
};

export default class AddForm {
  constructor(template) {
    this._element = null;
    this._template = template;
  }

  getTemplate() {
    return createAddFormTemplate(this._template);
  }

  getElement() {
    if (!this._element) {
      this._element = this.getTemplate();
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}