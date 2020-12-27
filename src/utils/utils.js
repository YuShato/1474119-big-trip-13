import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export const RenderPosition = {
  AFTER_BEGIN: `afterbegin`,
  AFTER_END: `afterend`,
  BEFORE_END: `beforeend`,
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const generateTemplatesFromData = (data, callBack) => {
  const fragment = renderCollectionUsingCallback(data, callBack);
  return fragment.innerHTML;
};

export const createContainerElement = (elem, className) => {
  const newFragment = document.createElement(elem);
  newFragment.className = className;
  return newFragment;
};

export const renderCollectionUsingCallback = (data, callBack) => {
  const fragment = createContainerElement(`div`);
  for (let i = 0; i < data.length; i++) {
    const element = callBack(data[i]);
    renderTemplate(fragment, element, RenderPosition.BEFORE_END);
  }
  return fragment;
};

export const renderCollectionUsingClass = (data, Class) => {
  const fragment = createContainerElement(`div`);
  for (let i = 0; i < data.length; i++) {
    const element = new Class(data[i]).getElement();
    renderTemplate(fragment, element, RenderPosition.BEFORE_END);
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
