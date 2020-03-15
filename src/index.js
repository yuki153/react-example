import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Game from './pages/game';
import Home from './pages/home';
import Detail from './pages/detail';
import './ress.css';
import './index.scss';

const App = () => {
  return (
    <BrowserRouter>
      <h1 className="pageTitle">React sample page for learning</h1>
      <nav className="pageNav">
      <h1 className="pageNav__title">Pages</h1>
        <ul className="pageNav__items">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/detail">Detail</Link></li>
          <li><Link to="/game">Game</Link></li>
        </ul>
      </nav>
      <section className="pageContents">
        <h1 className="pageNContents__content">Contents</h1>
        <main>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/game' component={Game}/>
          {/* 下記の方法では Game は ReactRouter の機能にアクセスできず、props.history などは undefined となる */}
          {/* <Route path='/game'><Game/></Route>*/}
          <Route path='/detail' component={Detail}/>
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
