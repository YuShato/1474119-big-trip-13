import {createTripInfo} from "./view/page-header/info.js";
import {createTripControls} from "./view/page-header/controls.js";
import {TemplatePosition, render} from "./utils/utils.js";
import {getAllEventsSum, eventMockData, headerCities} from "./mock/data.js";
import {updateTripEvents, onChangeTimeFilter} from "./utils/filter.js";
import {createTripFilterForm} from "./view/trip-filters/trip-filters.js";
import {createAddForm} from "./view/trip-add-new-event-form/add-form";
import {addFormTemplate} from "./view/trip-add-new-event-form/add-form-template.js";

const pageMainElement = document.querySelector(`.page-body__page-main`);
const siteMainElement = document.querySelector(`.trip-main`);
const siteControlElement = document.querySelector(`.trip-controls`);
const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);

const generateAddForm = () => {
  const tripEventsListElement = siteEventElement.querySelector(`.trip-events__list`);
  render(tripEventsListElement, createAddForm(addFormTemplate()), TemplatePosition.AFTER_BEGIN);
};

const removeAddForm = () => {
  const addForm = pageMainElement.querySelector(`.event--edit`);
  addForm.parentElement.removeChild(addForm);
  newEventBtn.addEventListener(`click`, onNewEventBtnPress);
};

const onNewEventBtnPress = () => {
  generateAddForm();
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

render(siteMainElement, createTripInfo(headerCities), TemplatePosition.AFTER_BEGIN);
render(siteControlElement, createTripControls(), TemplatePosition.BEFORE_END);
render(siteControlElement, createTripFilterForm(), TemplatePosition.BEFORE_END);

updateTripEvents(eventMockData);
updateTripTotalSum();
onChangeTimeFilter();
