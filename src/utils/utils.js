import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

const TemplatePosition = {
  AFTER_BEGIN: `afterbegin`,
  AFTER_END: `afterend`,
  BEFORE_END: `beforeend`,
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const generateTemplatesFromData = (data, callBack) => {
  const fragment = renderCollectionUsingCallback(data, callBack);
  return fragment.innerHTML;
};

const createContainerElement = (elem, className) => {
  const newFragment = document.createElement(elem);
  newFragment.className = className;
  return newFragment;
};

const renderCollectionUsingCallback = (data, callBack) => {
  const fragment = createContainerElement(`div`);
  for (let i = 0; i < data.length; i++) {
    const element = callBack(data[i]);
    render(fragment, element, TemplatePosition.BEFORE_END);
  }
  return fragment;
};

const getRandomInt = (minValue, maxValue) => Math.floor(minValue + Math.random() * (maxValue - minValue + 1));

const getRandomBoolean = () => !!getRandomInt(0, 1);

const getRandomPositiveInt = (maxValue) => getRandomInt(0, maxValue);

const getArrayRandomElement = (array) => array[getRandomPositiveInt(array.length - 1)];

const humanizeTaskDueDate = (dueDate) => dayjs(dueDate).format(`MMM DD`);

const humanizeTaskDueTime = (dueDate) => dayjs(dueDate).format(`HH:MM`);

const timeGap = (startTime, endTime) => dayjs.duration(endTime.diff(startTime)).format(`H[H] MM[M]`);

const getRandomProperty = function (obj) {
  const keys = Object.keys(obj);
  return obj[keys[keys.length * Math.random() << 0]];
};

export {
  TemplatePosition,
  render,
  getRandomInt,
  getRandomBoolean,
  getRandomPositiveInt,
  getArrayRandomElement,
  timeGap,
  humanizeTaskDueDate,
  humanizeTaskDueTime,
  generateTemplatesFromData,
  createContainerElement,
  getRandomProperty
};
