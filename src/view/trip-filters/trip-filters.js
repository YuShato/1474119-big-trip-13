import {createTripFiltersTemplate} from "./trip-filters-filter-template";
import {createTripFilterTemplate} from "./trip-filters-template";

const FILTERS = [
  {
    name: `Everything`,
    isChecked: true
  },
  {
    name: `Future`,
    isChecked: false
  },
  {
    name: `Past`,
    isChecked: false
  },
];

const generateTripFilterForm = () => {
  const filters = FILTERS.map((filter) => createTripFiltersTemplate(filter)).join(``);
  return createTripFilterTemplate(filters);
};

export {
  generateTripFilterForm
};
