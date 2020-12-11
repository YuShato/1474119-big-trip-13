import {getRandomInt, getRandomPositiveInt, getArrayRandomElement} from "../utils/utils.js";
import dayjs from 'dayjs';

const OFFERS_COUNT = 15;

const MAX_GAP_DAYS = 7;

const filters = [
  {
    name: `Everything`,
    isChecked: `checked`
  },
  {
    name: `Future`,
    isChecked: ``
  },
  {
    name: `Past`,
    isChecked: ``
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

const sorters = [
  {
    name: `Day`,
    isChecked: `checked`,
    isDisable: ``
  },
  {
    name: `Event`,
    isChecked: ``,
    isDisable: `disabled`
  },
  {
    name: `Time`,
    isChecked: ``,
    isDisable: ``
  },
  {
    name: `Price`,
    isChecked: ``,
    isDisable: ``
  },
  {
    name: `Offers`,
    isChecked: ``,
    isDisable: `disabled`
  }
];

const eventTimeLabels = [
  {
    name: `From`,
    id: `event-start-time-1`
  },
  {
    name: `To`,
    id: `event-end-time-1`
  }
];

const optionCities = [`Amsterdam`, `Geneva`, `Chamonix`];
const eventTypes = [
  {
    name: `Taxi`,
    type: `transport-all`},
  {
    name: `Bus`,
    type: `public-transport`},
  {
    name: `Train`,
    type: `public-transport`},
  {name: `Ship`,
    type: `public-transport`},
  {
    name: `Transport`,
    type: `public-transport`},
  {
    name: `Drive`,
    type: `transport-all`},
  {
    name: `Flight`,
    type: `public-transport`},
  {
    name: `Check-in`,
    type: `other`},
  {
    name: `Sightseeing`,
    type: `other`},
  {
    name: `Restaurant`,
    type: `other`},
]
;
const getRandomOffer = () => {

  const specialOfferCount = {
    MIN: 0,
    MAX: 5
  };

  const checkedValue = [`checked`, ``];

  const offerDetails = {
    luggage: {
      name: `Add luggage`,
      id: `event-offer-luggage-1`,
      price: 30,
      isChecked: getArrayRandomElement(checkedValue),
      idName: `event-offer-luggage`,
      type: `transport-all`
    },
    comfort: {
      name: `Switch to comfort class`,
      id: `event-offer-comfort-1`,
      price: 100,
      isChecked: getArrayRandomElement(checkedValue),
      idName: `event-offer-comfort`,
      type: `transport-all`
    },
    meal: {
      name: `Add meal`,
      id: `event-offer-meal-1`,
      price: 15,
      isChecked: getArrayRandomElement(checkedValue),
      idName: `event-offer-meal`,
      type: `public-transport`
    },
    seats: {
      name: `Choose seats`,
      id: `event-offer-seats-1`,
      price: 5,
      isChecked: getArrayRandomElement(checkedValue),
      idName: `event-offer-seats`,
      type: `public-transport`
    },
    train: {
      name: `Travel by train`,
      id: `event-offer-train-1`,
      price: 40,
      isChecked: getArrayRandomElement(checkedValue),
      idName: `event-offer-train`,
      type: `transport-all`
    }
  };

  const offersCount = getRandomPositiveInt(specialOfferCount.MAX);

  const randomProperty = function (obj) {
    let keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
  };

  const newOffers = [];

  for (let i = 0; i < offersCount; i++) {
    newOffers.push(randomProperty(offerDetails));
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
  let tripDescriptions = Array.from({
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
  return startDate.add(getRandomPositiveInt(MAX_GAP_DAYS), `days`).add(getRandomInt(1, 10), `hours`);
};

const today = dayjs(new Date());

const generateCity = () => `${getArrayRandomElement(cities)}`;

const generateEvent = () => `${getArrayRandomElement(events)}`;

const getRandomImg = () => {
  const createPhotoSrc = () => `http://picsum.photos/248/152?r=${getRandomPositiveInt(100)}`;
  return new Array(getRandomInt(1, 5)).fill().map(createPhotoSrc);
};

const getSum = () => {
  let tripPrices = document.querySelectorAll(`.event__price-value`);
  let currentSum = 0;
  for (let i = 0; i < tripPrices.length; i++) {
    currentSum += Number(tripPrices[i].textContent);
  }
  return currentSum;
};

const generateMockTripEvent = () => {
  const startDate = generateRandomDate();
  const eventPrice = getRandomInt(prices.min, prices.max);
  const allOffers = getRandomOffer();
  const totalTripPrice = allOffers.filter((offer) => offer.isChecked === `checked`).reduce((sum, elem) => sum + elem.price, 0) + eventPrice;

  return {
    description: getRandomDescription(),
    offers: allOffers,
    city: generateCity(),
    tripEvent: generateEvent(),
    price: eventPrice,
    startTime: startDate,
    endTime: generateRandomDateOffset(startDate),
    photos: getRandomImg(),
    totalSum: totalTripPrice
  };
};

const currentMockArray = new Array(OFFERS_COUNT).fill().map(generateMockTripEvent);

export {
  getRandomDescription,
  getRandomOffer,
  generateMockTripEvent,
  getRandomImg,
  getSum,
  generateCity,
  currentMockArray,
  OFFERS_COUNT,
  today,
  filters,
  sorters,
  eventTypes,
  eventTimeLabels,
  optionCities,
  formButtons
};
