import Abstract from "../abstract.js";

const createSorterTemplate = (eventData) => {
  const nameLowerCase = eventData.name.toLowerCase();
  return `<div class="trip-sort__item  trip-sort__item--${nameLowerCase}">
  <input id="sort-${nameLowerCase}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${nameLowerCase}" ${eventData.isChecked ? `checked` : ``} ${eventData.isDisable ? `disabled` : ``}>
  <label class="trip-sort__btn" for="sort-${nameLowerCase}">${eventData.name}</label>
</div>`;
};

export default class Sorter extends Abstract {
  constructor(eventData) {
    super();
    this._eventData = eventData;
  }

  getTemplate() {
    return createSorterTemplate(this._eventData);
  }
}
