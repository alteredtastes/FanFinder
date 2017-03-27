const HomePageReducer = (state={}, action) => {
  if (action.type === "Home_Action_1") state = {...state, name: action.payload}
  return state;
}

export { HomePageReducer };
