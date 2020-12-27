const createTypesWrapperTemplate = (eventTypesHtml) => {
  return `<div class="event__type-wrapper">
  <label class="event__type  event__type-btn" for="event-type-toggle-1">
    <span class="visually-hidden">Choose event type</span>
    <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
  </label>
  <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

  <div class="event__type-list">
    <fieldset class="event__type-group">
      <legend class="visually-hidden">Event type</legend>
      ${eventTypesHtml}
    </fieldset>
  </div>
</div>`;
};

export default class TypesWrapper {
  constructor(eventTypesHtml) {
    this._element = null;
    this._eventTypesHtml = eventTypesHtml;
  }

  getTemplate() {
    return createTypesWrapperTemplate(this._eventTypesHtml);
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
