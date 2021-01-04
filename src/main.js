import TripInfo from "./view/page-header/info.js";
import SiteMenuControls from "./view/page-header/controls.js";
import {RenderPosition, render} from "./utils/render.js";
import {getAllEventsSum, eventMockData, headerCities} from "./mock/data.js";
import {updateTripEvents, onChangeTimeFilter} from "./utils/filter.js";
import {generateTripFilterForm} from "./view/trip-filters/trip-filters.js";
import AddForm from "./view/trip-event-form/add-form";
import {addFormPartsTemplate} from "./view/trip-event-form/form-templates.js";

const pageMainElement = document.querySelector(`.page-body__page-main`);
const siteMainElement = document.querySelector(`.trip-main`);
const siteControlElement = document.querySelector(`.trip-controls`);
const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);

const removeAddForm = () => {
  const addForm = pageMainElement.querySelector(`.event--edit`);
  addForm.parentElement.removeChild(addForm);
  newEventBtn.addEventListener(`click`, onNewEventBtnPress);
};

const onNewEventBtnPress = () => {
  new AddForm(addFormPartsTemplate()).render();
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

render(siteMainElement, new TripInfo(headerCities), RenderPosition.AFTER_BEGIN);
render(siteControlElement, new SiteMenuControls(), RenderPosition.BEFORE_END);
render(siteControlElement, generateTripFilterForm(), RenderPosition.BEFORE_END);

updateTripEvents(eventMockData);
updateTripTotalSum();
onChangeTimeFilter();
