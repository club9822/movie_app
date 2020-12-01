import {axios} from '~/Utils/Axios';
import {
  call,
  put,
  takeLatest,
  takeEvery,
  throttle,
  select,
} from 'redux-saga/effects';
import {
  CLEAR_SELECTED_TAG_MOVIES,
  CLEAR_SELECTED_TAG_MOVIES_BUTTON,
  GET_CATEGORIES,
  GET_CATEGORIES_SUCCESS,
  GET_MOVIES,
  GET_MOVIES_BY_TAG,
  GET_MOVIES_BY_TAG_SUCCESS,
  GET_MOVIES_SUCCESS,
  QUERY_STRING,
  QUERY_STRING_SUCCESS,
} from '~/Redux/types';
import {AxiosRequestConfig, AxiosError, AxiosResponse} from 'axios';
interface ActionInterface {
  type?: string;
  payload?: any;
}
type GlobalActionInterface = ActionInterface | null | undefined;
/**
 *
 * get data lazily with scroll
 *
 *
 * @param offset
 * @param limit
 * @param next
 * @returns {Promise<R>}
 */
interface ExtendedAxiosConfig extends AxiosRequestConfig {
  addAccessToken: boolean;
}
function getListFromApi(
  offset: number = 0,
  limit: number = 10,
  listName: string = 'movie',
): Promise<any> {
  return new Promise(function (resolve, reject) {
    const params = {
      offset: offset,
      limit: limit,
    };
    const config: ExtendedAxiosConfig = {
      method: 'get',
      url: listName + '/',
      params: params,
      addAccessToken: false,
    };
    axios(config)
      .then((res: AxiosResponse) => {
        const {data} = res;
        /**
         * check shape of response for prevent crash
         */
        if (data.hasOwnProperty('results') && Array.isArray(data.results)) {
          resolve(data);
        }
        reject('failed to retrieve data'); // or any message
      })
      .catch((e: AxiosError | AxiosResponse) => {
        // simply show this message or
        // show backend response message to user : (e.response.data.message)
        reject('error');
      })
      .finally((_) => {});
  });
}

/**
 *
 * dynamic function to get film and category list
 *
 * @param action
 * @param listName
 * @returns
 */
function* getList(listName: string = 'movie', action: GlobalActionInterface) {
  try {
    /**
     * some key for select from store
     */
    let actionType;
    let storeListName;
    switch (listName) {
      case 'movie': {
        actionType = GET_MOVIES_SUCCESS;
        storeListName = 'movies';
        break;
      }
      case 'category': {
        actionType = GET_CATEGORIES_SUCCESS;
        storeListName = 'categories';
        break;
      }
      default: {
        actionType = null;
        storeListName = null;
        break;
      }
    }
    if (!actionType || !storeListName) {
      throw new Error('actionType or storeListName  must be declared in  ');
    }

    /**
     * get values from redux store and fetch api
     *
     * then save data or show error message
     *
     */
    const state = yield select();
    const {
      [listName.toString()]: {
        [storeListName.toString()]: {offset, limit},
      },
    } = state;
    // yield put({
    //   type: TOGGLE_BUTTON_LOADING,
    //   payload: {showButtonLoading: true},
    // });
    /**
     *
     * TODO:
     * logic for auto append offset and
     *
     */
    let _offset;
    let _refreshing;
    if (action && action?.payload) {
      _offset = action?.payload.hasOwnProperty('offset')
        ? action?.payload?.offset
        : offset;
      _refreshing = action?.payload.hasOwnProperty('refreshing')
        ? action?.payload?.refreshing
        : false;
    }
    const data = yield call(getListFromApi, _offset, limit, listName);
    data.refreshing = _refreshing;
    yield put({type: actionType, payload: data});
  } catch (error) {
    if (__DEV__) {
      console.log(error);
    }
    /**
     * some retry login
     *
     * with flag in redux enable UI to
     * render some button for retry
     */
    //TODO:
    //
    // yield put({
    //   type: TOGGLE_BUTTON_LOADING,
    //   payload: {showButtonLoading: false},
    // });
  } finally {
    /**
     * toggle refresh or onEndReached
     *
     */
    if (
      action &&
      action.payload &&
      action.payload.cb &&
      typeof action.payload.cb === 'function'
    ) {
      action?.payload?.cb();
    }
  }
}
interface TagType {
  id: number;
  name: string;
}
interface Params {
  offset: number;
  limit: number;
  tags?: string;
}
function getMoviesByTagFromApi(
  offset: number = 0,
  limit: number = 10,
  tag: TagType | null | undefined = null,
): Promise<any> {
  return new Promise(function (resolve, reject) {
    const params: Params = {
      offset: offset,
      limit: limit,
    };
    if (tag && tag.hasOwnProperty('name')) {
      params.tags = tag?.name;
    }
    const config: ExtendedAxiosConfig = {
      method: 'get',
      url: 'movie/',
      addAccessToken: false,
      params: params,
    };
    axios(config)
      .then(({data}) => {
        /**
         * check shape of response for prevent crash
         */
        if (data.hasOwnProperty('results') && Array.isArray(data.results)) {
          resolve(data);
        }
        reject('failed to retrieve data'); // or any message
      })
      .catch((e) => {
        // simply show this message or
        // show backend response message to user : (e.response.data.message)
        reject('error');
      })
      .finally((_) => {});
  });
}

