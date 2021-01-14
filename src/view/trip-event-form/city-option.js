import Abstract from "../abstract.js";

const createCityOptionTemplate = (dataElement) => `<option value="${dataElement}"></option>`;

export default class CityOption extends Abstract {
  constructor(dataElement) {
    super();
    this._dataElement = dataElement;
  }

  getTemplate() {
    return createCityOptionTemplate(this._dataElement);
  }
}
