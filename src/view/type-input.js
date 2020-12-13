const createEventTypeInput = (elem) => {
  return `<div class="event__type-item">
  <input id="event-type-${elem.name.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${elem.name.toLowerCase()}">
  <label class="event__type-label  event__type-label--${elem.name.toLowerCase()}" for="event-type-${elem.name.toLowerCase()}-1">${elem.name}</label>
</div>`;
};

export {
  createEventTypeInput
};
