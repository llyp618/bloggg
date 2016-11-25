import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from 'react-router';
import './normalize.css';
import './common.css';
import Page from './components/page/index.js';
import ArticleList from './components/articleList/index.js';
import Animation from './components/animation/index.js';
class App extends React.Component {  //组件名首字母一定要大写
	render(){
		return (
				<Router history={hashHistory}>
					<Route path="/" component={Page}>
						<Route path="1" component={ArticleList} /> 
						<Route path="2" component={Animation} /> 
					</Route>
				</Router>
		)
	}
}
ReactDOM.render(<App />,document.getElementById('app'));