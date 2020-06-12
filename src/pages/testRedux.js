import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { testThunk, actionTypes } from "../actions/appActions"

const ReducTestChild = React.memo(() => {
  console.log('reduxTestChild rendering');
  const dispatch = useDispatch();
  const num = useSelector(state => state.num);
  return (
  <div>
    <p>子要素</p>
    <p>{num}</p>
    <button onClick={() => {
      dispatch({
        type: actionTypes.TEST,
        payload: Math.random().toString(32).substring(2),
      })}}>
      {/* 親と関係のない state 変更のテスト */}
      change dummy state button
    </button>
  </div>
  )
});

export const ReduxTest1 = props => {
  console.log('redux1 rendering');
    const dispatch = useDispatch();
    const firstPrint = useSelector(state => state.firstPrint);
    return (
    <div className='reduxTest1'>
      redux1
      <p>{firstPrint}</p>
      <button onClick={() => {
      dispatch({
        type: actionTypes.SET_PRINT,
        payload: 'Piyo!'
      })}}>
      change print button
      </button>
      <button onClick={() => {
      dispatch({
        type: actionTypes.INCREMENT
      })}}>
      increment button
      </button>
      <button onClick={() => { dispatch(testThunk())} }>
      {/* 親と関係のない state 変更のテスト */}
      test redux-thunk
      </button>
      <ReducTestChild/>
    </div>
  );
};

export const ReduxTest2 = props => {
  console.log('redux2 rendering');
  const dispatch = useDispatch();
  const firstPrint = useSelector(state => state.firstPrint);
  const dummy = useSelector(state => state.dummy);
  return (
  <div className='reduxTest2'>
    redux2
    <p>{firstPrint}</p>
    <p>{dummy}</p>
    <button onClick={() => {
      dispatch({
        type: actionTypes.SET_PRINT,
        payload: 'hoge!',
      });
    }}>
      dispatch button
    </button>
  </div>
);
};
