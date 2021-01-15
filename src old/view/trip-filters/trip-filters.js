const createTripFiltersTemplate = (filter) => {
  const elementNameLowerCase = filter.name.toLowerCase();
  return `<div class="trip-filters__filter">
  <input id="filter-${elementNameLowerCase}"
    class="trip-filters__filter-input  visually-hidden" type="radio"
    name="trip-filter"
    value="${elementNameLowerCase}" ${filter.isChecked ? `checked` : ``}>
  <label class="trip-filters__filter-label" for="filter-${elementNameLowerCase}">${filter.name}</label>
</div>`;
};

export default class TripFilters {
  constructor(filter) {
    this._element = null;
    this._filter = filter;
  }

  getTemplate() {
    return createTripFiltersTemplate(this._filter);
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
