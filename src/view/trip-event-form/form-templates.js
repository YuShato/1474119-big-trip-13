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
import {getRandomImg, cities} from "../../mock/data.js";
import FormPhoto from "./photo.js";
import {FULL_DATE_FORMAT} from "../../const.js";
import {humanizeTimeForForm} from "../../utils/utils.js";

const eventTimeLabels = [
  {
    name: `From`,
    id: `event-start-time-1`,
    placeholder: dayjs().format(FULL_DATE_FORMAT)
  },
  {
    name: `To`,
    id: `event-end-time-1`,
    placeholder: dayjs().format(FULL_DATE_FORMAT)
  }
];

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

const generateCityOptionHtml = () => generateTemplatesUsingClass(cities, CityOption);

const generateTimeInputsHtml = () => generateTemplatesUsingClass(eventTimeLabels, TimeInput);

const generateButtonsHtml = () => generateTemplatesUsingClass(formButtons, FormButton);

const generateOfferHtml = (offersData) => generateTemplatesUsingClass(offersData, Offer);

const generateEventPhotosHtml = (photosData) => generateTemplatesUsingClass(photosData, FormPhoto);

const addFormPartsTemplate = () => {
  const offersData = generateOffersData();
  const photosData = getRandomImg();
  return {
    types: createEventTypesListTemplate(),
    offers: generateOfferHtml(offersData),
    cities: generateCityOptionHtml(),
    time: generateTimeInputsHtml(),
    price: new EventPrice().getTemplate(),
    buttons: generateButtonsHtml(),
    description: getRandomDescription(),
    photos: generateEventPhotosHtml(photosData)
  };
};

const editFormPartsTemplate = (point) => {
  return {
    id: point.id,
    city: point.city,
    tripEvent: point.tripEvent,
    startTime: humanizeTimeForForm(point.startTime),
    endTime: humanizeTimeForForm(point.endTime),
    types: generateTemplatesUsingClass(eventTypes, TypeInput),
    offers: generateOfferHtml(point.offers),
    cities: generateCityOptionHtml(),
    time: generateTimeInputsHtml(),
    price: point.totalSum,
    description: point.description,
    photos: generateEventPhotosHtml(point.photos)
  };
};

export {
  addFormPartsTemplate,
  editFormPartsTemplate
};
