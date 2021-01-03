import Abstract from "../abstract.js";

const createFormPhotoTemplate = (src) => `<img class="event__photo" src="${src}" alt="Event photo">`;

export default class FormPhoto extends Abstract {
  constructor(src) {
    super();
    this._src = src;
  }

  getTemplate() {
    return createFormPhotoTemplate(this._src);
  }
}
