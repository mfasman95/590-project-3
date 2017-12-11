import extend from 'extend';

// Set initial application state
const initialState = {};

// Handle actions dispatched to the reducer
const actionHandlers = {
  CLEAR_SESSION: () => initialState,
  UPDATE_PARTY: (returnState, action) => {
    const rs = returnState;

    const partyMemberKeys = Object.keys(action.partyMembers);
    for (let i = 0; i < partyMemberKeys.length; i++) {
      rs[partyMemberKeys[i]] = action.partyMembers[partyMemberKeys[i]];
      rs[partyMemberKeys[i]].key = partyMemberKeys[i];
    }
    return rs;
  },
  UPDATE_PARTY_MEMBER: (returnState, action) => {
    const rs = returnState;

    rs[action.partyMember.key] = action.partyMember;
    return rs;
  },
  DELETE_PARTY_MEMEBER: (returnState, action) => {
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
