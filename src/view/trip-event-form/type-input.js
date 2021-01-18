import Abstract from "../abstract.js";

const createTypeInputTemplate = (template) => {
  return `<div class="event__type-item">
  <input id="event-type-${template ? template.tripEvent : `flight`}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${template ? template.tripEvent : `flight`}">
  <label class="event__type-label  event__type-label--${template ? template.tripEvent : `flight`}" for="event-type-${template ? template.tripEvent : `flight`}-1">${template ? template.tripEvent : `Flight`}</label>
</div>`;
};

export default class TypeInput extends Abstract {
  constructor(template) {
    super();
    this._template = template;
  }

  getTemplate() {
    return createTypeInputTemplate(this._template);
  }
}
