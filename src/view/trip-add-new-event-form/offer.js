const createOfferTemplate = (dataElement) => {
  return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${dataElement.id}" type="checkbox" name="${dataElement.idName}" ${dataElement.isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="${dataElement.id}">
         <span class="event__offer-title">${dataElement.name}</span>
         +€&nbsp;
         <span class="event__offer-price">${dataElement.price}</span>
      </label>
  </div>`;
};


export default class Offer {
  constructor(dataElement) {
    this._element = null;
    this._dataElement = dataElement;
  }

  getTemplate() {
    return createOfferTemplate(this._dataElement);
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
