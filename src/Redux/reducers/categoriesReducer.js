import {} from '../types';
import {} from '~/Redux/types';
import {extractParamsFromString} from '~/Utils/Helpers';
import {GET_CATEGORIES_SUCCESS} from '../types';
const uniqBy = require('lodash.uniqby');
const INITIAL_STATE = {
  categories: {
    offset: 0,
    limit: 10,
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
};

/**
 *
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_CATEGORIES_SUCCESS: {
      // combine list and overwrite others
      // we can remove duplicate items with lodash.uniqueBy or what ever

      // extract offset from next url and save

      // if user refresh list only save top 10 of bottom and clear old data

      const params = action.payload.next
        ? extractParamsFromString(action.payload.next)
        : {};
      return {
        ...state,
        categories: {
          ...state.categories,
          ...action.payload,
          results: action.payload.refreshing
            ? action.payload.results
            : uniqBy(
                state.categories.results.concat(action.payload.results),
                'id',
              ),
          ...params,
        },
      };
    }
    default:
      return state;
  }
}

export default reducer;
