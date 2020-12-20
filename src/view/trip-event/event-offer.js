export const createEventOffer = (elem) => {
  return `<li class="event__offer">
    <span class="event__offer-title">${elem.name}</span>
     +€&nbsp;
    <span class="event__offer-price">${elem.price}</span>
  </li>`;
};

