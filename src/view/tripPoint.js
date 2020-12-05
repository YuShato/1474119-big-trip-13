import {humanizeTaskDueTime, humanizeTaskDueDate} from "./mock/filter.js";
const createTripPoint = ({
  city,
  tripEvent,
  date,
  price,
  startTime,
  endTime
}) => {
  const timeGap = () => {
    let firstDate = humanizeTaskDueTime(startTime);
    let secondDate = humanizeTaskDueTime(endTime);

    let getDate = (string) => new Date(0, 0, 0, string.split(`:`)[0], string.split(`:`)[1]);
    let different = (getDate(secondDate) - getDate(firstDate));

    let hours = Math.floor((different % 86400000) / 3600000);
    let minutes = Math.round(((different % 86400000) % 3600000) / 60000);
    let result = hours + `H ` + minutes + `M`;
    return result;
  };

  return `<li class="trip-events__item">
  <div class="event">
    <time class="event__date" datetime="${date}">${humanizeTaskDueDate(date)}</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${tripEvent.toLowerCase()}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${tripEvent} ${city}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${startTime}">${humanizeTaskDueTime(startTime)}</time>
        —
        <time class="event__end-time" datetime="${endTime}">${humanizeTaskDueTime(endTime)}</time>
      </p>
      <p class="event__duration">${timeGap()}</p>
    </div>
    <p class="event__price">
      €&nbsp;<span class="event__price-value">${price}</span>
    </p>
    <div class = "trip-offers">
    </div>
    <h4 class="visually-hidden">Offers:</h4>
    <button class="event__favorite-btn  event__favorite-btn" type="button">
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

export {
  createTripPoint
};
