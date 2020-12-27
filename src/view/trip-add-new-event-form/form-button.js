const createFormButtonTemplate = (buttonElement) => `<button class="${buttonElement.class}" type="${buttonElement.type}">${buttonElement.name}</button>`;

export default class FormButton {
  constructor(buttonElement) {
    this._element = null;
    this._template = buttonElement;
  }

  getTemplate() {
    return createFormButtonTemplate(this._template);
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
