import extend from 'extend';

// Set initial application state
const initialState = {
  loggedIn: false,
  inGame: false,
};

// Handle actions dispatched to the reducer
const actionHandlers = {
  CSRF: (returnState, action) => {
    const rs = returnState;

    // Store updated csrf token
    rs.csrf = action.csrf;
    console.log(action);
    return rs;
  },
  INIT: (returnState, action) => {
    const rs = returnState;

    // Set the initial rooms
    rs.id = action.id;
    return rs;
  },
  LOGIN: (returnState) => {
    const rs = returnState;

    // Set the logged in flag
    rs.loggedIn = true;
    return rs;
  },
  LOGOUT: (returnState) => {
    const rs = returnState;

    rs.loggedIn = false;
    return rs;
  },
  ADVENTURE_START: (returnState) => {
    const rs = returnState;

    rs.inGame = true;
    return rs;
  },
  ADVENTURE_END: (returnState) => {
    const rs = returnState;

    rs.inGame = false;
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
