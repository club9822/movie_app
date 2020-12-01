import {loginAsync} from './auth';
import {all} from 'redux-saga/effects';
import {watchInput} from './input';
import {
  clearMoviesByTagListAsync,
  getCategoriesAsync,
  getMoviesAsync,
  getMoviesByTagAsync,
  queryStringAsync,
} from './movieAndCategories';

export default function* rootSaga() {
  yield all([
    loginAsync(),
    watchInput(),
    getMoviesAsync(),
    getCategoriesAsync(),
    getMoviesByTagAsync(),
    clearMoviesByTagListAsync(),
    queryStringAsync(),
  ]);
}
