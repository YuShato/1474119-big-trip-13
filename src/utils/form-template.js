import {createAddForm} from "../view/add-form.js";
import {createEventTypeInput} from "../view/type-input.js";
import {createEventInputTime} from "../view/time-input.js";
import {createEventsFieldset} from "../view/form-fieldset.js";
import {createEventTypeWrapper} from "../view/types.js";
import {createCityOption} from "../view/option-city.js";
import {createPriceField} from "../view/price-field.js";
import {createFormButton} from "../view/form-button.js";
import {createFormPhoto} from "../view/photo.js";
import {createOffer} from "../view/offer.js";
import {eventTypes, eventTimeLabels, optionCities, formButtons, getRandomImg, getRandomOffer} from "../mock/data.js";
import {TemplatePosition, render, generateTemplateElements, createDivContainer} from "./utils.js";
import {getRandomDescription} from "../mock/data.js";

const createEventTypeList = () => {
  const fragment = createDivContainer();
  const container = createDivContainer();
  const eventTypeListElement = createDivContainer(`event__type-list`);
  render(fragment, createEventsFieldset(), TemplatePosition.BEFORE_END);
  const eventsFieldsetElement = fragment.querySelector(`.event__type-group`);
  render(eventsFieldsetElement, generateTemplateElements(eventTypes, createEventTypeInput), TemplatePosition.BEFORE_END);
  render(eventTypeListElement, fragment.innerHTML, TemplatePosition.BEFORE_END);
  container.appendChild(eventTypeListElement);
  return container.innerHTML;
};

const generateEventTypes = () => {
  const fragment = createDivContainer();
  render(fragment, createEventTypeWrapper(), TemplatePosition.BEFORE_END);
  const eventWrapperElement = fragment.querySelector(`.event__type-wrapper`);
  render(eventWrapperElement, createEventTypeList(), TemplatePosition.BEFORE_END);
  return fragment.innerHTML;
};

const createEventTimeField = () => {
  const fragment = createDivContainer();
  const timeFieldElement = createDivContainer();
  const separator = `&mdash;`;
  timeFieldElement.className = `event__field-group  event__field-group--time`;
  render(timeFieldElement, generateTemplateElements(eventTimeLabels, createEventInputTime), TemplatePosition.BEFORE_END);
  let firstInputElement = timeFieldElement.querySelector(`.event__input--time`);
  render(firstInputElement, separator, TemplatePosition.AFTER_END);
  fragment.appendChild(timeFieldElement);
  return fragment.innerHTML;
};

const createDestinationList = () => {
  const fragment = createDivContainer();
  const datasetList = document.createElement(`datalist`);
  datasetList.id = `destination-list-1`;
  render(datasetList, generateTemplateElements(optionCities, createCityOption), TemplatePosition.BEFORE_END);
  fragment.appendChild(datasetList);
  return fragment.innerHTML;
};

const clearPhotosContainer = () => {
  let photosContainerElement = document.querySelector(`.event__photos-container`);
  if (photosContainerElement) {
    photosContainerElement.parentElement.removeChild(photosContainerElement);
  }
};

const generatePhotos = () => {
  clearPhotosContainer();
  const fragment = createDivContainer();
  const eventPhotosTape = createDivContainer(`event__photos-tape`);
  const eventPhotoContainer = createDivContainer(`event__photos-container`);
  render(eventPhotosTape, generateTemplateElements(getRandomImg(), createFormPhoto), TemplatePosition.BEFORE_END);
  eventPhotoContainer.appendChild(eventPhotosTape);
  fragment.appendChild(eventPhotoContainer);
  return fragment.innerHTML;
};

const generateAddForm = () => {
  const fragment = createDivContainer();
  render(fragment, createAddForm(), TemplatePosition.BEFORE_END);
  const formHeaderElement = fragment.querySelector(`.event__header`);
  const eventFieldElement = fragment.querySelector(`.event__field-group`);
  render(formHeaderElement, generateEventTypes(), TemplatePosition.AFTER_BEGIN);
  render(eventFieldElement, createDestinationList(), TemplatePosition.BEFORE_END);
  render(formHeaderElement, createEventTimeField(), TemplatePosition.BEFORE_END);
  render(formHeaderElement, createPriceField(), TemplatePosition.BEFORE_END);
  render(formHeaderElement, generateTemplateElements(formButtons, createFormButton), TemplatePosition.BEFORE_END);
  return fragment.innerHTML;
};

const getEventType = (dataType) => {
  let eventType = ``;
  for (let i = 0; i < eventTypes.length; i++) {
    if (dataType === eventTypes[i].name) {
      eventType = eventTypes[i].type;
    }
  }
  return eventType;
};

const createFormOffers = () => {
  const offerContainerElement = createDivContainer();
  const eventTypeValue = document.querySelector(`.event__type-output`).textContent.trim();
  const customizeData = Array.from(new Set(getRandomOffer())).filter((elem) => elem.type === getEventType(eventTypeValue));
  render(offerContainerElement, generateTemplateElements(customizeData, createOffer), TemplatePosition.BEFORE_END);
  return offerContainerElement.innerHTML;
};

const generateFormOffers = () => {
  const offerContainer = document.querySelector(`.event__available-offers`);
  offerContainer.innerHTML = ``;
  render(offerContainer, createFormOffers(), TemplatePosition.BEFORE_END);
};

const getOffersSum = () => {
  const offerPriceElements = document.querySelectorAll(`.event__offer-checkbox:checked`);
  let totalOffersSum = 0;
  if (offerPriceElements) {
    for (let i = 0; i < offerPriceElements.length; i++) {
      const currentSum = offerPriceElements[i].nextElementSibling.querySelector(`.event__offer-price`).textContent;
      totalOffersSum += Number(currentSum);
    }
  }
  return totalOffersSum;
};

const updateFormDescription = () => {
  const destinationContainer = document.querySelector(`.event__section--destination`);
  const descriptionElement = destinationContainer.querySelector(`.event__destination-description`);
  descriptionElement.textContent = getRandomDescription();
  render(destinationContainer, generatePhotos(), TemplatePosition.BEFORE_END);
};

const onChangeEventType = (evt) => {
  const typeOutput = document.querySelector(`.event__type-output`);
  const typeIconElement = document.querySelector(`.event__type-icon`);
  typeIconElement.src = `img/icons/${evt.target.textContent.toLowerCase()}.png`;
  typeOutput.textContent = evt.target.textContent;
};

const fillAddForm = (evt) => {
  const priceInputElement = document.querySelector(`.event__input--price`);
  if (evt.target.classList.contains(`event__type-label`)) {
    onChangeEventType(evt);
    generateFormOffers();
    updateFormDescription();
    priceInputElement.value = getOffersSum();
  }
};

const onTypeInputChange = () => {
  const typeListElement = document.querySelector(`.event__type-group`);
  typeListElement.addEventListener(`click`, fillAddForm);
};

const eventTypeUpdate = () => {
  const typeInputElement = document.querySelector(`.event__type-toggle`);
  typeInputElement.addEventListener(`change`, onTypeInputChange);
};

export {
  generateAddForm,
  generateFormOffers,
  getOffersSum,
  updateFormDescription,
  onChangeEventType,
  eventTypeUpdate
};

