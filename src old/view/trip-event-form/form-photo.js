import Abstract from "../abstract.js";

const createFormPhotoTemplate = (pointPhotos) => {
  return `<div class="event__photos-tape">
    ${pointPhotos.map((pointPhoto) => `<img class="event__photo" src="${pointPhoto.src}" alt="${pointPhoto.description}">`)}
  </div>`;
};

export default class FormPhoto extends Abstract {
  constructor(pointPhotos) {
    super();
    this._pointPhotos = pointPhotos;
  }

  getTemplate() {
    return createFormPhotoTemplate(this._pointPhotos);
  }
}
