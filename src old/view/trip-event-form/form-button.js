import Abstract from "../abstract.js";

const createFormButtonTemplate = (buttonElement) => `<button class="${buttonElement.class}" type="${buttonElement.type}">${buttonElement.name}</button>`;

export default class FormButton extends Abstract {
  constructor(buttonElement) {
    super();
    this._template = buttonElement;
  }

  getTemplate() {
    return createFormButtonTemplate(this._template);
  }
}
