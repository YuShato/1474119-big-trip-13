import Abstract from "../abstract";

const createCityCollectionTemplate = (cities) => {
  return `<datalist id="destination-list-1">
    ${cities.map((city) => `<option value="${city}"></option>`).join(``)}
</datalist>`;
};

export default class CityCollection extends Abstract {
  constructor(cities) {
    super();
    this._cities = cities;
  }

  getTemplate() {
    return createCityCollectionTemplate(this._cities);
  }
}
