export const createTripFilterTemplate = (filtersHtml) => {
  return `<form class="trip-filters" action="#" method="get">
   ${filtersHtml}
   <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};
