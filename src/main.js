import {createTripInfo, upDateTripDates} from "./view/tripInfo.js";
import {createTripControls} from "./view/tripControls.js";
import {createTripFilter} from "./view/tripFilter.js";
import {createTripSorter} from "./view/tripSorter.js";
import {createAddForm} from "./view/addForm.js";
import {createTripPoint} from "./view/tripPoint.js";
import {templatePosition, render} from "./utils/utils.js";
import {getSum, currentMockArray} from "./view/mock/data.js";

import {filteredPastArray, filteredFuturetArray} from "./view/mock/filter.js";

const siteMainElement = document.querySelector(`.trip-main`);
const siteControlElement = document.querySelector(`.trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);
const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);

const onEventBtnPress = () => {
  const removeAddForm = () => {
    const addForm = tripEventsListElement.querySelector(`.trip-events__item:first-child`);
    const closeAddFormBtn = addForm.querySelector(`.event__reset-btn`);
    closeAddFormBtn.addEventListener(`click`, () => {
      addForm.parentElement.removeChild(addForm);
      newEventBtn.addEventListener(`click`, onEventBtnPress);
    });
  };
  render(tripEventsListElement, createAddForm(), templatePosition.AFTER_BEGIN);
  newEventBtn.removeEventListener(`click`, onEventBtnPress);
  removeAddForm();
};

const renderEvents = (array) => {
  const fragment = document.createElement(`ul`);
  fragment.className = `trip-events__list`;
  siteEventElement.innerHTML = ``;
  for (let i = 0; i < array.length; i++) {
    render(fragment, createTripPoint(array[i]), templatePosition.BEFORE_END);
  }
  return fragment;
};

render(siteMainElement, createTripInfo(), templatePosition.AFTER_BEGIN);
render(siteControlElement, createTripControls(), templatePosition.BEFORE_END);
render(siteControlElement, createTripFilter(), templatePosition.BEFORE_END);
render(siteEventElement, createTripSorter(), templatePosition.BEFORE_END);
siteEventElement.appendChild(renderEvents(currentMockArray));
const totalSum = document.querySelector(`.trip-info__cost-value`);
const tripEventsListElement = siteEventElement.querySelector(`.trip-events__list`);

newEventBtn.addEventListener(`click`, onEventBtnPress);
newEventBtn.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    onEventBtnPress();
  }
});

totalSum.textContent = getSum();
upDateTripDates();

const tripFilters = document.querySelector(`.trip-filters`);

tripFilters.addEventListener(`click`, (evt) => {
  switch (evt.target.value) {
    case `past`:
      siteEventElement.appendChild(renderEvents(filteredPastArray));
      upDateTripDates();
      break;
    case `future`:
      siteEventElement.appendChild(renderEvents(filteredFuturetArray));
      upDateTripDates();
      break;
    default:
      siteEventElement.appendChild(renderEvents(currentMockArray));
      upDateTripDates();
  }
});
