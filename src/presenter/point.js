import {RenderPosition, render, replace} from "../utils/render.js";
import TripPoint from "../view/trip-event/trip-point.js";
import Form from "./form.js";

export default class Point {
  constructor(array, index) {
    this._array = array;
    this._index = index;

    this._replaceItemToForm = this._replaceItemToForm.bind(this);
    this.replaceFormToItem = this.replaceFormToItem.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._clickArrowHandler = this._clickArrowHandler.bind(this);
    this._openedFormElement = null;
  }

  init() {
    this._prevEvtComponent = this._evtComponent;
    this._prevEditComponent = this._editFormComponent;

    this._currentPoint = this._array[this._index];
    this._evtComponent = new TripPoint(this._currentPoint);
    this._editFormComponent = new Form(this._currentPoint).init();
    this._fragment = document.createDocumentFragment();
    this._evtComponent.setClickArrowHandler(this._clickArrowHandler);

    render(this._fragment, this._evtComponent, RenderPosition.BEFORE_END);

    document.addEventListener(`keydown`, this._onEscKeyDown);
    return this._fragment;
  }

  _onEscKeyDown(evt) {
    evt.preventDefault();
    if (evt.key === `Escape` || evt.key === `Esc`) {
      if (this._openedFormElement) {
        this._replacePrevComponents();
      }
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _replacePrevComponents() {
    if (this._openedFormElement) {
      this._createdEventForm = document.querySelector(`.event--edit`);
      this._changeEvtComponent = new TripPoint(this._openedFormElement);
      replace(this._changeEvtComponent, this._createdEventForm);
      this._changeEvtComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
        replace(this._createdEventForm, this._changeEvtComponent);
      });
      this._openedFormElement = null;
    }
  }

  _replaceItemToForm() {
    this._replacePrevComponents();
    replace(this._editFormComponent, this._evtComponent);
    this._openedFormElement = this._array.find((elem) => elem.id === this._currentPoint.id);

    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  replaceFormToItem() {
    replace(this._evtComponent, this._editFormComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _clickArrowHandler() {
    this._replaceItemToForm();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _clickCloseArrowHandler() {
    this.replaceFormToItem();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
