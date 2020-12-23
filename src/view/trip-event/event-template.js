import {TemplatePosition, render, createContainerElement} from "../../utils/utils.js";
import {createTripPointTemplate} from "./point.js";


const pageMainElement = document.querySelector(`.page-main`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);

const generateEvents = (array) => {
  const fragment = createContainerElement(`ul`, `trip-events__list`);
  siteEventElement.innerHTML = ``;
  for (let i = 0; i < array.length; i++) {
    render(fragment, generateTripPoints(array, i), TemplatePosition.BEFORE_END);
  }
  return fragment;
};

const generateTripPoints = (array, i) => {
  const fragment = createContainerElement(`div`);
  render(fragment, createTripPointTemplate(array[i]), TemplatePosition.BEFORE_END);
  return fragment.innerHTML;
};

export {
  generateEvents
};
