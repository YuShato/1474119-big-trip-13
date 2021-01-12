import {RenderPosition, render} from "../utils/render.js";
import EmptyContainer from "../view/trip-event/empty-container.js";
import {generateEvents} from "./point.js";
import {generateSorterTemplatesHtml} from "../view/trip-sorters/sorter-template.js";
import SorterForm from "../view/trip-sorters/sorter-form.js";
import Dates from "./dates.js";
import TripInfo from "../view/page-header/trip-info.js";
import {getAllEventsSum, headerCities} from "../mock/data.js";
import SiteMenuControls from "../view/page-header/site-menu-controls.js";
import {generateTripFilterForm} from "./trip-filters-template.js";
import dayjs from 'dayjs';

const SortMode = {
  DEFAULT: `sort-day`,
  TIME: `sort-time`,
  PRICE: `sort-price`
};

const FilterMode = {
  DEFAULT: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export default class Events {
  constructor(siteMainElement, siteEventElement, siteControlElement) {
    this._events = null;
    this._emptyContainer = new EmptyContainer();
    this._siteMainElement = siteMainElement;
    this._siteEventElement = siteEventElement;
    this._siteControlElement = siteControlElement;

    this._tripInfo = new TripInfo(headerCities);
    this._siteMenuControl = new SiteMenuControls();
    this._tripFilterForm = generateTripFilterForm();
    this._sort = new SorterForm(generateSorterTemplatesHtml());

    this._sortChangeHandler = this._sortChangeHandler.bind(this);
    this._currentSortMode = SortMode.DEFAULT;
  }

  init(events) {
    this._events = events.slice();

    this._renderTripInfo();
    this._renderControls();
    this._renderFilters();
    this.renderEventsList(this._events);
  }

  _sortChangeHandler(value) {
    if (this._isAnotherMode(value)) {
      this._currentSortMode = value;

      switch (value) {
        case SortMode.DEFAULT:
          this.renderEventsList(this._sortByDay());
          break;
        case SortMode.TIME:
          this.renderEventsList(this._sortByTime());
          break;
        case SortMode.PRICE:
          this.renderEventsList(this._sortByPrice());
          break;
      }
    }
  }

  _isAnotherMode(value) {
    return value !== this._currentSortMode;
  }

  _renderSort() {
    // this._sort.setSortChangeHandler(this._sortChangeHandler);
    this._tripEventsElement = document.querySelector(`.trip-events`);
    render(this._tripEventsElement, this._sort, RenderPosition.AFTER_BEGIN);
  }

  _updateDates() {
    new Dates(this._events).init();
  }

  _updateTripTotalSum() {
    document.querySelector(`.trip-info__cost-value`).textContent = getAllEventsSum(this._events);
  }

  _renderEvents(events) {
    this._events = events.slice();

    render(
        this._siteEventElement,
        (this._events.length === 0 || !this._events) ? this._emptyContainer : generateEvents(this._events),
        RenderPosition.BEFORE_END
    );
  }

  renderEventsList(events) {
    this._events = events.slice();
    this._sortByDay();
    this._renderEvents(this._events);
    this._updateDates();
    this._renderSort();
    this._updateTripTotalSum();
  }

  _renderTripInfo() {
    render(this._siteMainElement, this._tripInfo, RenderPosition.AFTER_BEGIN);
  }

  _renderControls() {
    render(this._siteControlElement, this._siteMenuControl, RenderPosition.BEFORE_END);
  }

  _renderFilters() {
    render(this._siteControlElement, this._tripFilterForm, RenderPosition.BEFORE_END);
  }

  _sortByTime() {
    this._events.sort((a, b) => a.endTime.diff(a.startTime) - b.endTime.diff(b.startTime));
  }

  _sortByDay() {
    this._events.sort((a, b) => a.startTime.isBefore(b.startTime) ? -1 : 1);
  }

  _sortByPrice() {
    this._events.sort((a, b) => a.price - b.price);
  }

  _futureEvents() {
    this._events.filter((event) => (dayjs(event.endTime) > dayjs()));
  }

  _pastEvents() {
    this._events.filter((event) => (dayjs(event.endTime) < dayjs()));
  }

  _isAnotherFilterMode(value) {
    return value !== this._currentFilterMode;
  }

  _timeFilterHandler(value) {
    if (this._isAnotherFilterMode(value)) {
      this._currentFilterMode = value;

      switch (value) {
        case FilterMode.DEFAULT:
          this.renderEventsList(this._events);
          break;
        case FilterMode.FUTURE:
          this.renderEventsList(this._futureEvents);
          break;
        case FilterMode.PAST:
          this.renderEventsList(this._pastEvents);
          break;
      }
    }
  }
}

