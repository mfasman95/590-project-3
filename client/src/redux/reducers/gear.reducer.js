import extend from 'extend';

// Set initial application state
const initialState = {
  0: {
    name: 'Jim\'s Sword',
  },
  1: {
    name: 'Jen\'s Sword',
  },
};

// Handle actions dispatched to the reducer
const actionHandlers = {
  UPDATE_GEAR: (returnState, action) => {
    const rs = returnState;

    rs[action.gear.id] = action.gear;
    return rs;
  },
  DELETE_GEAR: (returnState, action) => {
    const rs = returnState;

    delete rs[action.id];
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