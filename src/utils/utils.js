import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {render, RenderPosition} from "./render.js";
import {TripTimeFormats} from "../const.js";

dayjs.extend(duration);

export const generateTemplatesUsingClass = (data, Class) => {
  const fragment = renderCollectionUsingClass(data, Class);
  return fragment.innerHTML;
};

export const createContainerElement = (elem, className) => {
  const newFragment = document.createElement(elem);
  newFragment.className = className;
  return newFragment;
};

export const createElement = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;
  return container.firstChild;
};

export const renderCollectionUsingClass = (data, ClassName) => {
  const fragment = createContainerElement(`div`);
  for (let i = 0; i < data.length; i++) {
    const element = new ClassName(data[i]).getElement();
    render(fragment, element, RenderPosition.BEFORE_END);
  }
  return fragment;
};

export const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format(TripTimeFormats.TRIP_INFO_START_DATE_FORMAT);

export const humanizeTaskDueTime = (dueDate) => dayjs(dueDate).format(TripTimeFormats.TIME_FORMAT);

export const timeGap = (startTime, endTime) => dayjs.duration(endTime.diff(startTime)).format(TripTimeFormats.TRIP_TIME_FORMAT);

export const getTodayDate = () => dayjs().format(TripTimeFormats.FULL_DATE_FORMAT);
