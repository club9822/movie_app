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
import {AxiosRequestConfig} from "axios";
export interface ActionInterface {
  type?: string;
  payload?: any;
}
export type GlobalActionInterface = ActionInterface | null | undefined;
export interface ExtendedAxiosConfig extends AxiosRequestConfig {
  addAccessToken: boolean;
}
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
