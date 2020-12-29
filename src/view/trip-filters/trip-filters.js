import TripFilters from "./trip-filters-filter-template";
import TripFilter from "./trip-filters-template";

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
  const filters = FILTERS.map((filter) => new TripFilters(filter).getElement()).join(``);
  return new TripFilter(filters).getElement();
};

export {
  generateTripFilterForm
};

