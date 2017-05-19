import React from 'react';
import Page from '../../partial/page/page';
import {Card} from 'material-ui/Card';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Auth from '../../partial/spaceAuth';
import Loading from '../../partial/loading/loading';
import {browserHistory} from 'react-router';
import './space.less';

class Space extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			isLeftMenuDocked:true,
			isLeftMenu:true,
			loaded:false
		}
	}
	componentDidMount() {
		Auth(() => {
			this.setState({
				loaded:true
			})
		});
	}
	logout = () => {
		sessionStorage.removeItem('access_token');
		browserHistory.push('/blog');
	}
	render(){
		if(!this.state.loaded){
			return (
				<div className="main-content">
					<div className="space-container">
						<Loading words=""/>
					</div>
				</div>
			)
		}
		let sPath = window.location.pathname;
		return (
			<div className="main-content">
				<div className="space-container">
				  <Card className="contents-header">
				  	<div className="switch-contents"> 
					  	<Link to="/space/space_blog_list">
					  		<RaisedButton label="文 章" className="btn" secondary={sPath == "/space/space_blog_list" || sPath == "/space"} />
					  	</Link>
					  	<Link to="/space/space_comment_list">
				  			<RaisedButton label="评 论" className="btn" secondary={sPath == "/space/space_comment_list"} />
					  	</Link>
					  	<Link to="/space/space_classify_list">
				  			<RaisedButton label="类目" className="btn" secondary={sPath == "/space/space_classify_list"} />
					  	</Link> 
				  	</div>
				  	<div className={(sPath == "/space/space_blog_list" || sPath == "/space") ? "add-blog" : "add-blog hide"}>
					  	<Link to="/space/space_article_edit">
					  		<RaisedButton label="新 增" primary={true} />
					  	</Link>
				  	</div>
				  	<div className="log-out">
					  	<FlatButton label="退出" onClick={this.logout} />
				  	</div>
			  	</Card>
					<div className="contents-main">
						{this.props.children}
					</div>	
				</div>
			</div>
		)
	}
}

export default Space;