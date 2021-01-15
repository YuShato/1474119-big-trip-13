import Abstract from "../abstract.js";

const createEventOfferTemplate = (eventData) => {
  return `<li class="event__offer">
    <span class="event__offer-title">${eventData.name}</span>
     +€&nbsp;
    <span class="event__offer-price">${eventData.price}</span>
  </li>`;
};

export default class EventOffer extends Abstract {
  constructor(eventData) {
    super();
    this._eventData = eventData;
  }

  getTemplate() {
    return createEventOfferTemplate(this._eventData);
  }
}
