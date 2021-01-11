import {createContainerElement} from "../utils/utils.js";
import {RenderPosition, render, replace} from "../utils/render.js";
import TripPoint from "../view/trip-event/trip-point.js";
import EditForm from "../view/trip-event-form/edit-form.js";

let closedEditFormFlag = true;

const pageMainElement = document.querySelector(`.page-main`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);

export const generateEvents = (array) => {
  const fragment = createContainerElement(`ul`, `trip-events__list`);
  siteEventElement.innerHTML = ``;
  for (let i = 0; i < array.length; i++) {
    render(fragment, generateTripPoints(array, i), RenderPosition.BEFORE_END);
  }
  return fragment;
};

const generateTripPoints = (array, i) => {
  const fragment = document.createDocumentFragment();
  const evtComponent = new TripPoint(array[i]);
  const editFormComponent = new EditForm(array[i]);

  const replaceItemToForm = () => {
    closedEditFormFlag = false;
    replace(editFormComponent, evtComponent);
  };

  const replaceFormToItem = () => {
    closedEditFormFlag = true;
    replace(evtComponent, editFormComponent);
  };

  const onEscKeyDown = (evt) => {
    evt.preventDefault();
    if (evt.key === `Escape`) {
      replaceFormToItem();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  evtComponent.setClickArrowHandler(() => {
    if (closedEditFormFlag) {
      replaceItemToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  });

  editFormComponent.setSubmitHandler(() => {
    replaceFormToItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  editFormComponent.setClickArrowHandler(() => {
    replaceFormToItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(fragment, evtComponent, RenderPosition.BEFORE_END);
  return fragment;
};

export default class Point {
  constructor(points, index) {
    this._points = points;
    this._index = index;
    this._fragment = document.createDocumentFragment();

    this._evtComponent = new TripPoint(this._points[this._index]);
    this._editFormComponent = new EditForm((this._points[this._index]));
  }

  _replaceItemToForm() {
    closedEditFormFlag = false;
    replace(this._editFormComponent, this._evtComponent);
  }

  _replaceFormToItem() {
    closedEditFormFlag = true;
    replace(this._evtComponent, this._editFormComponent);
  }

  _renderPoint() {
    render(this._fragment, this._evtComponent, RenderPosition.BEFORE_END);
    return this._fragment;
  }


}
