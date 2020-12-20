export const createEventTypeInput = (elem) => {
  const nameToLowerCase = elem.name.toLowerCase();
  return `<div class="event__type-item">
  <input id="event-type-${nameToLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${nameToLowerCase}">
  <label class="event__type-label  event__type-label--${nameToLowerCase}" for="event-type-${nameToLowerCase}-1">${elem.name}</label>
</div>`;
};
