const createOffer = (elem) => {
  return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="${elem.id}" type="checkbox" name="${elem.idName}" ${elem.isChecked}>
        <label class="event__offer-label" for="${elem.id}">
         <span class="event__offer-title">${elem.name}</span>
         +€&nbsp;
         <span class="event__offer-price">${elem.price}</span>
      </label>
  </div>`;
};

export {
  createOffer
};
