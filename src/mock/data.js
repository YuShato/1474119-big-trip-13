import {getRandomInt, getRandomPositiveInt, getArrayRandomElement, getRandomBoolean, getRandomProperty, generateTemplatesFromData} from "../utils/utils.js";
import {createEventOfferTemplate} from "../view/trip-event/event-offer.js";
import dayjs from 'dayjs';

const OFFERS_COUNT = 15;

const MAX_GAP_DAYS = 7;

const maxGapHours = {
  MIN: 1,
  MAX: 10
};

const HEADER_CITIES_COUNT = 3;

const getRandomOffer = () => {

  const specialOfferCount = {
    MIN: 0,
    MAX: 5
  };

  const offerDetails = {
    luggage: {
      name: `Add luggage`,
      id: `event-offer-luggage-1`,
      price: 30,
      isChecked: getRandomBoolean(),
      idName: `event-offer-luggage`
    },
    comfort: {
      name: `Switch to comfort class`,
      id: `event-offer-comfort-1`,
      price: 100,
      isChecked: getRandomBoolean(),
      idName: `event-offer-comfort`
    },
    meal: {
      name: `Add meal`,
      id: `event-offer-meal-1`,
      price: 15,
      isChecked: getRandomBoolean(),
      idName: `event-offer-meal`
    },
    seats: {
      name: `Choose seats`,
      id: `event-offer-seats-1`,
      price: 5,
      isChecked: getRandomBoolean(),
      idName: `event-offer-seats`
    },
    train: {
      name: `Travel by train`,
      id: `event-offer-train-1`,
      price: 40,
      isChecked: getRandomBoolean(),
      idName: `event-offer-train`
    }
  };

  const offersCount = getRandomPositiveInt(specialOfferCount.MAX);

  const newOffers = [];

  for (let i = 0; i < offersCount; i++) {
    newOffers.push(getRandomProperty(offerDetails));
  }

  return Array.from(new Set(newOffers));
};

const getRandomDescription = () => {
  const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const sentences = descriptionText.split(`. `);

  const descriptionSize = {
    MIN: 1,
    MAX: 5
  };

  const currentLength = getRandomPositiveInt(descriptionSize.MAX) + 1;
  const tripDescriptions = Array.from({
    length: currentLength
  }, () => (getArrayRandomElement(sentences)));
  return tripDescriptions.join(`. `);
};

const cities = [`Lisboa`, `Porto`, `Sesimbra`, `Coimbra`, `Cascais`];
const events = [`Taxi`, `Flight`, `Drive`, `Check-in`, `Sightseeing`, `Restaurant`, `Ship`, `Transport`];
const prices = {
  min: 3,
  max: 300
};

const generateRandomDate = () => dayjs().add(getRandomInt(-MAX_GAP_DAYS, MAX_GAP_DAYS), `days`);

const generateRandomDateOffset = (startDate) => {
  return startDate.add(getRandomPositiveInt(MAX_GAP_DAYS), `days`).add(getRandomInt(maxGapHours.MIN, maxGapHours.MAX), `hours`);
};

const generateCity = () => `${getArrayRandomElement(cities)}`;

const generateEvent = () => `${getArrayRandomElement(events)}`;

const getRandomImg = () => {
  const createPhotoSrc = () => `http://picsum.photos/248/152?r=${getRandomPositiveInt(100)}`;
  return new Array(getRandomInt(1, 5)).fill({}).map(createPhotoSrc);
};

const getAllEventsSum = (data) => data.reduce((sum, elem) => sum + elem.totalSum, 0);

const generateMockTripEvent = () => {
  const startDate = generateRandomDate();
  const eventPrice = getRandomInt(prices.min, prices.max);
  const allOffers = getRandomOffer();
  const totalTripPrice = allOffers.filter((offer) => offer.isChecked === `checked`).reduce((sum, elem) => sum + elem.price, 0) + eventPrice;
  const checkedOffersList = generateTemplatesFromData(allOffers.filter((offer) => offer.isChecked), createEventOfferTemplate);

  return {
    description: getRandomDescription(),
    offers: allOffers,
    city: generateCity(),
    tripEvent: generateEvent(),
    price: eventPrice,
    startTime: startDate,
    endTime: generateRandomDateOffset(startDate),
    photos: getRandomImg(),
    totalSum: totalTripPrice,
    checkedOffers: checkedOffersList
  };
};

const eventMockData = new Array(OFFERS_COUNT).fill({}).map(generateMockTripEvent);
const headerCities = new Array(HEADER_CITIES_COUNT).fill({}).map(generateCity);

export {
  getRandomDescription,
  getRandomOffer,
  getRandomImg,
  getAllEventsSum,
  eventMockData,
  OFFERS_COUNT,
  headerCities
};
