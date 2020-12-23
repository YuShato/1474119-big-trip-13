export const createTripFiltersTemplate = (filter) => {
  const elementNameLowerCase = filter.name.toLowerCase();
  return `<div class="trip-filters__filter">
  <input id="filter-${elementNameLowerCase}"
    class="trip-filters__filter-input  visually-hidden" type="radio"
    name="trip-filter"
    value="${elementNameLowerCase}" ${filter.isChecked ? `checked` : ``}>
  <label class="trip-filters__filter-label" for="filter-${elementNameLowerCase}">${filter.name}</label>
</div>`;
};
