import { createStore, combineReducers } from 'redux';

import { snackbarReducer } from 'react-redux-snackbar';

import main from './reducers/main.reducer';
import route from './reducers/router.reducer';
import session from './reducers/session.reducer';
import adventurers from './reducers/adventurers.reducer';
import friends from './reducers/friends.reducer';
import gear from './reducers/gear.reducer';
import gameState from './reducers/gameplay.reducer';
import party from './reducers/party.reducer';

export default createStore(combineReducers({
  main,
  route,
  session,
  adventurers,
  friends,
  gear,
  gameState,
  party,
  snackbar: snackbarReducer,
}));
