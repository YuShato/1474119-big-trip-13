import {createElement} from "../../utils/utils.js";

const createTypeInputTemplate = (dataElement) => {
  const nameToLowerCase = dataElement.name.toLowerCase();
  return `<div class="event__type-item">
  <input id="event-type-${nameToLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${nameToLowerCase}">
  <label class="event__type-label  event__type-label--${nameToLowerCase}" for="event-type-${nameToLowerCase}-1">${dataElement.name}</label>
</div>`;
};

export default class TypeInput {
  constructor(dataElement) {
    this._element = null;
    this._dataElement = dataElement;
  }

  getTemplate() {
    return createTypeInputTemplate(this._dataElement);
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
