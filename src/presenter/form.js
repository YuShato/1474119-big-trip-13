import {RenderPosition, render, remove} from "../utils/render.js";
import PointForm from "../view/trip-event-form/point-form.js";
import {CITIES, offerDetails, getRandomImg, getRandomDescription} from "../mock/data.js";
import TypesWrapper from "../view/trip-event-form/types-wrapper";
import CityCollection from "../view/trip-event-form/city-collection";
import TimeField from "../view/trip-event-form/time-field.js";
import EventPrice from "../view/trip-event-form/event-price.js";
import Offers from "../view/trip-event-form/offers.js";
import FormPhoto from "../view/trip-event-form/form-photo.js";
import Point from "./point.js";

const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);

export default class Form {
  constructor(point) {
    this._point = point;
    this._form = new PointForm(this._point);
    this._cityCollection = new CityCollection(CITIES);
    this._types = new TypesWrapper(this._point);
    this._timeField = new TimeField(this._point);
    this._price = new EventPrice(this._point);
    this._eventsListElement = null;
    this._pointItem = new Point(this._point);

    this._deleteButtonHandler = this._deleteButtonHandler.bind(this);
  }

  init() {
    this._element = null;
    if (!this._point) {
      this._element = this._createAddForm();
    } else {
      this._element = this._createEditForm(this._point);
    }

    return this._element;
  }

  _renderFormTemplate(parentElement) {
    this._parentElement = parentElement;
    this._form.setDeleteButtonHandler(this._deleteButtonHandler);
    render(this._parentElement, this._form, RenderPosition.AFTER_BEGIN);
  }

  _renderCities(fragment) {
    this._fragment = fragment;
    const eventFieldGroup = this._fragment.querySelector(`.event__field-group--destination`);
    render(eventFieldGroup, this._cityCollection, RenderPosition.BEFORE_END);
  }

  _renderHeader(fragment) {
    this._fragment = fragment;
    const eventHeaderElement = this._fragment.querySelector(`.event__header`);
    render(eventHeaderElement, this._types, RenderPosition.AFTER_BEGIN);
  }

  _renderTimeInputs(fragment) {
    this._fragment = fragment;
    const eventTimeElement = this._fragment.querySelector(`.event__field-group--time`);
    render(eventTimeElement, this._timeField, RenderPosition.BEFORE_END);
  }

  _renderPrice(fragment) {
    this._fragment = fragment;
    const eventPriceElement = this._fragment.querySelector(`.event__field-group--price`);
    render(eventPriceElement, this._price, RenderPosition.BEFORE_END);
  }

  _renderDescription(point, fragment) {
    this._fragment = fragment;
    this._point = point;
    const descriptionElement = this._fragment.querySelector(`.event__destination-description`);
    const getDescription = () => this._point ? this._point.description : getRandomDescription();
    descriptionElement.innerHTML = getDescription();
  }

  _deleteEditFormButtons(point, fragment) {
    this._fragment = fragment;
    this._point = point;
    const editFormFavoriteBtn = this._fragment.querySelector(`.event__favorite-btn`);
    const editFormRollUpBtn = this._fragment.querySelector(`.event__rollup-btn`);
    if (this._point === null) {
      editFormFavoriteBtn.parentElement.removeChild(editFormFavoriteBtn);
      editFormRollUpBtn.parentElement.removeChild(editFormRollUpBtn);
    }
  }

  _deleteButtonHandler() {
    remove(this._form);
    document.removeEventListener(`keydown`, this._onEscKeydown);
  }

  _renderPhotos(point, fragment) {
    this._fragment = fragment;
    this._point = point;
    const photosContainerElement = this._fragment.querySelector(`.event__photos-container`);
    render(photosContainerElement,
        (this._point ? new FormPhoto(this._point.photos) : new FormPhoto(getRandomImg())),
        RenderPosition.BEFORE_END);
  }

  _renderFormOffers(point, fragment) {
    this._fragment = fragment;
    this._point = point;
    const offersContainerElement = this._fragment.querySelector(`.event__section--offers`);
    render(offersContainerElement,
        (this._point ? new Offers(this._point.offers) : new Offers(offerDetails)),
        RenderPosition.BEFORE_END);
  }

  _createAddForm() {
    this._fragment = document.createDocumentFragment();
    this._renderFormTemplate(this._fragment);
    this._renderHeader(this._fragment);
    this._deleteEditFormButtons(null, this._fragment);
    this._renderCities(this._fragment);
    this._renderTimeInputs(this._fragment);
    this._renderPrice(this._fragment);
    this._renderFormOffers(null, this._fragment);
    this._renderPhotos(null, this._fragment);
    this._renderDescription(null, this._fragment);

    return this._fragment;
  }

  _createEditForm(point) {
    this._point = point;
    this._fragment = document.createDocumentFragment();
    this._renderFormTemplate(this._fragment);
    this._renderHeader(this._fragment);
    this._deleteEditFormButtons(this._point, this._fragment);
    this._renderCities(this._fragment);
    this._renderTimeInputs(this._fragment);
    this._renderPrice(this._fragment);
    this._renderFormOffers(this._point, this._fragment);
    this._renderPhotos(this._point, this._fragment);
    this._renderDescription(this._point, this._fragment);

    return this._fragment;
  }

  _onEscKeydown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._removeAddForm();
    }
    document.removeEventListener(`keydown`, this._onEscKeydown);
  }

  _removeAddForm() {
    this._form.parentElement.removeChild(this._form);
    newEventBtn.addEventListener(`click`, this._renderAddForm);
    document.removeEventListener(`keydown`, this._onEscKeydown);
  }
}
