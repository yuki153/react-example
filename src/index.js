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

const App = () => {
  const [title, setTitle] = useState('Home'); 
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
          <rootContext.Provider value={[title, setTitle]}>
            <Route exact path='/' component={Home}></Route>
            <Route path='/game' component={Game}/>
            {/* 下記の方法では Game は ReactRouter の機能にアクセスできず、props.history などは undefined となる */}
            {/* <Route path='/game'><Game/></Route>*/}
            <Route path='/works' component={Works}/>
          </rootContext.Provider>
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
