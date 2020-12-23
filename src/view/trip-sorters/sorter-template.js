import {createSorterTemplate} from "./sorter.js";
import {createSorterFormTemplate} from "./sorter-form.js";
import {TemplatePosition, render, generateTemplatesFromData} from "../../utils/utils.js";

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

const generateSorterTemplatesHtml = () => generateTemplatesFromData(sorters, createSorterTemplate);

const renderSorterForm = () => {
  const tripEventsElement = pageMainElement.querySelector(`.trip-events`);
  render(tripEventsElement, createSorterFormTemplate(generateSorterTemplatesHtml()), TemplatePosition.AFTER_BEGIN);
  return tripEventsElement;
};

export {
  renderSorterForm
};
