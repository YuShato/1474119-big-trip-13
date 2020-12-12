import {TemplatePosition, render, generateTemplateElements, createDivContainer} from "./utils";
import {filters, sorters} from "../mock/data.js";
import {createTripFilter} from "../view/filter.js";
import {createTripFilterForm} from "../view/filterForm.js";
import {createButtonAccept} from "../view/acceptButton.js";
import {tripInfoDates} from "../view/dates.js";
import {createSorter} from "../view/sorter.js";
import {createSorterForm} from "../view/sorterForm.js";
import {createTripPoint} from "../view/point.js";
import {createEventOffer} from "../view/eventOffer.js";
import {sortEventsByDate} from "../mock/filter";

const siteControlElement = document.querySelector(`.trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);

const renderEvents = (array) => {
  const fragment = document.createElement(`ul`);
  fragment.className = `trip-events__list`;
  siteEventElement.innerHTML = ``;
  for (let i = 0; i < array.length; i++) {
    render(fragment, addFormOffers(array, i), TemplatePosition.BEFORE_END);
  }
  generateSorterForm();
  return fragment;
};

const addFormOffers = (array, i) => {
  const fragment = createDivContainer();
  render(fragment, createTripPoint(array[i]), TemplatePosition.BEFORE_END);
  const offerContainer = fragment.querySelector(`.trip-offers`);
  render(offerContainer, generateEventOffers(array, i), TemplatePosition.BEFORE_END);
  return fragment.innerHTML;
};

const generateEventOffers = (array, i) => {
  const fragment = createDivContainer();
  const offersListElement = document.createElement(`ul`);
  offersListElement.className = `event__selected-offers`;

  const checkedOffers = array[i].offers.filter((elem) => elem.isChecked === `checked`);
  render(offersListElement, generateTemplateElements(checkedOffers, createEventOffer), TemplatePosition.BEFORE_END);
  fragment.appendChild(offersListElement);
  return fragment.innerHTML;
};

const upDateTripDates = () => {
  const tripInfoElement = document.querySelector(`.trip-info__main`);
  const allCreatedDates = tripInfoElement.querySelectorAll(`.trip-info__dates`);
  for (let i = 0; i < allCreatedDates.length; i++) {
    allCreatedDates[i].parentElement.removeChild(allCreatedDates[i]);
  }
  render(tripInfoElement, tripInfoDates(sortEventsByDate()), TemplatePosition.BEFORE_END);
};

const generateTripFilterForm = () => {
  render(siteControlElement, createTripFilterForm(), TemplatePosition.BEFORE_END);
  const tripFormElement = document.querySelector(`.trip-filters`);
  render(tripFormElement, generateTemplateElements(filters, createTripFilter), TemplatePosition.AFTER_BEGIN);
  render(tripFormElement, createButtonAccept(), TemplatePosition.BEFORE_END);
  return tripFormElement;
};

const generateSorterForm = () => {
  const tripEventsElement = document.querySelector(`.trip-events`);
  render(tripEventsElement, createSorterForm(), TemplatePosition.AFTER_BEGIN);
  const sorterFormElement = document.querySelector(`.trip-events__trip-sort`);
  render(sorterFormElement, generateTemplateElements(sorters, createSorter), TemplatePosition.BEFORE_END);
  return sorterFormElement;
};

export {
  generateTripFilterForm,
  upDateTripDates,
  siteControlElement,
  generateSorterForm,
  renderEvents,
  siteEventElement
};
