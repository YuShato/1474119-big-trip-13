const createTripControlsTemplate = () => {
  return `<h2 class="visually-hidden">Switch trip view</h2>
  <nav class="trip-controls__trip-tabs  trip-tabs">
  <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
  <a class="trip-tabs__btn" href="#">Stats</a>
</nav>`;
};

export default class SiteMenuControls {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripControlsTemplate();
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