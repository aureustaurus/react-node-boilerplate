import {
  GET_SHOPS_INFO,
  GET_SHOPS_FILTER_FIELDS,
  GET_SHOPS_SEARCH_FIELDS,
  GET_SHOPS_SORTING_FIELDS
} from '../constants/shops';

import 'whatwg-fetch';

export const getInfo = (params = {}, dispatch) => {
  return (dispatch) => {
    const body = JSON.stringify(params);
    console.log('BODY', body);
    fetch('/api/shops', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body
      })
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: GET_SHOPS_INFO,
          shops: json
        })
      })
      .catch(function(err) {
        console.log('getInfo Error: ', err.message);
      });
  }
};

export const getFilterFields = () => {
  return (dispatch) => {
    fetch('/api/shops/filters')
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: GET_SHOPS_FILTER_FIELDS,
          filterFields: json
        })
      })
      .catch((err) => {
        console.log('getFilterFields error: ', err.message);
      });
  }
};

export const getSearchFields = () => {
  return (dispatch) => {
    fetch('api/shops/search')
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: GET_SHOPS_SEARCH_FIELDS,
          searchFields: json
        })
      })
      .catch((err) => {
        console.log('getSortingFields error: ', err.message);
      });
  }
};

export const getSortingFields = () => {
  return (dispatch) => {
    fetch('api/shops/sorting')
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: GET_SHOPS_SORTING_FIELDS,
          sortingFields: json
        })
      })
      .catch((err) => {
        console.log('getSortingFields error: ', err.message);
      });
  }
};