function* getMoviesByTag(action: GlobalActionInterface) {
  const state = yield select();
  const {
    movie: {
      moviesByTag: {offset, limit},
      selectedTag,
    },
  } = state;
  try {
    let _offset;
    let _refreshing;
    let _tag;
    if (action && action?.payload) {
      _offset = action?.payload.hasOwnProperty('offset')
        ? action?.payload?.offset
        : offset;
      _refreshing = action?.payload.hasOwnProperty('refreshing')
        ? action?.payload?.refreshing
        : false;
      _tag = action?.payload.hasOwnProperty('tag')
        ? action?.payload?.tag
        : selectedTag;
    }
    /**
     *
     */
    // if (_offset === 0) {
    //
    // }
    const data = yield call(getMoviesByTagFromApi, _offset, limit, _tag);

    yield put({
      type: GET_MOVIES_BY_TAG_SUCCESS,
      payload: {
        refreshing: _refreshing,
        moviesByTag: data,
        selectedTag: _tag,
      },
    });
  } catch (e) {
    /**
     * TODO:
     */
  } finally {
    /**
     * toggle refresh or onEndReached
     *
     */
    if (
      action &&
      action.payload &&
      action.payload.cb &&
      typeof action.payload.cb === 'function'
    ) {
      action?.payload?.cb();
    }
  }
}

function* clearMoviesByTagList() {
  yield put({
    type: CLEAR_SELECTED_TAG_MOVIES,
    payload: {},
  });
}

function queryStringApi(string: string): Promise<any | string> {
  return new Promise(function (resolve, reject) {
    const config: ExtendedAxiosConfig = {
      method: 'get',
      url: 'movie/',
      addAccessToken: false,
      params: {search: string},
    };
    axios(config)
      .then(({data}) => {
        /**
         * check shape of response for prevent crash
         */
        if (data.hasOwnProperty('results') && Array.isArray(data.results)) {
          resolve(data);
        }
        reject('failed to retrieve data'); // or any message
      })
      .catch((e) => {
        // simply show this message or
        // show backend response message to user : (e.response.data.message)
        reject('error');
      })
      .finally((_) => {});
  });
}

function* queryString(action: GlobalActionInterface) {
  try {
    const data = yield call(queryStringApi, action?.payload?.string);
    yield put({
      type: QUERY_STRING_SUCCESS,
      payload: data,
    });
  } catch (e) {
    //TODO: some catch handler
  }
}
/**
 *
 *
 * get movie & category list
 *
 */
export function* getMoviesAsync() {
  yield takeLatest(GET_MOVIES, getList, 'movie');
}
export function* getCategoriesAsync() {
  yield takeLatest(GET_CATEGORIES, getList, 'category');
}
export function* getMoviesByTagAsync() {
  yield takeLatest(GET_MOVIES_BY_TAG, getMoviesByTag);
}
export function* clearMoviesByTagListAsync() {
  yield takeLatest(CLEAR_SELECTED_TAG_MOVIES_BUTTON, clearMoviesByTagList);
}
export function* queryStringAsync() {
  yield throttle(500, QUERY_STRING, queryString);
}
