export default (state={testdata: 'before!'}, action) => {
  // if (action.type === "Home_Action_1") state = {...state, testData: action.payload}
  switch(action.type) {
    case "Home_Action_1": {
      return {...state, testData: action.payload}
    }
    default:
      return state;
  }
}
