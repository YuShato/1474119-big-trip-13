import {createTripInfoTemplate} from "./view/page-header/info.js";
import {createTripControlsTemplate} from "./view/page-header/controls.js";
import {RenderPosition, renderTemplate} from "./utils/utils.js";
import {getAllEventsSum, eventMockData, headerCities} from "./mock/data.js";
import {updateTripEvents, onChangeTimeFilter} from "./utils/filter.js";
import {generateTripFilterForm} from "./view/trip-filters/trip-filters.js";
import {createAddFormTemplate} from "./view/trip-add-new-event-form/add-form";
import {addFormPartsTemplate} from "./view/trip-add-new-event-form/add-form-template.js";

const pageMainElement = document.querySelector(`.page-body__page-main`);
const siteMainElement = document.querySelector(`.trip-main`);
const siteControlElement = document.querySelector(`.trip-controls`);
const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);

const renderAddForm = () => {
  const tripEventsListElement = siteEventElement.querySelector(`.trip-events__list`);
  renderTemplate(tripEventsListElement, createAddFormTemplate(addFormPartsTemplate()), RenderPosition.AFTER_BEGIN);
};

const removeAddForm = () => {
  const addForm = pageMainElement.querySelector(`.event--edit`);
  addForm.parentElement.removeChild(addForm);
  newEventBtn.addEventListener(`click`, onNewEventBtnPress);
};

const onNewEventBtnPress = () => {
  renderAddForm();
  newEventBtn.removeEventListener(`click`, onNewEventBtnPress);
  const formCancelBtn = pageMainElement.querySelector(`.event__reset-btn`);
  formCancelBtn.addEventListener(`click`, removeAddForm);
};

const updateTripTotalSum = () => {
  const totalSum = document.querySelector(`.trip-info__cost-value`);
  totalSum.textContent = getAllEventsSum(eventMockData);
};

newEventBtn.addEventListener(`click`, onNewEventBtnPress);
newEventBtn.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    onNewEventBtnPress();
  }
});

renderTemplate(siteMainElement, createTripInfoTemplate(headerCities), RenderPosition.AFTER_BEGIN);
renderTemplate(siteControlElement, createTripControlsTemplate(), RenderPosition.BEFORE_END);
renderTemplate(siteControlElement, generateTripFilterForm(), RenderPosition.BEFORE_END);

updateTripEvents(eventMockData);
updateTripTotalSum();
onChangeTimeFilter();
