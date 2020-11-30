import {takeLatest, put} from 'redux-saga/effects';
import {
  TOGGLE_BUTTON_LOADING,
  TOGGLE_BUTTON_LOADING_CHANGE,
} from '~/Redux/types';
export function* toggleButtonLoading(showButtonLoading: boolean = false) {
  yield put({
    type: TOGGLE_BUTTON_LOADING,
    payload: {showButtonLoading: showButtonLoading},
  });
}
export function* watchButtonLoadingToggle() {
  yield takeLatest(TOGGLE_BUTTON_LOADING_CHANGE, toggleButtonLoading);
}
