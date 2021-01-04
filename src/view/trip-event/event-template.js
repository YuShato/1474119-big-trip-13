import {createContainerElement} from "../../utils/utils.js";
import {RenderPosition, render, replace} from "../../utils/render.js";
import TripPoint from "./point.js";
import EditForm from "../trip-event-form/edit-form.js";

let closedEditFormFlag = true;

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
  const evtComponent = new TripPoint(array[i]);
  const editFormComponent = new EditForm(array[i]);

  const itemToForm = () => {
    closedEditFormFlag = false;
    replace(editFormComponent, evtComponent);
  };

  const formToItem = () => {
    closedEditFormFlag = true;
    replace(evtComponent, editFormComponent);
  };

  const onEscKeyDown = (evt) => {
    evt.preventDefault();
    if (evt.key === `Escape`) {
      formToItem();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  evtComponent.setClickArrowHandler(() => {
    if (closedEditFormFlag) {
      itemToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    }
  });

  editFormComponent.setSubmitHandler(() => {
    formToItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  editFormComponent.setClickArrowHandler(() => {
    formToItem();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(fragment, evtComponent, RenderPosition.BEFORE_END);
  return fragment;
};


export {
  generateEvents
};
