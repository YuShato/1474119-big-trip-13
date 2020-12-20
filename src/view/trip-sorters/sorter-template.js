import {createSorter} from "./sorter.js";
import {createSorterForm} from "./sorter-form.js";
import {TemplatePosition, render, generateTemplateElements} from "../../utils/utils.js";

const pageMainElement = document.querySelector(`.page-main`);

const sorters = [
  {
    name: `Day`,
    isChecked: `checked`,
    isDisable: ``
  },
  {
    name: `Event`,
    isChecked: ``,
    isDisable: `disabled`
  },
  {
    name: `Time`,
    isChecked: ``,
    isDisable: ``
  },
  {
    name: `Price`,
    isChecked: ``,
    isDisable: ``
  },
  {
    name: `Offers`,
    isChecked: ``,
    isDisable: `disabled`
  }
];

const generateSorterTemplatesHtml = () => generateTemplateElements(sorters, createSorter);

const generateSorterForm = () => {
  const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
  render(tripEventsElement, createSorterForm(generateSorterTemplatesHtml()), TemplatePosition.AFTER_BEGIN);
  return tripEventsElement;
};

export {
  generateSorterForm
};
