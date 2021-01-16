import Abstract from "../abstract.js";

const createTypeInputTemplate = (dataElement) => {
  const nameToLowerCase = dataElement.name.toLowerCase();
  return `<div class="event__type-item">
  <input id="event-type-${nameToLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${nameToLowerCase}">
  <label class="event__type-label  event__type-label--${nameToLowerCase}" for="event-type-${nameToLowerCase}-1">${dataElement.name}</label>
</div>`;
};

export default class TypeInput extends Abstract {
  constructor(dataElement) {
    super();
    this._dataElement = dataElement;
  }

  getTemplate() {
    return createTypeInputTemplate(this._dataElement);
  }
}
