import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '~/Redux/actions';
/**
 * reducers
 */
import appReducer from '../Redux/reducers/appReducer';
import authReducer from '../Redux/reducers/authReducer';
import inputReducer from '../Redux/reducers/inputReducer';
import movieReducer from '../Redux/reducers/movieReducer';
import categoriesReducer from '../Redux/reducers/categoriesReducer';

/**
 *
 * saga
 *
 */
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  input: inputReducer,
  movie: movieReducer,
  category: categoriesReducer,
});

/**
 *
 *  Global Store
 *
 */
export const ReduxStore = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware),
);
sagaMiddleware.run(rootSaga);
