const initialState = {};

import {
  GET_SHOPS_INFO,
  GET_SHOPS_FILTER_FIELDS,
  GET_SHOPS_SEARCH_FIELDS,
  GET_SHOPS_SORTING_FIELDS
} from '../constants/shops';

export default function shopsApp(state = {}, action) {

  switch (action.type) {
    case GET_SHOPS_FILTER_FIELDS: {
      var filterFields = action.filterFields ? action.filterFields : [];
      var newState = Object.assign({}, state, {filterFields});
      return newState;
    }

    case GET_SHOPS_SEARCH_FIELDS: {
      var searchFields = action.searchFields ? action.searchFields : [];
      var newState = Object.assign({}, state, {searchFields});
      return newState;
    }

    case GET_SHOPS_SORTING_FIELDS: {
      var sortingFields = action.sortingFields ? action.sortingFields : [];
      var newState = Object.assign({}, state, {sortingFields});
      return newState;
    }

    case GET_SHOPS_INFO: {
      var shops = action.shops ? action.shops : [];
      var newState = Object.assign({}, state, {shops});
      return newState;
    }

    default:
      return state
    }
}
