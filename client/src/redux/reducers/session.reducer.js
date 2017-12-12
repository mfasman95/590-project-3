import extend from 'extend';

// Set initial application state
const initialState = {
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
  INIT: () => initialState,

  // Temporary stat updating?
  UPDATE_STATS: (returnState, action) => {
    const rs = returnState;

    // Update the stat if provided, otherwise use the old value
    rs.level = action.lvl || rs.lvl;
    rs.experience = action.xp || rs.xp;
    rs.gold = action.currency || rs.gold;
    rs.currentStamina = action.stamina || rs.currentStamina;
    console.log('w00t XP', rs.experience);
    return rs;
  },
  UPDATE_LEVEL: (returnState, action) => {
    const rs = returnState;

    rs.level = action.lvl;
    return rs;
  },
  UPDATE_EXPERIENCE: (returnState, action) => {
    const rs = returnState;

    rs.experience = action.xp;
    console.log('w00t00t XP', rs.experience);
    return rs;
  },
  UPDATE_GOLD: (returnState, action) => {
    const rs = returnState;

    rs.gold = action.currency;
    return rs;
  },
  UPDATE_CURRENT_STAMINA: (returnState, action) => {
    const rs = returnState;

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
