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
import SpaceLogin from '../components/space/space_login';
import SpaceBlogList from '../components/space/space_blog_list';
import SpaceCommentList from '../components/space/space_comment_list';
import SpaceClassifyList from '../components/space/space_classify_list.js';
import SpaceArticleEdit from '../components/space/space_article_edit';
import Visit from '../components/visit'
import Page from '../partial/page/page';
class App extends React.Component {  //组件名首字母一定要大写
	constructor(props) {
		super(props);
		this.state = {
			isLeftMenu:true,
			isLeftMenuDocked:true
		}
	}

	checkDeviceWidth = () => {
		let winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
		if(winWidth < 760){
			this.setState({
				isLeftMenu:false,
				isLeftMenuDocked:false
			})
		}
		if(winWidth > 760){
			this.setState({
				isLeftMenu:true,
				isLeftMenuDocked:true
			})
		}
	}

	componentWillMount() {
		this.checkDeviceWidth()
		window.onresize = this.checkDeviceWidth;
	}
	render(){
		let sHashRoot = window.location.hash.match(/#\/[^\/]*/)[0];
		let isHome = sHashRoot == '#/';   //需要优化
		return (
			<MuiThemeProvider>
				<Page isHome={isHome} isLeftMenu={isHome ? false : this.state.isLeftMenu} isLeftMenuDocked={this.state.isLeftMenuDocked}>
					{this.props.children}
				</Page>
			</MuiThemeProvider>
		)
	}
}

const routes=	
			<Route path="/" component={App}>
				<IndexRoute  component={Home} />
				<Route path="/visit" component={Visit}>
					<IndexRoute component={Blog} />
					<Route path="/blog(/:classify)" component={Blog}>
					</Route>
					<Route path="/:type/article/:id" component={Article}>
					</Route>
					<Route path="/daily" component={Daily}>
					</Route>
				</Route>
				<Route path="/space" component={Space}>
					<IndexRoute component={SpaceBlogList} />
					<Route path="/space/space_blog_list" component={SpaceBlogList} />
					<Route path="/space/space_comment_list" component={SpaceCommentList} />
					<Route path="/space/space_classify_list" component={SpaceClassifyList} />
				</Route>
				<Route path="/space/space_article_edit(/:blog_id)" component={SpaceArticleEdit}>
				</Route>
				<Route path="/space/space_login" component={SpaceLogin}>
				</Route>
			</Route>
export default routes;