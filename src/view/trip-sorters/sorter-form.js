export const createSorterForm = (sorterTemplatesHtml) => {
  return `<h2 class="visually-hidden">Trip events</h2>
   <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
    ${sorterTemplatesHtml}
   </form>`;
};


