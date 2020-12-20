import dayjs from 'dayjs';
import {generateTemplateElements} from "../../utils/utils.js";
import {createEventTypeInput} from "./type-input.js";
import {getRandomDescription, getRandomOffer} from "../../mock/data.js";
import {createEventTypeWrapper} from "./types.js";
import {createCityOption} from "./option-city.js";
import {createEventInputTime} from "./time-input.js";
import {createPriceField} from "./price-field.js";
import {createFormButton} from "./form-button.js";
import {createOffer} from "./offer.js";
import {getRandomImg} from "../../mock/data.js";
import {createFormPhoto} from "./photo.js";

const eventTimeLabels = [
  {
    name: `From`,
    id: `event-start-time-1`,
    placeholder: dayjs().format(`DD/MM/YYYY`)
  },
  {
    name: `To`,
    id: `event-end-time-1`,
    placeholder: dayjs().format(`DD/MM/YYYY`)
  }
];

const optionCities = [`Amsterdam`, `Geneva`, `Chamonix`];

const eventTypes = [
  {
    name: `Taxi`,
    type: `transport-all`
  },
  {
    name: `Bus`,
    type: `public-transport`
  },
  {
    name: `Train`,
    type: `public-transport`
  },
  {
    name: `Ship`,
    type: `public-transport`
  },
  {
    name: `Transport`,
    type: `public-transport`
  },
  {
    name: `Drive`,
    type: `transport-all`
  },
  {
    name: `Flight`,
    type: `public-transport`
  },
  {
    name: `Check-in`,
    type: `other`
  },
  {
    name: `Sightseeing`,
    type: `other`
  },
  {
    name: `Restaurant`,
    type: `other`
  },
];

const formButtons = [{
  name: `Save`,
  class: `event__save-btn  btn  btn--blue`,
  type: `submit`
}, {
  name: `Cancel`,
  class: `event__reset-btn`,
  type: `reset`
}];

const createEventTypesListHtml = () => createEventTypeWrapper(generateTemplateElements(eventTypes, createEventTypeInput));

const createOffersData = () => Array.from(new Set(getRandomOffer()));

const createCityOptionsHtml = () => generateTemplateElements(optionCities, createCityOption);

const generateTimeInputsHtml = () => generateTemplateElements(eventTimeLabels, createEventInputTime);

const generateButtonsHtml = () => generateTemplateElements(formButtons, createFormButton);

const generateOffersHtml = () => generateTemplateElements(createOffersData(), createOffer);

const generateEventPhotosHtml = () => generateTemplateElements(getRandomImg(), createFormPhoto);

const addFormTemplate = () => {
  return {
    types: createEventTypesListHtml(),
    offers: generateOffersHtml(),
    cities: createCityOptionsHtml(),
    time: generateTimeInputsHtml(),
    price: createPriceField(),
    buttons: generateButtonsHtml(),
    description: getRandomDescription(),
    photos: generateEventPhotosHtml()
  };
};

export {
  addFormTemplate
};

