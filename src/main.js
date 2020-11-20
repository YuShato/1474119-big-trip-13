import {
  render
} from "./view/render.js";
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
  createEventList
} from "./view/eventList.js";
import {
  createEditForm
} from "./view/editForm.js";
import {
  createTripPoint
} from "./view/tripPoint.js";

const EVENTS_COUNT = 3;

const templatePosition = {
  BEFORE_BEGIN: `beforebegin`,
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
  AFTER_END: `afterend`
};

const siteMainElement = document.querySelector(`.trip-main`);
const siteControlElement = document.querySelector(`.trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);


render(siteMainElement, createTripInfo(), templatePosition.AFTER_BEGIN);
render(siteControlElement, createTripControls(), templatePosition.BEFORE_END);
render(siteControlElement, createTripFilter(), templatePosition.BEFORE_END);
render(siteEventElement, createTripSorter(), templatePosition.BEFORE_END);
render(siteEventElement, createEventList(), templatePosition.BEFORE_END);

const tripEventsListElement = siteEventElement.querySelector(`.trip-events__list`);
render(tripEventsListElement, createEditForm(), templatePosition.BEFORE_END);

for (let i = 0; i < EVENTS_COUNT; i++) {
  render(tripEventsListElement, createTripPoint(), templatePosition.BEFORE_END);
}
