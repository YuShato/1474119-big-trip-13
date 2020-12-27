const createSorterFormTemplate = (sorterTemplatesHtml) => {
  return `<h2 class="visually-hidden">Trip events</h2>
   <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sorterTemplatesHtml}
   </form>`;
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
      this._element = this.getTemplate();
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
