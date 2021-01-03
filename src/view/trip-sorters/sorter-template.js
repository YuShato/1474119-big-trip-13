import Sorter from "./sorter.js";
import SorterForm from "./sorter-form.js";
import {generateTemplatesUsingClass} from "../../utils/utils.js";
import {RenderPosition, render} from "../../utils/render.js";

const pageMainElement = document.querySelector(`.page-main`);

const sorters = [
  {
    name: `Day`,
    isChecked: true,
    isDisable: false
  },
  {
    name: `Event`,
    isChecked: false,
    isDisable: true
  },
  {
    name: `Time`,
    isChecked: false,
    isDisable: false
  },
  {
    name: `Price`,
    isChecked: false,
    isDisable: false
  },
  {
    name: `Offers`,
    isChecked: false,
    isDisable: true
  }
];

const generateSorterTemplatesHtml = () => generateTemplatesUsingClass(sorters, Sorter);

const renderSorterForm = () => {
  const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
  render(tripEventsElement, new SorterForm(generateSorterTemplatesHtml()), RenderPosition.AFTER_BEGIN);
  return tripEventsElement;
};

export {
  renderSorterForm
};
