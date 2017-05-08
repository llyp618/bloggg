import React from 'react';
import Page from '../../partial/page/page.js';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import './home.less';
import blogImg from '../../images/blog.svg';
import dailyImg from '../../images/dailylife.svg';
import spaceImg from '../../images/space.svg';
class EntryPaper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {zDepth:1};
		this.style = {
			height:340,
			width:300,
			margin:20,
			display: 'inline-block',
		}
	}
	_onMouseEnter = () => this.setState({zDepth:2});
	_onMouseLeave = () => this.setState({zDepth:1});
	render(){
		return (
			<Paper style={this.style} onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave} zDepth={this.state.zDepth} >
				{this.props.children}
			</Paper>
		)
	}
}
class Entry extends React.Component {

	constructor(props) {
		super(props);
		
	}
	render(){
		return (
			<div className="entry-wrap">
				<EntryPaper>
					<Link className="link" to="/visit/blog/all">
						<div className="entry-paper-body">
							<img src={blogImg} width="90%" alt=""/>
						</div>
					</Link>
				</EntryPaper>
				<EntryPaper>
					<Link className="link" to="/visit/daily">
						<div className="entry-paper-body">
							<img src={dailyImg} width="90%" alt=""/>
						</div>
					</Link>
				</EntryPaper>
				<EntryPaper>
					<Link className="link" to="/space">
						<div className="entry-paper-body">
							<img src={spaceImg} width="90%" alt=""/>
						</div>
					</Link>
				</EntryPaper>
			</div>
		)
	}
}
class Home extends React.Component {

	render(){
		return (
				<Page isLeftMenu={false} isRightMenu={false} isHome={true}>
					<h1 className="website-title">LuLu的博客</h1>
					<Entry />
				</Page>
			)
	}
}

export default Home;