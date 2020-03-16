import React, { useContext } from 'react';
import styles from './works.module.scss'
import { rootContext } from './../index';

export const Works = props => {
    const [ , setTitle ] = useContext(rootContext);
    setTitle('Works');
    return (
    <div className={styles.works}>
      <section className={styles.works__work}>
        <h1 className={styles.works__title}>Product No.1</h1>
        <img src="http://placehold.it/800x300" width="800" height="300" alt=""/>
      </section>
      <section className={styles.works__work}>
        <h1 className={styles.works__title}>Product No.2</h1>
        <img src="http://placehold.it/400x300" width="400" height="300" alt=""/>
      </section>
      <section className={styles.works__work}>
        <h1 className={styles.works__title}>Product No.3</h1>
        <img src="http://placehold.it/400x300" width="400" height="300" alt=""/>
      </section>
      <section className={styles.works__work}>
        <h1 className={styles.works__title}>Product No.4</h1>
        <img src="http://placehold.it/400x300" width="400" height="300" alt=""/>
      </section>
    </div>
  );
};
