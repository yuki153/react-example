import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Game from './pages/game';
import Home from './pages/home';
import Detail from './pages/detail';

const App = () => {
  return (
    <BrowserRouter>
      <div>{document.title}</div>
      <Switch>
        <Route exact path='/' component={Home}></Route>
        <Route path='/game' component={Game}/>
        {/* 下記の方法では Game は ReactRouter の機能にアクセスできず、props.history などは undefined となる */}
        {/* <Route path='/game'><Game/></Route>*/}
        <Route path='/detail' component={Detail}/>
      </Switch>
      <Link to='/'>Back To Home</Link>
    </BrowserRouter>
  )
};

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
