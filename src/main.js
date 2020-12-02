import {createTripInfo} from "./view/tripInfo.js";
import {createTripControls} from "./view/tripControls.js";
import {createTripFilter} from "./view/tripFilter.js";
import {createTripSorter} from "./view/tripSorter.js";
import {createEventList} from "./view/eventList.js";
import {createEditForm} from "./view/editForm.js";
import {createAddForm} from "./view/addForm.js";
import {createFormOffer} from "./view/formOffer.js";
import {renderEvents, generateTripPointOffer} from "./view/tripPoint.js";
import {templatePosition, render} from "./utils/utils.js";
import {getSum} from "./view/mock/data.js";

const siteMainElement = document.querySelector(`.trip-main`);
const siteControlElement = document.querySelector(`.trip-controls`);
const pageMainElement = document.querySelector(`.page-main`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);
const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);

const onEventBtnPress = () => {
  const removeAddForm = () => {
    const addForm = tripEventsListElement.querySelector(`.trip-events__item:first-child`);
    const closeAddFormBtn = addForm.querySelector(`.event__reset-btn`);
    closeAddFormBtn.addEventListener(`click`, () => {
      addForm.parentElement.removeChild(addForm);
      newEventBtn.addEventListener(`click`, onEventBtnPress);
    });
  };
  render(tripEventsListElement, createAddForm(), templatePosition.AFTER_BEGIN);
  newEventBtn.removeEventListener(`click`, onEventBtnPress);
  renderFormOffer();
  removeAddForm();
};

const renderFormOffer = () => {
  const offerContainerElements = document.querySelectorAll(`.event__section--offers`);
  for (let i = 0; i < offerContainerElements.length; i++) {
    offerContainerElements[i].appendChild(createFormOffer());
  }
};


render(siteMainElement, createTripInfo(), templatePosition.AFTER_BEGIN);
render(siteControlElement, createTripControls(), templatePosition.BEFORE_END);
render(siteControlElement, createTripFilter(), templatePosition.BEFORE_END);
render(siteEventElement, createTripSorter(), templatePosition.BEFORE_END);
render(siteEventElement, createEventList(), templatePosition.BEFORE_END);
const totalSum = document.querySelector(`.trip-info__cost-value`);
const tripEventsListElement = siteEventElement.querySelector(`.trip-events__list`);

newEventBtn.addEventListener(`click`, onEventBtnPress);
newEventBtn.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    onEventBtnPress();
  }
});

tripEventsListElement.appendChild(renderEvents());

const renderTripOffer = () => {
  const tripOfferElements = document.querySelectorAll(`.trip-offers`);
  for (let i = 0; i < tripOfferElements.length; i++) {
    tripOfferElements[i].appendChild(generateTripPointOffer());
  }
};

renderTripOffer();
totalSum.textContent = getSum();

const rollUpButtons = document.querySelectorAll(`.event__rollup-btn`);
const events = document.querySelectorAll(`.trip-events__item`);
rollUpButtons.forEach((button, i) => {
  const addEditForm = () => {
    const removeEditForm = () => {
      const editForm = document.querySelector(`.event--edit`);
      const closeEditFormBtn = editForm.querySelector(`.event__rollup-btn`);
      closeEditFormBtn.addEventListener(`click`, () => {
        editForm.parentElement.removeChild(editForm);
        rollUpButtons[i].addEventListener(`click`, addEditForm);
      });
    };

    render(events[i], createEditForm(), templatePosition.BEFORE_END);
    rollUpButtons[i].removeEventListener(`click`, addEditForm);
    renderFormOffer();
    removeEditForm(i);
  };

  rollUpButtons[i].addEventListener(`click`, addEditForm);
});
