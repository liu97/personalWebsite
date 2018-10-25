import './index.less'
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
// import { renderRoutes } from 'react-router-config';
import renderRoutes from 'utils/renderRoutes';
import { authPath } from 'utils/config';
import {HashRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduexs from 'reducers';
import routes from 'routes';
import ConfirmLogin from 'pages/ConfirmLogin';

const authed = true;

let store = createStore(
	reduexs,
	applyMiddleware(thunk)
);
ReactDOM.render(
  <Provider store={store}>  
    <Router>
      <ConfirmLogin></ConfirmLogin>
    </Router>
  </Provider>,
  document.getElementById('root')
);