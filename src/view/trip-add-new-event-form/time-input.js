export const createTimeInputTemplate = (elem) => {
  return `<label class="visually-hidden" for="${elem.id}">${elem.name}</label>
   <input class="event__input  event__input--time" id="${elem.id}" type="text" name="${elem.id}" value="" placeholder="${elem.placeholder}">`;
};
