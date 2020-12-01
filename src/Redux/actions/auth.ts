import {call, put, takeLatest, takeEvery, select} from 'redux-saga/effects';
import {
  LOGIN,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  TOGGLE_BUTTON_LOADING,
} from '~/Redux/types';
import {axios} from '~/Utils/Axios';
import {pushScreen} from '~/Utils/NavHelpers';
import {Screens} from '~/Constants/screens';
import {AxiosError, AxiosResponse} from 'axios';
import {GlobalActionInterface, ExtendedAxiosConfig} from './index';
interface LoginSuccess {
  username: string;
  password: string;
  accessToken: string;
}
export function loginUser(
  username: string,
  password: string,
): Promise<LoginSuccess | string> {
  return new Promise(function (resolve, reject) {
    if (!username || !password) {
      return reject('username and password needed');
    }
    const config: ExtendedAxiosConfig = {
      method: 'post',
      url: 'user/auth-token',
      data: {
        username: username,
        password: password,
      },
      addAccessToken: false,
    };
    axios(config)
      .then(({data}) => {
        if (data.hasOwnProperty('token')) {
          /**
           * navigato to Home screen
           */
          pushScreen(Screens.Login, Screens.Home);
          return resolve({
            username,
            password,
            accessToken: data?.token,
          });
        }
        reject('failed to retrieve token'); // or any message
      })
      .catch((e) => {
        // simply show this message or
        // show backend response message to user : (e.response.data.message)
        reject('login failed. username or password error');
      })
      .finally((_) => {});
  });
}
function* login() {
  try {
    /**
     * get values from redux store and fetch api
     *
     * then save data or show error message
     *
     */
    const state = yield select();
    const {
      input: {username, password},
    } = state;
    yield put({
      type: TOGGLE_BUTTON_LOADING,
      payload: {showButtonLoading: true},
    });
    const data = yield call(loginUser, username, password);
    yield put({type: LOGIN_SUCCESS, payload: data});
  } catch (error) {
    yield put({
      type: LOGIN_FAIL,
      payload: {
        error: error,
      },
    });
  } finally {
    yield put({
      type: TOGGLE_BUTTON_LOADING,
      payload: {showButtonLoading: false},
    });
  }
}
export function* loginAsync() {
  yield takeLatest(LOGIN, login);
}
