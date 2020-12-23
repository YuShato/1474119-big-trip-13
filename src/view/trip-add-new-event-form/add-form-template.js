import dayjs from 'dayjs';
import {generateTemplatesFromData} from "../../utils/utils.js";
import {createTypeInputTemplate} from "./type-input.js";
import {getRandomDescription, getRandomOffer} from "../../mock/data.js";
import {createTypesWrapperTemplate} from "./types.js";
import {createCityOptionTemplate} from "./option-city.js";
import {createTimeInputTemplate} from "./time-input.js";
import {createPriceFieldTemplate} from "./price-field.js";
import {createFormButtonTemplate} from "./form-button.js";
import {createOfferTemplate} from "./offer.js";
import {getRandomImg} from "../../mock/data.js";
import {createFormPhotoTemplate} from "./photo.js";
import {DATE_FORMAT} from "../../const.js";

const eventTimeLabels = [
  {
    name: `From`,
    id: `event-start-time-1`,
    placeholder: dayjs().format(DATE_FORMAT)
  },
  {
    name: `To`,
    id: `event-end-time-1`,
    placeholder: dayjs().format(DATE_FORMAT)
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

const createEventTypesListTemplate = () => createTypesWrapperTemplate(generateTemplatesFromData(eventTypes, createTypeInputTemplate));

const generateOffersData = () => Array.from(new Set(getRandomOffer()));

const generateCityOptionHtml = () => generateTemplatesFromData(optionCities, createCityOptionTemplate);

const generateTimeInputsHtml = () => generateTemplatesFromData(eventTimeLabels, createTimeInputTemplate);

const generateButtonsHtml = () => generateTemplatesFromData(formButtons, createFormButtonTemplate);

const generateOfferHtml = () => generateTemplatesFromData(generateOffersData(), createOfferTemplate);

const generateEventPhotosHtml = () => generateTemplatesFromData(getRandomImg(), createFormPhotoTemplate);

const addFormPartsTemplate = () => {
  return {
    types: createEventTypesListTemplate(),
    offers: generateOfferHtml(),
    cities: generateCityOptionHtml(),
    time: generateTimeInputsHtml(),
    price: createPriceFieldTemplate(),
    buttons: generateButtonsHtml(),
    description: getRandomDescription(),
    photos: generateEventPhotosHtml()
  };
};

export {
  addFormPartsTemplate
};

