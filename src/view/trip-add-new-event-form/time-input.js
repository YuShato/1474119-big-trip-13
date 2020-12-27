const createTimeInputTemplate = (dataElement) => {
  return `<label class="visually-hidden" for="${dataElement.id}">${dataElement.name}</label>
   <input class="event__input  event__input--time" id="${dataElement.id}" type="text" name="${dataElement.id}" value="" placeholder="${dataElement.placeholder}">`;
};

export default class TimeInput {
  constructor(dataElement) {
    this._element = null;
    this._dataElement = dataElement;
  }

  getTemplate() {
    return createTimeInputTemplate(this._dataElement);
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
