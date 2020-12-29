import {createElement} from "../../utils/utils.js";

const createTripFilterTemplate = (filtersHtml) => {
  return `<form class="trip-filters" action="#" method="get">
   ${filtersHtml}
   <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class TripFilter {
  constructor(filtersHtml) {
    this._element = null;
    this._filtersHtml = filtersHtml;
  }

  getTemplate() {
    return createTripFilterTemplate(this._filtersHtml);
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
