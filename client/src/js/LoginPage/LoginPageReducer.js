export default (state={}, action) => {
  // if (action.type === "Login_Action_1") state = {...state, name: action.payload}
  switch(action.type) {
    case "Login_Action_1": {
      return {...state, name: action.payload}
    }
    default:
      return state;
  }
}
