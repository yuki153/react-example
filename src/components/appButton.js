import React from 'react';
import styles from './appButton.module.scss';

export const AppButton = props => {
  return (
    <button className={styles.appButton}>
      { props.value }
    </button>
  )
}
