import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { Game } from './pages/game';
import { Works } from './pages/works';
import { Home } from './pages/home';
import { ReduxTest1, ReduxTest2 } from './pages/testRedux';
import { state, reducer } from './store/appReducer';
import thunk from 'redux-thunk';
import './ress.css';
import './index.scss';

export const rootContext = React.createContext();
const { useState } = React;

const appStore = createStore(reducer, state, applyMiddleware(thunk));

/**
 * Context の state 変更が変更されると、その state の使用可否関係無しに子要素 (Context provider配下要素) が再度レンダリングされる。
 *   それを止めるには、Provider 自身と配下の要素を React.memo で再レンダリングさせない必要性がある。
 *   Provider を React.memo するとレンダリングがスキップされた時に、子要素に Context state の変更は通知されない。
 * Redux store の state 変更では、変更した state に関連する子要素（Redux Provider 配下要素）のみ再レンダリングされる。
 *   再レンダリングされた子要素の孫要素も再レンダリングされるが（Context 場合も同じ）React.memo で孫要素の再レンダリングは防げる。
 *   Provider 自身が React.memo でラップされていても、state 変更は子要素に通知される（Provider 自身のレンダリングと state 変更の通知は関係ない）
 */
const Pages = React.memo((props) => {
    console.log('Provider rendering');
    return (
      <>
        <rootContext.Provider value={props.providerValues}>
          <Route exact path='/' component={Home}></Route>
          <Route path='/game' component={Game}/>
          {/* 下記の方法では Game は ReactRouter の機能にアクセスできず、props.history などは undefined となる */}
          {/* <Route path='/game'><Game/></Route>*/}
          <Route path='/works' component={Works}/>
        </rootContext.Provider>

        <Provider store={appStore}>
          <Route path='/redux-test1' component={ReduxTest1}/>
          <Route path='/redux-test2' component={ReduxTest2}/>
        </Provider>
      </>
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
            <li><Link to="/redux-test1">redux-test1</Link></li>
            <li><Link to="/redux-test2">redux-test2</Link></li>
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
