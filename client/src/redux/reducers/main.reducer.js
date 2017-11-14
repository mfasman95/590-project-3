import extend from 'extend';

// Set initial application state
const initialState = {
  rooms: {},
};

// Handle actions dispatched to the reducer
const actionHandlers = {
  INIT: (returnState, action) => {
    const rs = returnState;

    // Set the initial rooms
    rs.rooms = action.rooms;
    rs.id = action.id;
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
