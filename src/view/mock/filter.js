import dayjs from 'dayjs';
import {currentMockArray, today} from "./data.js";

export const humanizeTaskDueDate = (dueDate) => {
  return dayjs(dueDate).format(`D MMMM`);
};

export const filteredFuturetArray = currentMockArray.filter((elem) => {
  return (dayjs(elem.endTime) > dayjs(today));
});

export const filteredPastArray = currentMockArray.filter((elem) => {
  return (dayjs(elem.endTime) < dayjs(today));
});

