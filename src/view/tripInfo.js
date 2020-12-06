import {render, templatePosition} from "../utils/utils.js";
import {generateCity} from "../mock/data.js";
import {sortEventsByDate} from "../mock/filter.js";

const createTripInfo = () => {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${generateCity()} &mdash; ${generateCity()} &mdash; ${generateCity()}</h1>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value"></span>
  </p>
</section>`;
};

const tripInfoDates = () => {
  return `<p class="trip-info__dates">${sortEventsByDate().min}&nbsp;&mdash;&nbsp;${sortEventsByDate().max}</p>`;
};

const upDateTripDates = () => {
  const tripInfoElement = document.querySelector(`.trip-info__main`);
  const allCreatedDates = tripInfoElement.querySelectorAll(`.trip-info__dates`);
  for (let i = 0; i < allCreatedDates.length; i++) {
    allCreatedDates[i].parentElement.removeChild(allCreatedDates[i]);
  }
  render(tripInfoElement, tripInfoDates(), templatePosition.BEFORE_END);
};

export {
  createTripInfo,
  upDateTripDates
};
