import {createTripInfoTemplate} from "./view/page-header/info.js";
import {createTripControlsTemplate} from "./view/page-header/controls.js";
import {TemplatePosition, render} from "./utils/utils.js";
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
  render(tripEventsListElement, createAddFormTemplate(addFormPartsTemplate()), TemplatePosition.AFTER_BEGIN);
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

render(siteMainElement, createTripInfoTemplate(headerCities), TemplatePosition.AFTER_BEGIN);
render(siteControlElement, createTripControlsTemplate(), TemplatePosition.BEFORE_END);
render(siteControlElement, generateTripFilterForm(), TemplatePosition.BEFORE_END);

updateTripEvents(eventMockData);
updateTripTotalSum();
onChangeTimeFilter();
