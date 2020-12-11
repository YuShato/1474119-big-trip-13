import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(duration);

dayjs.extend(updateLocale);

dayjs.updateLocale(`en`, {
  relativeTime: {
    m: `M`,
    H: `H`,
    d: `D`,
  }
});

const TemplatePosition = {
  AFTER_BEGIN: `afterbegin`,
  AFTER_END: `afterend`,
  BEFORE_END: `beforeend`,
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const generateTemplateElements = (data, callBack) => {
  const fragment = generateTemplate(data, callBack);
  return fragment.innerHTML;
};

const createDivContainer = (className) => {
  const newFragment = document.createElement(`div`);
  newFragment.className = className;
  return newFragment;
};

const generateTemplate = (data, callBack) => {
  const fragment = createDivContainer();
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

const timeGap = (startTime, endTime) => dayjs.duration(endTime.diff(startTime)).format(`HH:MM`);

const updateLocaleTime = (time) => dayjs.updateLocale(time);

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
  generateTemplateElements,
  updateLocaleTime,
  createDivContainer
};
