import Abstract from "../abstract.js";

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

export default class Offer extends Abstract {
  constructor(dataElement) {
    super();
    this._dataElement = dataElement;
  }

  getTemplate() {
    return createOfferTemplate(this._dataElement);
  }
}
