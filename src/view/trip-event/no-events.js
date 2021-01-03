import Abstract from "../abstract.js";

const createEmptyBodyTemplate = () => `<p class="trip-events__msg">Click New Event to create your first point</p>`;

export default class EmptyContainer extends Abstract {
  getTemplate() {
    return createEmptyBodyTemplate();
  }
}
