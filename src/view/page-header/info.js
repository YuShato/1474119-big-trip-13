const createTripInfoTemplate = (cities) => {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${cities[0]} &mdash; ${cities[1]} &mdash; ${cities[2]}</h1>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value"></span>
  </p>
</section>`;
};

export default class TripInfo {
  constructor(cities) {
    this._element = null;
    this._cities = cities;
  }

  getTemplate() {
    return createTripInfoTemplate(this._cities);
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
