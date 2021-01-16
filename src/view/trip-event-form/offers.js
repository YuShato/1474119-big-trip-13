import Abstract from "../abstract.js";

const createOfferTemplate = (pointOffers) => {
  return `<div class="event__available-offers">
      ${pointOffers.map((pointOffer) => `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${pointOffer.id}" type="checkbox" name="${pointOffer.idName}" ${pointOffer.isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="${pointOffer.id}">
         <span class="event__offer-title">${pointOffer.name}</span>
         +€&nbsp;
         <span class="event__offer-price">${pointOffer.price}</span>
      </label>
      </div>`).join(``)}
    </div>
    `;
};

export default class Offer extends Abstract {
  constructor(pointOffers) {
    super();
    this._pointOffers = pointOffers;
  }

  getTemplate() {
    return createOfferTemplate(this._pointOffers);
  }
}
