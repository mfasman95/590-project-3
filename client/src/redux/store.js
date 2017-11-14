import { createStore, combineReducers } from 'redux';
import mainReducer from './reducers/main.reducer';
import routerReducer from './reducers/router.reducer';

export default createStore(combineReducers({
  main: mainReducer,
  route: routerReducer,
}));
