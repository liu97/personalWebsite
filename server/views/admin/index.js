import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from 'react-router-config';
import {HashRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduexs from 'reducers';
import routes from 'routes';

let store = createStore(
	reduexs,
	applyMiddleware(thunk)
);
ReactDOM.render(
  <Provider store={store}>  
    <Router>
      {renderRoutes(routes)}
    </Router>
  </Provider>,
  document.getElementById('root')
);