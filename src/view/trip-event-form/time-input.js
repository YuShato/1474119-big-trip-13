import Abstract from "../abstract.js";

const createTimeInputTemplate = (dataElement) => {
  return `<div>
     <label class="visually-hidden" for="${dataElement.id}">${dataElement.name}</label>
     <input class="event__input  event__input--time" id="${dataElement.id}" type="text" name="${dataElement.id}" value="" placeholder="${dataElement.placeholder}">
   </div>`;
};

export default class TimeInput extends Abstract {
  constructor(dataElement) {
    super();
    this._dataElement = dataElement;
  }

  getTemplate() {
    return createTimeInputTemplate(this._dataElement);
  }
}
