export default (state={testdata: 'before!'}, action) => {
  // if (action.type === "Success_Action_1") state = {...state, testData: action.payload}
  switch(action.type) {
    case "Success_Action_1": {
      return {...state, testData: action.payload}
    }
    default:
      return state;
  }
}
