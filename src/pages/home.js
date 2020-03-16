import React, { useContext, useState } from 'react';
import { AppButton } from './../components/appButton';
import { AppInput } from './../components/appInput';
import { rootContext } from './../index';
import styles from './home.module.scss';

export const Home = props => {
  const [ , setTitle ] = useContext(rootContext);
  const [ buttonVal, setButtonVal ] = useState('input value');
  setTitle('Home');
  return (
    <>
      <section>
        <h1>Route informations</h1>
        <p>{`history: ${JSON.stringify(props.history, null, '\t')}`}</p>
        <p>{`location: ${JSON.stringify(props.location, null, '\t')}`}</p>
        <p>{`match: ${JSON.stringify(props.match, null, '\t')}`}</p>
      </section>
      <div className={styles.testComponents}>
        <AppButton value={`Button component : ${buttonVal ? buttonVal : 'input value'}`}/>
        <AppInput emit={setButtonVal}/>
      </div>
    </>
  );
}

