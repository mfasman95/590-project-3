import { createStore, combineReducers } from 'redux';
import mainReducer from './reducers/main.reducer';
import routerReducer from './reducers/router.reducer';
import sessionReducer from './reducers/session.reducer';
import adventurersReducer from './reducers/adventurers.reducer';
import friendsReducer from './reducers/friends.reducer';
import gearReducer from './reducers/gear.reducer';

export default createStore(combineReducers({
  main: mainReducer,
  route: routerReducer,
  session: sessionReducer,
  adventurers: adventurersReducer,
  friends: friendsReducer,
  gear: gearReducer,
}));
