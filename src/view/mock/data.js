import {getRandomInt, randomBoolean} from "../../utils/utils.js";
import dayjs from 'dayjs';

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
      isChecked: randomBoolean(),
      idName: `event-offer-luggage`
    },
    comfort: {
      name: `Switch to comfort class`,
      id: `event-offer-comfort-1`,
      price: 100,
      isChecked: randomBoolean(),
      idName: `event-offer-comfort`
    },
    meal: {
      name: `Add meal`,
      id: `event-offer-meal-1`,
      price: 15,
      isChecked: randomBoolean(),
      idName: `event-offer-meal`
    },
    seats: {
      name: `Choose seats`,
      id: `event-offer-seats-1`,
      price: 5,
      isChecked: randomBoolean(),
      idName: `event-offer-seats`
    },
    train: {
      name: `Travel by train`,
      id: `event-offer-train-1`,
      price: 40,
      isChecked: randomBoolean(),
      idName: `event-offer-train`
    }
  };

  const offersCount = getRandomInt(specialOfferCount.MAX);

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

  const currentLength = getRandomInt(descriptionSize.MAX) + 1;
  let filledArray = Array.from({
    length: currentLength
  }, () => (arrayOfDescription[getRandomInt(arrayOfDescription.length - 1)]));
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
  const isDate = Boolean(getRandomInt(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInt(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, `day`).toDate();
};

const today = dayjs(new Date());
const dateForForm = () => {
  const currentDate = generateDate();
  if (currentDate === null) {
    return dayjs(today).format(`DD MMM`);
  } else {
    return dayjs(currentDate).format(`DD MMM`);
  }
};


const generateCity = () => {
  return `${cities[getRandomInt(0, cities.length - 1)]}`;
};
const generateEvent = () => {
  return `${events[getRandomInt(0, events.length - 1)]}`;
};


const generateMockTripEvent = () => {
  const mockTrip = {
    city: generateCity(),
    tripEvent: generateEvent(),
    date: dateForForm(),
    price: getRandomInt(prices.min, prices.max),
    startTime: dayjs(dateForForm()).format(`HH:MM`),
    endTime: `${dayjs(dateForForm()).add(getRandomInt(1, 10), `hour`).format(`HH:MM`)}`
  };
  return mockTrip;
};

const getRandomImg = () => {
  return `http://picsum.photos/248/152?r=${getRandomInt(0, 100)}`;
};

const getSum = () => {
  let tripPrices = document.querySelectorAll(`.event__price-value`);
  let currentSum = 0;
  for (let i = 0; i < tripPrices.length; i++) {
    currentSum += Number(tripPrices[i].textContent);
  }
  return currentSum;
};


export {
  getRandomDescription,
  getRandomOffer,
  generateMockTripEvent,
  getRandomImg,
  getSum,
  generateCity
};

