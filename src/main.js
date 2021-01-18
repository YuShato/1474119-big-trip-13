import {RenderPosition, render} from "./utils/render.js";
import {CITIES, eventMockData, offerDetails, getRandomImg, getRandomDescription} from "./mock/data.js";
import AddForm from "./view/trip-event-form/point-form";
import Events from "./presenter/events.js";
import TypesWrapper from "./view/trip-event-form/types-wrapper";
import CityCollection from "./view/trip-event-form/city-collection";
import TimeField from "./view/trip-event-form/time-field.js";
import EventPrice from "./view/trip-event-form/event-price.js";
import Offers from "./view/trip-event-form/offers.js";
import FormPhoto from "./view/trip-event-form/form-photo.js";

const pageMainElement = document.querySelector(`.page-body__page-main`);
const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);
const siteMainElement = document.querySelector(`.trip-main`);
const siteControlElement = document.querySelector(`.trip-controls`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);

const removeAddForm = () => {
  const addForm = pageMainElement.querySelector(`.event--edit`);
  addForm.parentElement.removeChild(addForm);
  newEventBtn.addEventListener(`click`, renderAddForm);
  document.removeEventListener(`keydown`, onEscKeydown);
};

const renderFormOffers = (point, fragment) => {
  const offersContainerElement = fragment.querySelector(`.event__section--offers`);
  render(offersContainerElement,
      (point ? new Offers(point.offers) : new Offers(offerDetails)),
      RenderPosition.BEFORE_END);
};

const renderPhotos = (point, fragment) => {
  const photosContainerElement = fragment.querySelector(`.event__photos-container`);
  render(photosContainerElement,
      (point ? new FormPhoto(point.photos) : new FormPhoto(getRandomImg())),
      RenderPosition.BEFORE_END);
};

const renderDescription = (point, fragment) => {
  const descriptionElement = fragment.querySelector(`.event__destination-description`);
  const getDescription = () => point ? point.description : getRandomDescription();
  descriptionElement.innerHTML = getDescription();
};

const deleteEditFormButtons = (point, fragment) => {
  const editFormFavoriteBtn = fragment.querySelector(`.event__favorite-btn`);
  const editFormRollUpBtn = fragment.querySelector(`.event__rollup-btn`);
  if (point === null) {
    editFormFavoriteBtn.parentElement.removeChild(editFormFavoriteBtn);
    editFormRollUpBtn.parentElement.removeChild(editFormRollUpBtn);
  }
};

const renderPrice = (fragment) => {
  const eventPriceElement = fragment.querySelector(`.event__field-group--price`);
  render(eventPriceElement, new EventPrice(), RenderPosition.BEFORE_END);
};

const renderTimeInputs = (fragment) => {
  const eventTimeElement = fragment.querySelector(`.event__field-group--time`);
  render(eventTimeElement, new TimeField(), RenderPosition.BEFORE_END);
};

const renderCities = (fragment) => {
  const eventFieldGroup = fragment.querySelector(`.event__field-group--destination`);
  render(eventFieldGroup, new CityCollection(CITIES), RenderPosition.BEFORE_END);
};

const renderHeader = (fragment) => {
  const eventHeaderElement = fragment.querySelector(`.event__header`);
  render(eventHeaderElement, new TypesWrapper(), RenderPosition.AFTER_BEGIN);
};

const renderFormTemplate = (parentElement) => {
  render(parentElement, new AddForm(), RenderPosition.AFTER_BEGIN);
};

const createAddForm = () => {
  const fragment = document.createDocumentFragment();
  renderFormTemplate(fragment);
  renderHeader(fragment);
  deleteEditFormButtons(null, fragment);
  renderCities(fragment);
  renderTimeInputs(fragment);
  renderPrice(fragment);
  renderFormOffers(null, fragment);
  renderPhotos(null, fragment);
  renderDescription(null, fragment);

  return fragment;
};

const renderAddForm = () => {
  const eventsListElement = document.querySelector(`.trip-events__list`);
  render(eventsListElement, createAddForm(), RenderPosition.AFTER_BEGIN);

  newEventBtn.removeEventListener(`click`, renderAddForm);
  document.addEventListener(`keydown`, onEscKeydown);

  const formCancelBtn = pageMainElement.querySelector(`.event__reset-btn`);
  formCancelBtn.addEventListener(`click`, removeAddForm);
};

new Events(siteMainElement, siteEventElement, siteControlElement).init(eventMockData);

newEventBtn.addEventListener(`click`, renderAddForm);
newEventBtn.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    renderAddForm();
  }
});

const onEscKeydown = (evt) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    evt.preventDefault();
    removeAddForm();
  }
  document.removeEventListener(`keydown`, onEscKeydown);
};
