import {render, templatePosition} from "../utils/utils.js";
import {getRandomOffer} from "./mock/data.js";

const currentOffer = ({id, name, price, idName, isChecked}) => {
  return `<div class="event__offer-selector">
<input class="event__offer-checkbox  visually-hidden" id="${id}" type="checkbox" name="${idName}" ${isChecked === true ? `checked` : ``}>
<label class="event__offer-label" for="${id}">
<span class="event__offer-title">${name}</span>
+€&nbsp;
<span class="event__offer-price">${price}</span>
</label>
</div>`;
};

const createFormOffer = () => {
  const fragment = document.createElement(`div`);
  fragment.className = `event__available-offers`;
  const currentOfferArray = Array.from(new Set(getRandomOffer()));
  for (let i = 0; i < currentOfferArray.length; i++) {
    const offer = currentOffer(currentOfferArray[i]);
    render(fragment, offer, templatePosition.BEFORE_END);
  }
  return fragment;
};

export {
  createFormOffer
};
