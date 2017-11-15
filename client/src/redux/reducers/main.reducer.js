import extend from 'extend';

// Set initial application state
const initialState = {
  loggedIn: true,
};

// Handle actions dispatched to the reducer
const actionHandlers = {
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
