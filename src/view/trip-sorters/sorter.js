export const createSorterTemplate = (elem) => {
  const nameLowerCase = elem.name.toLowerCase();
  return `<div class="trip-sort__item  trip-sort__item--${nameLowerCase}">
  <input id="sort-${nameLowerCase}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${nameLowerCase}" ${elem.isChecked ? `checked` : ``} ${elem.isDisable ? `disabled` : ``}>
  <label class="trip-sort__btn" for="sort-${nameLowerCase}">${elem.name}</label>
</div>`;
};


