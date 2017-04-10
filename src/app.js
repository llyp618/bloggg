import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute,Redirect} from 'react-router';
import './normalize.css';
import './common.css';
import injectTapEventPlugin from 'react-tap-event-plugin'; 
import Page from './partial/page/page';
import Home from './components/home';
import Blog from './components/blog';
import Daily from './components/daily';
import Space from './components/space';
import Article from './components/article';
import SpaceLogin from './components/space/space_login';
import SpaceBlogList from './components/space/space_blog_list';
import SpaceCommentList from './components/space/space_comment_list';
import SpaceArticleEdit from './components/space/space_article_edit';
injectTapEventPlugin();
class App extends React.Component {  //组件名首字母一定要大写
	render(){
		return (
				<Router history={hashHistory}>
						<Route path="/" component={Home}>
						</Route>
						<Route path="/blog" component={Blog}>
						</Route>
						<Route path="/:type/article/:id" component={Article}>
						</Route>
						<Route path="/daily" component={Daily}>
						</Route>
						<Route path="/space" component={Space}>
							<IndexRoute component={SpaceBlogList} />
							<Route path="/space/space_blog_list" component={SpaceBlogList}>
							</Route>
							<Route path="/space/space_comment_list" component={SpaceCommentList}>
							</Route>
						</Route>
						<Route path="/space/space_article_edit(/:blog_id)" component={SpaceArticleEdit}>
						</Route>
						<Route path="/space/space_login" component={SpaceLogin}>
						</Route>
				</Router>
		)
	}
}
ReactDOM.render(<App />,document.getElementById('app'));