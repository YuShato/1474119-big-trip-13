import Abstract from "../abstract.js";

const createPriceFieldTemplate = () => {
  return `<div class="event__field-group  event__field-group--price">
  <label class="event__label" for="event-price-1">
    <span class="visually-hidden">Price</span>
    €
  </label>
  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
</div>`;
};

export default class EventPrice extends Abstract {
  getTemplate() {
    return createPriceFieldTemplate();
  }
}
