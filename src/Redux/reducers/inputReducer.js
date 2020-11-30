import {} from '../types';
import {SAVE_INPUT_CHANGE} from '../types';
const INITIAL_STATE = {
  username: 'hriks',
  password: 'gt4043@1',
};

/**
 *
 * @param {Object} state
 * @param {Object} action
 * @returns
 */
function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SAVE_INPUT_CHANGE: {
      /**
       * save all inputs value with this line
       */
      return {...state, [action.payload.key]: action.payload.value};
    }
    default:
      return state;
  }
}

export default reducer;
