import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {render, RenderPosition} from "../utils/render.js";

dayjs.extend(duration);

export const generateTemplatesFromData = (data, callBack) => {
  const fragment = renderCollectionUsingCallback(data, callBack);
  return fragment;
};

export const createContainerElement = (elem, className) => {
  const newFragment = document.createElement(elem);
  newFragment.className = className;
  return newFragment;
};

export const renderCollectionUsingCallback = (data, callBack) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < data.length; i++) {
    const element = callBack(data[i]);
    render(fragment, element, RenderPosition.BEFORE_END);
  }
  return fragment;
};

export const renderCollectionUsingClass = (data, Class) => {
  const fragment = createContainerElement(`div`);
  for (let i = 0; i < data.length; i++) {
    const element = new Class(data[i]).getElement();
    render(fragment, element, RenderPosition.BEFORE_END);
  }
  return fragment;
};

export const generateTemplatesUsingClass = (data, Class) => {
  const fragment = renderCollectionUsingClass(data, Class);
  return fragment.innerHTML;
};

export const getRandomInt = (minValue, maxValue) => Math.floor(minValue + Math.random() * (maxValue - minValue + 1));

export const getRandomBoolean = () => !!getRandomInt(0, 1);

export const getRandomPositiveInt = (maxValue) => getRandomInt(0, maxValue);

export const getArrayRandomElement = (array) => array[getRandomPositiveInt(array.length - 1)];

export const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format(`MMM DD`);

export const humanizeTaskDueTime = (dueDate) => dayjs(dueDate).format(`HH:MM`);

export const timeGap = (startTime, endTime) => dayjs.duration(endTime.diff(startTime)).format(`H[H] MM[M]`);

export const getRandomProperty = function (obj) {
  const keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
};

export const createElement = (template) => {
  const container = document.createElement(`div`);
  container.innerHTML = template;

  return container.firstChild;
};


