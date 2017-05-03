import React from 'react';
import {Router,Route,hashHistory,IndexRoute,Redirect} from 'react-router';
import '../normalize.css';
import '../common.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from '../components/home';
import Blog from '../components/blog';
import Daily from '../components/daily';
import Space from '../components/space';
import Article from '../components/article';
import Visit from '../components/visit';
import SpaceLogin from '../components/space/space_login';
import SpaceBlogList from '../components/space/space_blog_list';
import SpaceCommentList from '../components/space/space_comment_list';
import SpaceArticleEdit from '../components/space/space_article_edit';
class App extends React.Component {  //组件名首字母一定要大写
	render(){
		return (
			<MuiThemeProvider>
					{this.props.children}
			</MuiThemeProvider>
		)
	}
}

const routes=	
			<Route path="/" component={App}>
				<IndexRoute  component={Home} />
				<Route path="/visit" component={Visit}>
					<IndexRoute component={Blog} />
					<Route path="/visit/blog(/:classify)" component={Blog}>
					</Route>
					<Route path="/visit/:type/article/:id" component={Article}>
					</Route>
					<Route path="/visit/daily" component={Daily}>
					</Route>
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
			</Route>
export default routes;