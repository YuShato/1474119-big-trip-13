import {createTripFiltersFilter} from "./trip-filters-filter-template";
import {createTripFilters} from "./trip-filters-template";

const FILTERS = [
  {
    name: `Everything`,
    isChecked: `checked`
  },
  {
    name: `Future`,
    isChecked: ``
  },
  {
    name: `Past`,
    isChecked: ``
  },
];

const createTripFilterForm = () => {
  const filters = FILTERS.map((filter) => createTripFiltersFilter(filter)).join(``);
  return createTripFilters(filters);
};

export {
  createTripFilterForm
};
