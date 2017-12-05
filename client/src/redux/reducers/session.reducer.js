import extend from 'extend';

// Set initial application state
const initialState = {
  userid: 1,
  level: 0,
  experience: 0,
  experienceToNextLevel: 0,
  gold: 0,
  currentStamina: 0,
  maxStamina: 0,
};

// Handle actions dispatched to the reducer
const actionHandlers = {
  // Resets the session to the initial state
  CLEAR_SESSION: () => initialState,

  // Temporary stat updating?
  UPDATE_STATS: (returnState, action) => {
    const rs = returnState;

    rs.level = action.lvl;
    rs.experience = action.xp;
    rs.gold = action.currency;
    rs.currentStamina = action.stamina;
    return rs;
  },
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
