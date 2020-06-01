export const store = {
  num: 0,
  firstPrint: 'Hello World',
  dummy: '', 
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return {...state, num: state.num + 1}
    case 'set_print':
      return {...state, firstPrint: action.payload}
    case 'test':
      return {...state, dummy: action.payload}
    default:
      return state;
  }
}
