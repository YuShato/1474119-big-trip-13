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
      render(fragment, new Point(this._array, i).init(), RenderPosition.BEFORE_END);
    }
    return fragment;
  }
}
