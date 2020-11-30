import {} from '../types';
import {TOGGLE_BUTTON_LOADING} from '~/Redux/types';
const INITIAL_STATE = {
  showButtonLoading: false, //handle  buttons loading
};

/**
 *
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_BUTTON_LOADING: {
      return {
        ...state,
        showButtonLoading: action.payload?.showButtonLoading
          ? action.payload.showButtonLoading
          : !state.showButtonLoading,
      };
    }
    default:
      return state;
  }
}

export default reducer;
