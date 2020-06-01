import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { Game } from './pages/game';
import { Works } from './pages/works';
import { Home } from './pages/home';
import './ress.css';
import './index.scss';

export const rootContext = React.createContext();
const { useState } = React;

/**
 * Context の state 変更により、子要素の再レンダリングを止める場合は Provider 自身を
 *   React.memo で再レンダリングさせない必要性がある
 */
const Pages = React.memo((props) => {
    console.log('Provider rendering');
    return (
      <rootContext.Provider value={props.providerValues}>
        <Route exact path='/' component={Home}></Route>
        <Route path='/game' component={Game}/>
        {/* 下記の方法では Game は ReactRouter の機能にアクセスできず、props.history などは undefined となる */}
        {/* <Route path='/game'><Game/></Route>*/}
        <Route path='/works' component={Works}/>
      </rootContext.Provider>
    );
  }, (prev, next) => {
    console.log(prev.providerValues);
    console.log(next.providerValues);
    // true で強制的に再レンダリングを行わない。
    // 実際は props の prev と next で比較して論理値を返す
    return true;
  });

const App = () => {
  const [title, setTitle] = useState('Home'); 
  const [dummyState, setDummyState] = useState(false);

  return (
    <BrowserRouter>
      <header className="pageHeader">
        <h1 className="pageTitle">React sample page for learning</h1>
        <nav className="pageNav">
        <h1 className="pageNav__title">Pages</h1>
          <ul className="pageNav__items">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/works">Works</Link></li>
            <li><Link to="/game">Game</Link></li>
          </ul>
        </nav>
      </header>
      <section className="pageContents">
      <h1 className="pageContents__title">{title}</h1>
        <main>
        <Switch>
          <Pages providerValues={[title, setTitle, setDummyState]}/>
        </Switch>
        </main>
      </section>
    </BrowserRouter>
  )
};

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
