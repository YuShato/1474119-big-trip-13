import dayjs from 'dayjs';
import {generateTemplatesUsingClass} from "../../utils/utils.js";
import TypeInput from "./type-input.js";
import {getRandomDescription, getRandomOffer} from "../../mock/data.js";
import TypesWrapper from "./types.js";
import CityOption from "./option-city.js";
import TimeInput from "./time-input.js";
import EventPrice from "./price-field.js";
import FormButton from "./form-button.js";
import Offer from "./offer.js";
import {getRandomImg} from "../../mock/data.js";
import FormPhoto from "./photo.js";
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

const createEventTypesListTemplate = () => new TypesWrapper(generateTemplatesUsingClass(eventTypes, TypeInput)).getElement();

const generateOffersData = () => Array.from(new Set(getRandomOffer()));

const generateCityOptionHtml = () => generateTemplatesUsingClass(optionCities, CityOption);

const generateTimeInputsHtml = () => generateTemplatesUsingClass(eventTimeLabels, TimeInput);

const generateButtonsHtml = () => generateTemplatesUsingClass(formButtons, FormButton);

const generateOfferHtml = () => generateTemplatesUsingClass(generateOffersData(), Offer);

const generateEventPhotosHtml = () => generateTemplatesUsingClass(getRandomImg(), FormPhoto);

const addFormPartsTemplate = () => {
  return {
    types: createEventTypesListTemplate(),
    offers: generateOfferHtml(),
    cities: generateCityOptionHtml(),
    time: generateTimeInputsHtml(),
    price: new EventPrice().getElement(),
    buttons: generateButtonsHtml(),
    description: getRandomDescription(),
    photos: generateEventPhotosHtml()
  };
};


export {
  addFormPartsTemplate
};
