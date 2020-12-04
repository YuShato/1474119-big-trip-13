import {
  createTripInfo
} from "./view/tripInfo.js";
import {
  createTripControls
} from "./view/tripControls.js";
import {
  createTripFilter
} from "./view/tripFilter.js";
import {
  createTripSorter
} from "./view/tripSorter.js";
import {
  createAddForm
} from "./view/addForm.js";
import {
  createTripPoint
} from "./view/tripPoint.js";
import {
  templatePosition,
  render
} from "./utils/utils.js";
import {
  getSum,
  currentMockArray,
  OFFERS_COUNT
} from "./view/mock/data.js";

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

const renderEvents = () => {
  const fragment = document.createElement(`ul`);
  fragment.className = `trip-events__list`;
  for (let i = 0; i < OFFERS_COUNT; i++) {
    render(fragment, createTripPoint(currentMockArray[i]), templatePosition.BEFORE_END);
  }
  return fragment;
};

render(siteMainElement, createTripInfo(), templatePosition.AFTER_BEGIN);
render(siteControlElement, createTripControls(), templatePosition.BEFORE_END);
render(siteControlElement, createTripFilter(), templatePosition.BEFORE_END);
render(siteEventElement, createTripSorter(), templatePosition.BEFORE_END);
siteEventElement.appendChild(renderEvents());
const totalSum = document.querySelector(`.trip-info__cost-value`);
const tripEventsListElement = siteEventElement.querySelector(`.trip-events__list`);

newEventBtn.addEventListener(`click`, onEventBtnPress);
newEventBtn.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    onEventBtnPress();
  }
});

totalSum.textContent = getSum();
