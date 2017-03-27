const SuccessPageReducer = (state={}, action) => {
  if (action.type === "Success_Action_1") state = {...state, name: action.payload}
  return state;
}

export { SuccessPageReducer };
