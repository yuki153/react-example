import React from 'react';
import styles from './square.module.scss';

/**
 * Functional Component は引数として props を渡される
 * function でも arrow 関数でも定義可能
 * @param {Object} props
 */
export const Square = props => {
  return (
    <button
      className={styles.square}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
