import {generateTemplatesUsingClass} from "../utils/utils.js";
import {getRandomInt, getRandomPositiveInt, getArrayRandomElement, getRandomProperty, getRandomBoolean} from "../utils/randomizer.js";
import EventOffer from "../view/trip-event/event-offer.js";
import dayjs from "dayjs";
import {nanoid} from "nanoid";

export const OFFERS_COUNT = 15;
export const CITIES = [`Lisboa`, `Porto`, `Sesimbra`, `Coimbra`, `Cascais`];
const EVENT_TYPES = [`taxi`, `flight`, `drive`, `check-in`, `sightseeing`, `restaurant`, `ship`, `transport`];

export const offerDetails = [
  {
    name: `Add luggage`,
    id: `event-offer-luggage-1`,
    price: 30,
    isChecked: getRandomBoolean(),
    idName: `event-offer-luggage`,
    type: getArrayRandomElement(EVENT_TYPES)
  },
  {
    name: `Switch to comfort class`,
    id: `event-offer-comfort-1`,
    price: 100,
    isChecked: getRandomBoolean(),
    idName: `event-offer-comfort`,
    type: getArrayRandomElement(EVENT_TYPES)
  },
  {
    name: `Add meal`,
    id: `event-offer-meal-1`,
    price: 15,
    isChecked: getRandomBoolean(),
    idName: `event-offer-meal`,
    type: getArrayRandomElement(EVENT_TYPES)
  },
  {
    name: `Choose seats`,
    id: `event-offer-seats-1`,
    price: 5,
    isChecked: getRandomBoolean(),
    idName: `event-offer-seats`,
    type: getArrayRandomElement(EVENT_TYPES)
  },
  {
    name: `Travel by train`,
    id: `event-offer-train-1`,
    price: 40,
    isChecked: getRandomBoolean(),
    idName: `event-offer-train`,
    type: getArrayRandomElement(EVENT_TYPES)
  }
];

const MAX_GAP_DAYS = 7;

const maxGapHours = {
  MIN: 1,
  MAX: 10
};

const formPhotosCount = {
  MIN: 1,
  MAX: 5,
  MAX_RANDOM_PHOTO: 1000
};

const HEADER_CITIES_COUNT = 3;

const DESCRIPTION_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const sentences = DESCRIPTION_TEXT.split(`. `);

export const getRandomOffer = () => {
  const SPECIAL_OFFER_MAX_COUNT = 5;

  const offersCount = getRandomPositiveInt(SPECIAL_OFFER_MAX_COUNT);
  const newOffers = [];

  for (let i = 0; i < offersCount; i++) {
    newOffers.push(getRandomProperty(offerDetails));
  }

  return Array.from(new Set(newOffers));
};

export const getRandomDescription = () => {
  const DESCRIPTION_MAX_SIZE = 5;

  const currentLength = getRandomPositiveInt(DESCRIPTION_MAX_SIZE) + 1;
  const tripDescriptions = Array.from({
    length: currentLength
  }, () => (getArrayRandomElement(sentences)));
  return tripDescriptions.join(`. `);
};

const prices = {
  MIN: 3,
  MAX: 300
};

const generateRandomDate = () => dayjs().add(getRandomInt(-MAX_GAP_DAYS, MAX_GAP_DAYS), `days`);

const generateRandomDateOffset = (startDate) => {
  return startDate.add(getRandomPositiveInt(MAX_GAP_DAYS), `days`).add(getRandomInt(maxGapHours.MIN, maxGapHours.MAX), `hours`);
};

const generateCity = () => `${getArrayRandomElement(CITIES)}`;

const generateEvent = () => `${getArrayRandomElement(EVENT_TYPES)}`;

export const getRandomImg = () => {
  const createPhotoSrc = () => {
    return {
      src: `http://picsum.photos/248/152?r=${getRandomPositiveInt(formPhotosCount.MAX_RANDOM_PHOTO)}`,
      description: getArrayRandomElement(sentences)
    };
  };

  return new Array(getRandomInt(formPhotosCount.MIN, formPhotosCount.MAX)).fill({}).map(createPhotoSrc);
};

export const getAllEventsSum = (data) => data.reduce((sum, event) => sum + event.totalSum, 0);

const generateMockTripEvent = () => {
  const startDate = generateRandomDate();
  const eventPrice = getRandomInt(prices.MIN, prices.MAX);
  const allOffers = getRandomOffer();
  const totalTripPrice = allOffers.filter((offer) => offer.isChecked === `checked`).reduce((sum, elem) => sum + elem.price, 0) + eventPrice;
  const checkedOffersList = generateTemplatesUsingClass(allOffers.filter((offer) => offer.isChecked), EventOffer);

  return {
    id: nanoid(10),
    description: getRandomDescription(),
    offers: allOffers,
    city: generateCity(),
    tripEvent: generateEvent(),
    price: eventPrice,
    startTime: startDate,
    endTime: generateRandomDateOffset(startDate),
    photos: getRandomImg(),
    totalSum: totalTripPrice,
    checkedOffers: checkedOffersList,
    isFavorite: false
  };
};

export const eventMockData = new Array(OFFERS_COUNT).fill({}).map(generateMockTripEvent);
export const headerCities = new Array(HEADER_CITIES_COUNT).fill({}).map(generateCity);
