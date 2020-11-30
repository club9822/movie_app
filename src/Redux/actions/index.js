import {loginAsync} from '~/Redux/actions/auth';
import {all} from 'redux-saga/effects';
import {watchInput} from './input';
import {
  clearMoviesByTagListAsync,
  getCategoriesAsync,
  getMoviesAsync,
  getMoviesByTagAsync, queryStringAsync,
} from '~/Redux/actions/movieAndCategories';

export default function* rootSaga() {
  yield all([
    loginAsync(),
    watchInput(),
    getMoviesAsync(),
    getCategoriesAsync(),
    getMoviesByTagAsync(),
    clearMoviesByTagListAsync(),
    queryStringAsync()
  ]);
}
