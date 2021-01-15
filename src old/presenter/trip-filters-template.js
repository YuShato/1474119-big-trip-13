import TripFilters from "../view/trip-filters/trip-filters.js";
import TripFilter from "../view/trip-filters/trip-filter.js";

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

