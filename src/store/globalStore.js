import { actionTypes } from '../actions/appActions';

export const store = {
  num: 0,
  firstPrint: 'Hello World',
  dummy: '', 
}

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {...state, num: state.num + 1}
    case actionTypes.SET_PRINT:
      return {...state, firstPrint: action.payload}
    case actionTypes.TEST:
      return {...state, dummy: action.payload}
      case actionTypes.TEST_THUNK:
        return {...state, firstPrint: action.payload}
    default:
      return state;
  }
}
