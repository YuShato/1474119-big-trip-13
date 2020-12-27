const createFormPhotoTemplate = (src) => `<img class="event__photo" src="${src}" alt="Event photo">`;

export default class FormPhoto {
  constructor(src) {
    this._element = null;
    this._src = src;
  }

  getTemplate() {
    return createFormPhotoTemplate(this._src);
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
