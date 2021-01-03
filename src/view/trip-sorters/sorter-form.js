import Abstract from "../abstract.js";

const createSorterFormTemplate = (sorterTemplatesHtml) => {
  return `
    <div>
     <h2 class="visually-hidden">Trip events</h2>
     <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sorterTemplatesHtml}
     </form>
    </div>`;
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
