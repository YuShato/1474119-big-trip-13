import Abstract from "../abstract.js";

const createTripFilterTemplate = (filtersHtml) => {
  return `<form class="trip-filters" action="#" method="get">
   ${filtersHtml}
   <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};

export default class TripFilter extends Abstract {
  constructor(filtersHtml) {
    super();
    this._filtersHtml = filtersHtml;
  }

  getTemplate() {
    return createTripFilterTemplate(this._filtersHtml);
  }
}
