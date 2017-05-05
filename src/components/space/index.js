import React from 'react';
import Page from '../../partial/page/page';
import {Card} from 'material-ui/Card';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Auth from '../../partial/spaceAuth';
import Loading from '../../partial/loading/loading';
import './space.less';

class Space extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
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
	render(){
		if(!this.state.loaded){
			return (
				<Page isLeftMenu={true} isRightMenu={false}>
					<div className="space-container">
						<Loading words=""/>
					</div>
				</Page>
			)
		}
		let sHash = window.location.hash;
		return (
			<Page isLeftMenu={true} isRightMenu={false}>
				<div className="space-container">
				  <Card className="contents-header">
				  	<div className={(sHash == "#/space/space_blog_list" || sHash == "#/space") ? "add-blog" : "add-blog hide"}>
					  	<Link to="/space/space_article_edit">
					  		<RaisedButton label="新 增" primary={true} />
					  	</Link>
				  	</div>
				  	<div className="switch-contents"> 
					  	<Link to="/space/space_blog_list">
					  		<RaisedButton label="文 章" className="btn" secondary={sHash == "#/space/space_blog_list" || sHash == "#/space"} />
					  	</Link>
					  	<Link to="/space/space_comment_list">
				  			<RaisedButton label="评 论" className="btn" secondary={sHash == "#/space/space_comment_list"} />
					  	</Link>
					  	<Link to="/space/space_classify_list">
				  			<RaisedButton label="类目" className="btn" secondary={sHash == "#/space/space_classify_list"} />
					  	</Link>  	
				  	</div>
			  	</Card>
					<div className="contents-main">
						{this.props.children}
					</div>	
				</div>
			</Page>
		)
	}
}

export default Space;