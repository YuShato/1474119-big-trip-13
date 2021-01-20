import {eventMockData} from "./mock/data.js";
import Events from "./presenter/events.js";
import Form from "./presenter/form.js";

const pageMainElement = document.querySelector(`.page-body__page-main`);
const newEventBtn = document.querySelector(`.trip-main__event-add-btn`);
const siteMainElement = document.querySelector(`.trip-main`);
const siteControlElement = document.querySelector(`.trip-controls`);
const siteEventElement = pageMainElement.querySelector(`.trip-events`);
let createdEditForm = null;

new Events(siteMainElement, siteEventElement, siteControlElement).init(eventMockData);

const addNewEventForm = () => {
  if (!createdEditForm) {
    createdEditForm = new Form();
    createdEditForm.clickNewEventBtnHandler();
  }
};

const removeNewEventForm = (evt) => {
  if (evt.key === `Esc` || evt.key === `Escape`) {
    if (createdEditForm) {
      createdEditForm.removeAddForm();
      createdEditForm = null;
      newEventBtn.addEventListener(`click`, addNewEventForm);
    }
  }
};

newEventBtn.addEventListener(`click`, addNewEventForm);

document.addEventListener(`keydown`, (evt) => removeNewEventForm(evt));
