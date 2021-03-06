import Abstract from "./abstract.js";

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

export default class TripInfo extends Abstract {
  constructor(cities) {
    super();
    this._cities = cities;
  }

  getTemplate() {
    return createTripInfoTemplate(this._cities);
  }
}
