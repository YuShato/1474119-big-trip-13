import {getRandomInt, getRandomBoolean, getRandomPositiveInt, getArrayRandomElement} from "../utils/utils.js";
import dayjs from 'dayjs';

const OFFERS_COUNT = 15;

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

  const randomProperty = function (obj) {
    let keys = Object.keys(obj);
    return obj[keys[keys.length * Math.random() << 0]];
  };
  const newOffersArray = [];

  for (let i = 0; i < offersCount; i++) {
    newOffersArray.push(randomProperty(offerDetails));
  }

  return newOffersArray;
};

const getRandomDescription = () => {
  const descriptionText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const arrayOfDescription = descriptionText.split(`. `);

  const descriptionSize = {
    MIN: 1,
    MAX: 5
  };

  const currentLength = getRandomPositiveInt(descriptionSize.MAX) + 1;
  let filledArray = Array.from({
    length: currentLength
  }, () => (getArrayRandomElement(arrayOfDescription)));
  const randomDescription = filledArray.join(`. `);
  return randomDescription;
};

const cities = [`Lisboa`, `Porto`, `Sesimbra`, `Coimbra`, `Cascais`];
const events = [`Taxi`, `Flight`, `Drive`, `Check-in`, `Sightseeing`, `Restaurant`, `Ship`, `Transport`];
const prices = {
  min: 3,
  max: 300
};

const generateDate = () => {
  const isDate = Boolean(getRandomPositiveInt(1));
  const maxDaysGap = 7;
  const daysGap = getRandomInt(-maxDaysGap, maxDaysGap);

  return !isDate ? null : dayjs().add(daysGap, `day`).toDate();
};

const today = dayjs(new Date());
const dateForForm = () => {
  const currentDate = generateDate();
  return currentDate === null ? dayjs(today) : dayjs(currentDate);
};

const generateCity = () => {
  return `${getArrayRandomElement(cities)}`;
};

const generateEvent = () => {
  return `${getArrayRandomElement(events)}`;
};

const getRandomImg = () => {
  const createPhotoSrc = () => {
    return `http://picsum.photos/248/152?r=${getRandomPositiveInt(100)}`;
  };

  const newPhotoArray = new Array(getRandomInt(1, 5)).fill().map(createPhotoSrc);
  return newPhotoArray;

};

const getSum = () => {
  let tripPrices = document.querySelectorAll(`.event__price-value`);
  let currentSum = 0;
  for (let i = 0; i < tripPrices.length; i++) {
    currentSum += Number(tripPrices[i].textContent);
  }
  return currentSum;
};

const getTotalSum = () => {
  console.log(`здесь написать функцию, который считает все цены с учетом выбранных офферов`);
};

const generateMockTripEvent = () => {
  return {
    description: getRandomDescription(),
    offers: getRandomOffer(),
    city: generateCity(),
    tripEvent: generateEvent(),
    date: dateForForm(),
    price: getRandomInt(prices.min, prices.max),
    startTime: dayjs(dateForForm()),
    endTime: `${dayjs(dateForForm()).add(getRandomInt(1, 10), `hour`)}`,
    photos: getRandomImg(),
    totalSum: getTotalSum()
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
  today
};