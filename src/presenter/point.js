import {RenderPosition, render, replace} from "../utils/render.js";
import TripPoint from "../view/trip-event/trip-point.js";
import Form from "./form.js";

export default class Point {
  constructor(array, index) {
    this._array = array;
    this._index = index;

    this._replaceItemToForm = this._replaceItemToForm.bind(this);
    this._replaceFormToItem = this.replaceFormToItem.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._submitHandler = this._submitHandler.bind(this);
    this._clickArrowHandler = this._clickArrowHandler.bind(this);

    this._closedEditFormFlag = true;
  }

  init() {
    this._prevEvtComponent = this._evtComponent;
    this._prevEditComponent = this._editFormComponent;

    this._point = this._array[this._index];
    this._evtComponent = new TripPoint(this._point);
    this._editFormComponent = new Form(this._point).init();
    this._fragment = document.createDocumentFragment();

    this._evtComponent.setClickArrowHandler(() => {
      this._replaceItemToForm();
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });

    // this.setSubmitHandler(this._submitHandler);
    // this.setClickArrowHandler(this._clickArrowHandler);

    render(this._fragment, this._evtComponent, RenderPosition.BEFORE_END);
    return this._fragment;
  }

  _onEscKeyDown(evt) {
    evt.preventDefault();
    if (evt.key === `Escape`) {
      this.replaceFormToItem();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _replaceItemToForm() {
    this._closedEditFormFlag = false;
    if (this._prevEditComponent) {
      this._prevEditComponent.this._replaceFormToItem();
    }
    replace(this._editFormComponent, this._evtComponent);
  }

  replaceFormToItem() {
    if (this._closedEditFormFlag) {
      replace(this._evtComponent, this._editFormComponent);
    }
    this._closedEditFormFlag = true;
  }

  _clickArrowHandler() {
    this._replaceItemToForm();
  }

  _submitHandler() {
    this.replaceFormToItem();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _clickFormArrowHandler() {
    this.replaceFormToItem();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}

