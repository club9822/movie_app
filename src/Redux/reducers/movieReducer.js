import {} from '../types';
import {} from '~/Redux/types';
import {GET_MOVIES_SUCCESS} from '../types';
import {extractParamsFromString} from '~/Utils/Helpers';
import {GET_MOVIES_BY_TAG_SUCCESS} from '~/Redux/types';
import {CLEAR_SELECTED_TAG_MOVIES} from '~/Redux/types';
import {QUERY_STRING_SUCCESS} from '../types';
const uniqBy = require('lodash.uniqby');

const API_RESPONSE = {
  offset: 0,
  limit: 10,
  count: 0,
  next: null,
  previous: null,
  results: [],
};
const SELECTED_TAG = {
  id: null,
  name: '',
};
const INITIAL_STATE = {
  movies: API_RESPONSE, // list of all movies
  moviesByTag: API_RESPONSE, // list of movies base on tag : typeof tag:string
  selectedTag: SELECTED_TAG, // selected tag item 
  queryResult: API_RESPONSE, // list of movies base on query string retrieved from api 
};

/**
 *
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
function reducer(state = INITIAL_STATE, action) {
  if (__DEV__) {
    console.log(action, state);
  }
  switch (action.type) {
    case GET_MOVIES_SUCCESS: {
      // combine list and overwrite others
      // we can remove duplicate items with lodash.uniqueBy or what ever

      // extract offset from next url and save

      // if user refresh list only save top 10 of bottom and clear old data

      const params = action.payload.next
        ? extractParamsFromString(action.payload.next)
        : {};
      return {
        ...state,
        movies: {
          ...state.moviesByTag,
          ...action.payload,
          results: action.payload.refreshing
            ? action.payload.results
            : uniqBy(state.movies.results.concat(action.payload.results), 'id'),
          ...params,
        },
      };
    }
    case GET_MOVIES_BY_TAG_SUCCESS: {
      const params = action?.payload?.moviesByTag?.next
        ? extractParamsFromString(action?.payload?.moviesByTag?.next)
        : {};
      // uniqBy: remove duplicates for prevent list warning and memo issues
      // it take some cpu 
      // save and read from Sqlite/Realm db can be better of performace
      return {
        ...state,
        moviesByTag: {
          ...state.moviesByTag,
          ...action.payload.moviesByTag,
          results: action.payload.refreshing
            ? action.payload.moviesByTag.results
            : uniqBy(
                state.moviesByTag.results.concat(
                  action.payload.moviesByTag.results,
                ),
                'id',
              ),
          ...params,
        },
        selectedTag: action.payload.selectedTag
          ? action.payload.selectedTag
          : state.selectedTag,
      };
    }
    case CLEAR_SELECTED_TAG_MOVIES: {
      // before save new result clear last ones
      // TODO: or we can save different objects for each tag
      return {...state, moviesByTag: API_RESPONSE, selectedTag: SELECTED_TAG};
    }
    case QUERY_STRING_SUCCESS: {
      // TODO : add pagination
      return {...state, queryResult: action.payload};
    }
    default:
      return state;
  }
}

export default reducer;
