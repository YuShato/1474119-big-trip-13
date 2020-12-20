import {TemplatePosition, render, createDivContainer} from "../../utils/utils.js";
import {generateSorterForm} from "../trip-sorters/sorter-template.js";
import {createTripPoint} from "./point.js";


const pageMainElement = document.querySelector(`.page-main`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);

const renderEvents = (array) => {
  const fragment = document.createElement(`ul`);
  fragment.className = `trip-events__list`;
  siteEventElement.innerHTML = ``;
  for (let i = 0; i < array.length; i++) {
    render(fragment, generateTripPoints(array, i), TemplatePosition.BEFORE_END);
  }
  generateSorterForm();
  return fragment;
};

const generateTripPoints = (array, i) => {
  const fragment = createDivContainer();
  render(fragment, createTripPoint(array[i]), TemplatePosition.BEFORE_END);
  return fragment.innerHTML;
};

export {
  renderEvents
};

