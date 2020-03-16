import React from 'react';
import styles from './appInput.module.scss';

export const AppInput = props => {
  return (
    <input className={styles.appInput}
      type="text"
      onChange={(e) => props.emit(e.target.value)}></input>
  )
}
