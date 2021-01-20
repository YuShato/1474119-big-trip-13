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
    this._isOpenEditFormFlag = false;
  }

  init() {
    this._prevEvtComponent = this._evtComponent;
    this._prevEditComponent = this._editFormComponent;

    this._currentPoint = this._array[this._index];
    this._evtComponent = new TripPoint(this._currentPoint);
    this._editFormComponent = new Form(this._currentPoint).init();
    this._fragment = document.createDocumentFragment();
    this._isOpenEditFormFlag = false;
    this._evtComponent.setClickArrowHandler(this._clickArrowHandler);

    render(this._fragment, this._evtComponent, RenderPosition.BEFORE_END);

    document.addEventListener(`keydown`, this._onEscKeyDown);
    return this._fragment;
  }

  _onEscKeyDown(evt) {
    evt.preventDefault();
    if (evt.key === `Escape` || evt.key === `Esc`) {
      if (this._isOpenEditFormFlag) {
        this.replaceFormToItem();
      }
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _replaceItemToForm() {
    this._isOpenEditFormFlag = true;
    if (this._prevEditComponent) {
      this._replaceFormToItem();
    }
    document.addEventListener(`keydown`, this._onEscKeyDown);
    replace(this._editFormComponent, this._evtComponent);
  }

  replaceFormToItem() {
    replace(this._evtComponent, this._editFormComponent);
    this._isOpenEditFormFlag = false;
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
