import {createElement} from "../../utils/utils.js";

const createCityOptionTemplate = (dataElement) => `<option value="${dataElement}"></option>`;

export default class CityOption {
  constructor(dataElement) {
    this._element = null;
    this._dataElement = dataElement;
  }

  getTemplate() {
    return createCityOptionTemplate(this._dataElement);
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
