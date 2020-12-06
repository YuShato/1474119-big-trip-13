import dayjs from 'dayjs';

const templatePosition = {
  BEFORE_BEGIN: `beforebegin`,
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
  AFTER_END: `afterend`
};

const OFFERS_COUNT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const getRandomInt = (minValue, maxValue) => {
  const lower = Math.ceil(Math.min(minValue, maxValue));
  const upper = Math.floor(Math.max(minValue, maxValue));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomBoolean = () => !!getRandomInt(0, 1);

const getRandomPositiveInt = (maxValue) => getRandomInt(0, maxValue);

const getArrayRandomElement = (array) => {
  return array[getRandomPositiveInt(array.length - 1)];
};

const humanizeTaskDueDate = (dueDate) => {
  return dayjs(dueDate).format(`MMM DD`);
};

const humanizeTaskDueTime = (dueDate) => {
  return dayjs(dueDate).format(`HH:MM`);
};

const timeGap = (startTime, endTime) => {
  let firstDate = humanizeTaskDueTime(startTime);
  let secondDate = humanizeTaskDueTime(endTime);

  let getDate = (string) => new Date(0, 0, 0, string.split(`:`)[0], string.split(`:`)[1]);
  let different = (getDate(secondDate) - getDate(firstDate));

  let hours = Math.floor((different % 86400000) / 3600000);
  let minutes = Math.round(((different % 86400000) % 3600000) / 60000);
  let result = hours + `H ` + minutes + `M`;
  return result;
};


export {
  templatePosition,
  render,
  getRandomInt,
  OFFERS_COUNT,
  getRandomBoolean,
  getRandomPositiveInt,
  getArrayRandomElement,
  timeGap,
  humanizeTaskDueDate,
  humanizeTaskDueTime
};
