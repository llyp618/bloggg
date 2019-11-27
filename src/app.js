import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'; 
import {Router,browserHistory,match} from 'react-router';
import routes from './routes'
injectTapEventPlugin();
match({history:browserHistory,routes},(err,redirect,renderProps)=> {
  ReactDOM.render(<Router routes={routes} history={browserHistory}></Router>,document.getElementById('app'));
})