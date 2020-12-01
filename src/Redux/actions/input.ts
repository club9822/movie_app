import {throttle, put} from 'redux-saga/effects';
import {INPUT_CHANGE, SAVE_INPUT_CHANGE} from '~/Redux/types';

interface ActionProps {
  type: string;
  payload: {
    key: string;
    value: string;
  };
}
export function* handleTextInput(action: ActionProps) {
  const {
    payload: {key, value},
  } = action;
  yield put({
    type: SAVE_INPUT_CHANGE,
    payload: {
      key: key,
      value: value,
    },
  });
}

export function* watchInput() {
  yield throttle(500, INPUT_CHANGE, handleTextInput);
}
