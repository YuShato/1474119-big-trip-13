import {RenderPosition, render} from "../utils/render.js";
import {getFutureEvents, getPastEvents} from "../utils/filter.js";
import EmptyContainer from "../view/trip-event/empty-container.js";
import SorterForm from "../view/sorter-form.js";
import Dates from "./dates.js";
import TripInfo from "../view/trip-info.js";
import {getAllEventsSum, headerCities, eventMockData} from "../mock/data.js";
import SiteMenuControls from "../view/site-menu-controls.js";
import TripFilter from "../view/trip-filter.js";
import EventsList from "./events-list.js";

const SorterMode = {
  DEFAULT: `sort-day`,
  TIME: `sort-time`,
  PRICE: `sort-price`
};

const FilterMode = {
  DEFAULT: `filter-everything`,
  FUTURE: `filter-future`,
  PAST: `filter-past`
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
    this._tripFilterForm = new TripFilter();
    this._sort = new SorterForm();

    this._sortChangeHandler = this._sortChangeHandler.bind(this);
    this._filterChangeHandler = this._filterChangeHandler.bind(this);
    this._currentSortMode = SorterMode.DEFAULT;
    this._currentFilterMode = FilterMode.DEFAULT;
  }

  init(events) {
    this._events = events.slice();
    this._sortByDay(this._events);
    this._renderTripInfo();
    this._renderControls();
    this._renderFilters();
    this._renderEventsList(this._events);
  }

  _renderSort() {
    this._tripEventsElement = document.querySelector(`.trip-events`);
    this._sort.setSortChangeHandler(this._sortChangeHandler);
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
        (this._events.length === 0 || !this._events) ? this._emptyContainer : new EventsList(this._events).init(),
        RenderPosition.BEFORE_END
    );
  }

  _renderEventsList(events) {
    this._events = events.slice();
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
    this._tripFilterForm.setFilterChangeHandler(this._filterChangeHandler);
    render(this._siteControlElement, this._tripFilterForm, RenderPosition.BEFORE_END);
  }

  _sortByTime() {
    this._events.sort((a, b) => a.endTime.diff(a.startTime) - b.endTime.diff(b.startTime));
  }

  _sortByDay(events) {
    this._events = events;
    this._events.sort((a, b) => a.startTime.isBefore(b.startTime) ? -1 : 1);
  }

  _sortByPrice() {
    this._events.sort((a, b) => a.price - b.price);
  }

  _isAnotherFilterMode(value) {
    return value !== this._currentFilterMode;
  }

  _filterChangeHandler(value) {
    if (this._isAnotherFilterMode(value)) {
      this._currentFilterMode = value;
      this._currentEvents = eventMockData;

      switch (value) {
        case FilterMode.DEFAULT:
          this._currentEvents = this._currentEvents.slice();
          break;
        case FilterMode.FUTURE:
          this._currentEvents = getFutureEvents(this._currentEvents);
          break;
        case FilterMode.PAST:
          this._currentEvents = getPastEvents(this._currentEvents);
          break;
      }

      this._sortByDay(this._currentEvents);
      this._renderEventsList(this._currentEvents);
      this._currentEvents = eventMockData;
    }
  }

  _sortChangeHandler(value) {
    if (this._isAnotherMode(value)) {
      this._currentSortMode = value;

      switch (value) {
        case SorterMode.DEFAULT:
          this._sortByDay(this._events);
          break;
        case SorterMode.TIME:
          this._sortByTime();
          break;
        case SorterMode.PRICE:
          this._sortByPrice();
          break;
      }
      this._renderEventsList(this._events);
    }
  }

  _isAnotherMode(value) {
    return value !== this._currentSortMode;
  }
}
