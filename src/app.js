import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin'; 
import {Router,hashHistory} from 'react-router';
import routes from './routes'
injectTapEventPlugin();
ReactDOM.render(<Router routes={routes} history={hashHistory}></Router>,document.getElementById('app'));