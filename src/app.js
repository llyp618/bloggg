import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
import './normalize.css';
import './common.css';
import injectTapEventPlugin from 'react-tap-event-plugin'; 
import Page from './components/page/page.js';
import Home from './components/home'
import Blog from './components/blog';
import Article from './components/article';
injectTapEventPlugin();
class App extends React.Component {  //组件名首字母一定要大写
	render(){
		return (
				<Router history={hashHistory}>
						<Route path="/" component={Home}>
						</Route>
						<Route path="/blog" component={Blog}>
						</Route>
						<Route path="/article" component={Article}>
						</Route>
				</Router>
		)
	}
}
ReactDOM.render(<App />,document.getElementById('app'));