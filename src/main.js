import TripInfo from "./view/page-header/trip-info.js";
import SiteMenuControls from "./view/page-header/site-menu-controls.js";
import {RenderPosition, render} from "./utils/render.js";
import {getAllEventsSum, eventMockData, headerCities} from "./mock/data.js";
import {generateTripFilterForm} from "./view/trip-filters/trip-filters-template.js";
import AddForm from "./view/trip-event-form/add-form";
import {addFormPartsTemplate} from "./view/trip-event-form/form-templates.js";
import {updateTripDates} from "./view/page-header/header-templates.js";
import {generateEvents} from "./view/trip-event/event-template.js";
import EmptyContainer from "./view/trip-event/empty-container.js";
import {renderSorterForm} from "./view/trip-sorters/sorter-template.js";
import {getPastEvents, getFutureEvents} from "./utils/filter.js";

const pageMainElement = document.querySelector(`.page-body__page-main`);
const siteMainElement = document.querySelector(`.trip-main`);
const siteControlElement = document.querySelector(`.trip-controls`);
const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);

const removeAddForm = () => {
  const addForm = pageMainElement.querySelector(`.event--edit`);
  addForm.parentElement.removeChild(addForm);
  newEventBtn.addEventListener(`click`, onNewEventBtnPress);
};

const onNewEventBtnPress = () => {
  const eventsListElement = document.querySelector(`.trip-events__list`);

  render(eventsListElement, new AddForm(addFormPartsTemplate()), RenderPosition.AFTER_BEGIN);
  newEventBtn.removeEventListener(`click`, onNewEventBtnPress);

  const formCancelBtn = pageMainElement.querySelector(`.event__reset-btn`);
  formCancelBtn.addEventListener(`click`, removeAddForm);
};

const updateTripTotalSum = () => {
  const totalSum = document.querySelector(`.trip-info__cost-value`);
  totalSum.textContent = getAllEventsSum(eventMockData);
};

const updateTripEvents = (events) => {
  render(
      siteEventElement,
      (events.length === 0 || !events) ? new EmptyContainer() : generateEvents(events),
      RenderPosition.BEFORE_END
  );

  updateTripDates(events);
  renderSorterForm();
};

const onChangeTimeFilter = () => {
  const tripFilterElements = document.querySelector(`.trip-filters`);
  tripFilterElements.addEventListener(`click`, (evt) => {
    switch (evt.target.value) {
      case `past`:
        updateTripEvents(getPastEvents(eventMockData));
        break;
      case `future`:
        updateTripEvents(getFutureEvents(eventMockData));
        break;
      default:
        updateTripEvents(eventMockData);
    }
  });
};

render(siteMainElement, new TripInfo(headerCities), RenderPosition.AFTER_BEGIN);
render(siteControlElement, new SiteMenuControls(), RenderPosition.BEFORE_END);
render(siteControlElement, generateTripFilterForm(), RenderPosition.BEFORE_END);

updateTripEvents(eventMockData);
updateTripTotalSum();
onChangeTimeFilter();

newEventBtn.addEventListener(`click`, onNewEventBtnPress);
newEventBtn.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    onNewEventBtnPress();
  }
});
