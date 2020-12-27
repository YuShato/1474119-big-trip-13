const createSorterTemplate = (eventData) => {
  const nameLowerCase = eventData.name.toLowerCase();
  return `<div class="trip-sort__item  trip-sort__item--${nameLowerCase}">
  <input id="sort-${nameLowerCase}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${nameLowerCase}" ${eventData.isChecked ? `checked` : ``} ${eventData.isDisable ? `disabled` : ``}>
  <label class="trip-sort__btn" for="sort-${nameLowerCase}">${eventData.name}</label>
</div>`;
};

export default class Sorter {
  constructor(eventData) {
    this._element = null;
    this._eventData = eventData;
  }

  getTemplate() {
    return createSorterTemplate(this._eventData);
  }

  getElement() {
    if (!this._element) {
      this._element = this.getTemplate();
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
