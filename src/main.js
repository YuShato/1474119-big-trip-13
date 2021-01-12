import {RenderPosition, render} from "./utils/render.js";
import {eventMockData} from "./mock/data.js";
import AddForm from "./view/trip-event-form/add-form";
import {addFormPartsTemplate} from "./view/trip-event-form/form-templates.js";
import {getPastEvents, getFutureEvents} from "./utils/filter.js";
import Events from "./presenter/events.js";

const pageMainElement = document.querySelector(`.page-body__page-main`);
const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);
const siteMainElement = document.querySelector(`.trip-main`);
const siteControlElement = document.querySelector(`.trip-controls`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);
const futureEvents = getFutureEvents(eventMockData);
const pastEvents = getPastEvents(eventMockData);

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

// const onChangeTimeFilter = () => {
//   const tripFilterElements = document.querySelector(`.trip-filters`);
//   tripFilterElements.addEventListener(`click`, (evt) => {
//     switch (evt.target.value) {
//       case `past`:
//         new Events(siteMainElement, siteEventElement, siteControlElement).renderEventsList(pastEvents);
//         break;
//       case `future`:
//         new Events(siteMainElement, siteEventElement, siteControlElement).renderEventsList(futureEvents);
//         break;
//       default:
//         new Events(siteMainElement, siteEventElement, siteControlElement).renderEventsList(eventMockData);
//     }
//   });
// };

new Events(siteMainElement, siteEventElement, siteControlElement).init(eventMockData);

// onChangeTimeFilter();

newEventBtn.addEventListener(`click`, onNewEventBtnPress);
newEventBtn.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    onNewEventBtnPress();
  }
});

