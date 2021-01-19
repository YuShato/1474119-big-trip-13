import Abstract from "../abstract.js";

const createPriceFieldTemplate = (template) => {
  return `<div>
  <label class="event__label" for="event-price-1">
    <span class="visually-hidden">Price</span>
    €
  </label>
  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${template ? template.totalSum : `0`}">
</div>`;
};

export default class EventPrice extends Abstract {
  constructor(template) {
    super();
    this._template = template;
  }
  getTemplate() {
    return createPriceFieldTemplate(this._template);
  }
}
