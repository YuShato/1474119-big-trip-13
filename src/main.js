import {createTripInfo} from "./view/info.js";
import {createTripControls} from "./view/controls.js";
import {TemplatePosition, render} from "./utils/utils.js";
import {getSum, eventMockData, headerCities} from "./mock/data.js";
import {generateTripFilterForm, updateTripDates, renderEvents, siteEventElement} from "./utils/templates.js";
import {filteredPastArray, filteredFuturetArray} from "./mock/filter.js";
import {generateAddForm, generateFormOffers, eventTypeUpdate, updateFormDescription} from "./utils/form-template.js";

const siteMainElement = document.querySelector(`.trip-main`);
const siteControlElement = document.querySelector(`.trip-controls`);
const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);

const removeAddForm = () => {
  const addForm = siteEventElement.querySelector(`.trip-events__item:first-child`);
  const closeAddFormBtn = addForm.querySelector(`.event__reset-btn`);
  closeAddFormBtn.addEventListener(`click`, () => {
    addForm.parentElement.removeChild(addForm);
    newEventBtn.addEventListener(`click`, onEventBtnPress);
  });
};

const onEventBtnPress = () => {
  const tripEventsListElement = siteEventElement.querySelector(`.trip-events__list`);
  render(tripEventsListElement, generateAddForm(), TemplatePosition.AFTER_BEGIN);
  eventTypeUpdate();
  generateFormOffers();
  updateFormDescription();
  newEventBtn.removeEventListener(`click`, onEventBtnPress);
  removeAddForm();
};

render(siteMainElement, createTripInfo(headerCities), TemplatePosition.AFTER_BEGIN);
render(siteControlElement, createTripControls(), TemplatePosition.BEFORE_END);
generateTripFilterForm();
siteEventElement.appendChild(renderEvents(eventMockData));
const totalSum = document.querySelector(`.trip-info__cost-value`);

newEventBtn.addEventListener(`click`, onEventBtnPress);
newEventBtn.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    onEventBtnPress();
  }
});

totalSum.textContent = getSum();
updateTripDates();

const tripFilterElements = document.querySelector(`.trip-filters`);

tripFilterElements.addEventListener(`click`, (evt) => {
  switch (evt.target.value) {
    case `past`:
      siteEventElement.appendChild(renderEvents(filteredPastArray));
      updateTripDates();
      break;
    case `future`:
      siteEventElement.appendChild(renderEvents(filteredFuturetArray));
      updateTripDates();
      break;
    default:
      siteEventElement.appendChild(renderEvents(eventMockData));
      updateTripDates();
  }
});
