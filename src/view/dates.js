import {sortEventsByDate} from "../mock/filter.js";

const tripInfoDates = () => `<p class="trip-info__dates">${sortEventsByDate().min}&nbsp;&mdash;&nbsp;${sortEventsByDate().max}</p>`;

export {
  tripInfoDates
};

