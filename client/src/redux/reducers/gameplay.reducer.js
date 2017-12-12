import extend from 'extend';

// Set initial application state
const initialState = {
  heroes: {},
  enemies: {},
};

// Handle actions dispatched to the reducer
const actionHandlers = {
  CLEAR_SESSION: () => initialState,
  UPDATE_GAME_STATE: (returnState, action) => {
    const rs = returnState;

    rs.heroes = action.heroes;
    rs.enemies = action.enemies;
    return rs;
  },
  CLEAR_GAME_STATE: () => initialState,
};

// Export the reducer
export default (state = initialState, action) => {
  // Make an object for the return state
  const rs = extend(true, {}, state);

  // Handle unknown action types
  if (!actionHandlers[action.type]) return rs;

  // Handle the action dispatched to the reducer, return the updated state
  return actionHandlers[action.type](rs, action, state);
};
