const createSorter = (elem) => {
  return `  <div class="trip-sort__item  trip-sort__item--${elem.name.toLowerCase()}">
  <input id="sort-${elem.name.toLowerCase()}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${elem.name.toLowerCase()}" ${elem.isChecked} ${elem.isDisable}>
  <label class="trip-sort__btn" for="sort-${elem.name.toLowerCase()}">${elem.name}</label>
</div>`;
};

export {
  createSorter
};

