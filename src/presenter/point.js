import {createContainerElement} from "../utils/utils.js";
import {RenderPosition, render, replace} from "../utils/render.js";
import TripPoint from "../view/trip-event/trip-point.js";
import PointForm from "../view/trip-event-form/point-form.js";
// import Form from "./form.js";

const pageMainElement = document.querySelector(`.page-main`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);

export default class Point {
  constructor(array, index) {
    this._array = array;
    this._index = index;

    this._replaceItemToForm = this._replaceItemToForm.bind(this);
    this._replaceFormToItem = this._replaceFormToItem.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init() {
    this._evtComponent = new TripPoint(this._array[this._index]);
    this._editFormComponent = new PointForm(this._array[this._index]);
    this._fragment = document.createDocumentFragment();
    this._closedEditFormFlag = true;

    this._evtComponent.setClickArrowHandler(() => {
      this._replaceItemToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editFormComponent.setSubmitHandler(() => {
      this._replaceFormToItem();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });

    this._editFormComponent.setClickArrowHandler(() => {
      if (!this._closedEditFormFlag) {
        this._replaceFormToItem();
        document.removeEventListener(`keydown`, this._onEscKeyDown);
      }
    });

    render(this._fragment, this._evtComponent, RenderPosition.BEFORE_END);
    return this._fragment;
  }

  _onEscKeyDown(evt) {
    evt.preventDefault();
    if (evt.key === `Escape`) {
      this._replaceFormToItem();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _replaceItemToForm() {
    this._closedEditFormFlag = false;
    replace(this._editFormComponent, this._evtComponent);
  }

  _replaceFormToItem() {
    this._closedEditFormFlag = true;
    replace(this._evtComponent, this._editFormComponent);
  }
}

export const generateEvents = (array) => {
  const fragment = createContainerElement(`ul`, `trip-events__list`);
  siteEventElement.innerHTML = ``;
  for (let i = 0; i < array.length; i++) {
    render(fragment, new Point(array, i).init(), RenderPosition.BEFORE_END);
  }
  return fragment;
};
