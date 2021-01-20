import {createContainerElement} from "../utils/utils.js";
import {RenderPosition, render} from "../utils/render.js";
import Point from "./point.js";

const siteEventElement = document.querySelector(`.trip-events`);

export default class EventsList {
  constructor(array) {
    this._array = array;
    this._siteEventElement = siteEventElement;
  }

  init() {
    const fragment = createContainerElement(`ul`, `trip-events__list`);
    this._siteEventElement.innerHTML = ``;
    for (let i = 0; i < this._array.length; i++) {
      this._tripEvent = new Point(this._array, i).init();
      render(fragment, this._tripEvent, RenderPosition.BEFORE_END);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    }
    return fragment;
  }
}
