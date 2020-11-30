import {} from '../types';
import {LOGIN_FAIL} from '../types';
import {LOGIN_SUCCESS} from '../types';
import {LOGIN} from '../types';
const INITIAL_STATE = {
  accessToken: null, //access token
  loginErrorMessage: null,
  username: null, // maybe needed later
  password: null,
};

/**
 *
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN: {
      return {...state, loginErrorMessage: null};
    }
    case LOGIN_FAIL: {
      return {...state, loginErrorMessage: action.payload.error};
    }
    case LOGIN_SUCCESS: {
      return {...state, loginErrorMessage: null, ...action.payload};
    }
    default:
      return state;
  }
}

export default reducer;
