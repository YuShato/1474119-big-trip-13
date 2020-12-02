import dayjs from 'dayjs';
import {generateMockTripEvent} from "./mock/data.js";
import {render, templatePosition, getRandomInt} from "../utils/utils.js";

const OFFERS_COUNT = 5;

const tripOffers = {
  min: 0,
  max: 3
};

const currentMockArray = new Array(OFFERS_COUNT).fill().map(generateMockTripEvent);

const createTripPoint = ({
  city,
  tripEvent,
  date,
  price,
  startTime,
  endTime
} = currentMockArray) => {
  const timeGap = () => {
    let firstDate = startTime;
    let secondDate = endTime;

    let getDate = (string) => new Date(0, 0, 0, string.split(`:`)[0], string.split(`:`)[1]);
    let different = (getDate(secondDate) - getDate(firstDate));

    let hours = Math.floor((different % 86400000) / 3600000);
    let minutes = Math.round(((different % 86400000) % 3600000) / 60000);
    let result = hours + `H ` + minutes + `M`;
    return result;
  };

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${date}">${date}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${tripEvent.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${tripEvent} ${city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${startTime}">${startTime}</time>
        —
        <time class="event__end-time" datetime="${endTime}">${endTime}</time>
      </p>
      <p class="event__duration">${timeGap()}</p>
    </div>
    <p class="event__price">
      €&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <div class = "trip-offers">
    </div>
    <h4 class="visually-hidden">Offers:</h4>
    <button class="event__favorite-btn  event__favorite-btn--active" type="button">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;
};

const generateTripPointOffer = () => {
  const offers = [
    {
      eventPrice: 30,
      description: `Add luggage`
    },
    {
      description: `Switch to comfort class`,
      eventPrice: 100
    },
    {
      description: `Add meal`,
      eventPrice: 15
    },
    {
      description: `Choose seats`,
      eventPrice: 5
    },
    {
      description: `Travel by train`,
      eventPrice: 40
    }
  ];

  const currentOffers = offers.slice(0, getRandomInt(tripOffers.min, tripOffers.max));
  const fragment = document.createElement(`ul`);
  fragment.className = `event__selected-offers`;
  const createTripOffer = ({
    description,
    eventPrice
  } = currentOffers) => {
    return `    <li class="event__offer">
    <span class="event__offer-title">${description}</span>
    +€&nbsp;
    <span class="event__offer-price">${eventPrice}</span>
  </li>`;
  };
  for (let i = 0; i < currentOffers.length; i++) {
    render(fragment, createTripOffer(currentOffers[i]), templatePosition.BEFORE_END);
  }
  return fragment;
};

const renderEvents = () => {
  const fragment = document.createElement(`div`);
  for (let i = 0; i < OFFERS_COUNT; i++) {
    render(fragment, createTripPoint(currentMockArray[i]), templatePosition.BEFORE_END);
  }

  // я написала функцию, но не смогла отсортировать массив по этой функции (sortEventsByDate)

  const sortEventsByDate = () => {
    const allDates = fragment.querySelectorAll(`.event__date`);
    const dateArray = [];
    for (let i = 0; i < allDates.length; i++) {
      dateArray.push(dayjs(allDates[i].textContent).toDate());
    }
    return dateArray.sort((a, b) => (dayjs(a).isAfter(dayjs(b)) ? 1 : -1));
  };

  return fragment;
};

export {
  createTripPoint,
  renderEvents,
  generateTripPointOffer
};
