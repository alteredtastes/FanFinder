export default (state={}, action) => {
  // if (action.type === "Home_Action_1") state = {...state, name: action.payload}
  switch(action.type) {
    case "Home_Action_1": {
      return {...state, name: action.payload}
    }
    default:
      return state;
  }
}
