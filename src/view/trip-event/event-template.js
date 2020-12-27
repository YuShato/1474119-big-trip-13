import {RenderPosition, renderTemplate, createContainerElement} from "../../utils/utils.js";
import TripPoint from "./point.js";


const pageMainElement = document.querySelector(`.page-main`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);

const generateEvents = (array) => {
  const fragment = createContainerElement(`ul`, `trip-events__list`);
  siteEventElement.innerHTML = ``;
  for (let i = 0; i < array.length; i++) {
    renderTemplate(fragment, generateTripPoints(array, i), RenderPosition.BEFORE_END);
  }
  return fragment;
};

const generateTripPoints = (array, i) => {
  const fragment = createContainerElement(`div`);
  renderTemplate(fragment, new TripPoint(array[i]).getElement(), RenderPosition.BEFORE_END);
  return fragment.innerHTML;
};

export {
  generateEvents
};
