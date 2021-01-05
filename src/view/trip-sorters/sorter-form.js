import Abstract from "../abstract.js";

const createSorterFormTemplate = (sorterTemplatesHtml) => {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
     <h2 class="visually-hidden">Trip events</h2>
      ${sorterTemplatesHtml}
     </form>`;
};

export default class SorterForm extends Abstract {
  constructor(sorterTemplatesHtml) {
    super();
    this._sorterTemplatesHtml = sorterTemplatesHtml;
  }

  getTemplate() {
    return createSorterFormTemplate(this._sorterTemplatesHtml);
  }
}
