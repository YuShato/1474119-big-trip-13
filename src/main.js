import {eventMockData} from "./mock/data.js";
import Events from "./presenter/events.js";
import Form from "./presenter/form.js";
import {render, RenderPosition} from "./utils/render.js";

const pageMainElement = document.querySelector(`.page-body__page-main`);
const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);
const siteMainElement = document.querySelector(`.trip-main`);
const siteControlElement = document.querySelector(`.trip-controls`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);
let isNewEventFormOpen = false;

new Events(siteMainElement, siteEventElement, siteControlElement).init(eventMockData);

newEventBtn.addEventListener(`click`, () => {
  const tripEventsListElement = siteEventElement.querySelector(`.trip-events__list`);

  if (!isNewEventFormOpen) {
    render(tripEventsListElement, new Form().init(), RenderPosition.AFTER_BEGIN);
    isNewEventFormOpen = true;
  }
});
