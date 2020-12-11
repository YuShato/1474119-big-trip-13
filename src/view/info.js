import {generateCity} from "../mock/data.js";

const createTripInfo = () => {
  return `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${generateCity()} &mdash; ${generateCity()} &mdash; ${generateCity()}</h1>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value"></span>
  </p>
</section>`;
};

export {
  createTripInfo,
};
