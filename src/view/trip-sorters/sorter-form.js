import {createElement} from "../../utils/utils.js";

const createSorterFormTemplate = (sorterTemplatesHtml) => {
  return `
    <div>
     <h2 class="visually-hidden">Trip events</h2>
     <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sorterTemplatesHtml}
     </form>
    </div>`;
};

export default class SorterForm {
  constructor(sorterTemplatesHtml) {
    this._element = null;
    this._sorterTemplatesHtml = sorterTemplatesHtml;
  }

  getTemplate() {
    return createSorterFormTemplate(this._sorterTemplatesHtml);
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
