import {createContainerElement} from "../../utils/utils.js";
import {RenderPosition, render} from "../../utils/render.js";
import TripPoint from "./point.js";

const pageMainElement = document.querySelector(`.page-main`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);

const generateEvents = (array) => {
  const fragment = createContainerElement(`ul`, `trip-events__list`);
  siteEventElement.innerHTML = ``;
  for (let i = 0; i < array.length; i++) {
    render(fragment, generateTripPoints(array, i), RenderPosition.BEFORE_END);
  }
  return fragment;
};

const generateTripPoints = (array, i) => {
  const fragment = document.createDocumentFragment();
  render(fragment, new TripPoint(array[i]), RenderPosition.BEFORE_END);
  return fragment;
};

export {
  generateEvents
};
