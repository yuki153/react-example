export const actionTypes = {
  TEST: 'test',
  SET_PRINT: 'set_print',
  INCREMENT: 'increment',
  TEST_THUNK: 'test_thunk',
};

export const testThunk = () => async (dispatch) => {
  const result = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('thunk you!');
    },3000);
  });
  dispatch({
    type: actionTypes.TEST_THUNK,
    payload: result
  });
};

