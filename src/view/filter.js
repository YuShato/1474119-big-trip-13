const createTripFilter = (elem) => {
  return `    <div class="trip-filters__filter">
      <input id="filter-${elem.name.toLocaleLowerCase()}" class="trip-filters__filter-input  visually-hidden" type="radio"    name="trip-filter" value="${elem.name.toLocaleLowerCase()}" ${elem.isChecked}>
       <label class="trip-filters__filter-label" for="filter-${elem.name.toLocaleLowerCase()}">${elem.name}</label>
    </div>`;
};

export {
  createTripFilter
};
