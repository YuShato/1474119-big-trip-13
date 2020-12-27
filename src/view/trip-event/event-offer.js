const createEventOfferTemplate = (eventData) => {
  return `<li class="event__offer">
    <span class="event__offer-title">${eventData.name}</span>
     +€&nbsp;
    <span class="event__offer-price">${eventData.price}</span>
  </li>`;
};

export default class EventOffer {
  constructor(eventData) {
    this._element = null;
    this._eventData = eventData;
  }

  getTemplate() {
    return createEventOfferTemplate(this._eventData);
  }

  getElement() {
    if (!this._element) {
      this._element = this.getTemplate();
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
