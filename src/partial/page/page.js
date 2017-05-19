import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import {browserHistory} from 'react-router';
import './page.less';
class Page extends React.Component {
	constructor(props){
		super(props);
		this.state = {open:false};
	}
	static propTypes = {
		isLeftMenu:React.PropTypes.bool.isRequired
	};
	drawerToggle = () => this.setState({open:!this.state.open})

	handleClose = () => this.setState({open: false})

	itemTouchtapHandler = (event,item,index) => {
		let nextPath = item.props.value;
		
		browserHistory.push(nextPath)
		this.setState({
			open:!this.state.open
		})
	}
	componentDidMount() {
		window.scrollTo(0,0)
	}
	render(){
		let sPathRoot = this.props.sPathRoot;
		return (
				<div className="main-page">
					<AppBar title="LuLu's Blog" onLeftIconButtonTouchTap={this.drawerToggle} style={{position:"fixed",top:0}} />
					<Drawer docked={this.props.isLeftMenuDocked} open={this.props.isLeftMenu ? true : this.state.open  }  onRequestChange={(open) => this.setState({open})} width={224}>
						<AppBar 
							title={<Link to="/" className="link" style={{color:"#fff"}}>Home</Link>}
					    iconElementLeft={<IconButton><FontIcon className="iconfont icon-home2" /></IconButton>}
					    onTitleTouchTap={this.handleClose}
				     />
				     	<Menu className="left-menu" width={200} onItemTouchTap={this.itemTouchtapHandler} value={sPathRoot}>
							<MenuItem value="/blog"  primaryText={<span><span className="iconfont icon-bokefenlei"></span>Blog</span>} />
							<MenuItem value="/daily" primaryText={<span><span className="iconfont icon-xiangji1"></span>Daily</span>} />
							<MenuItem value="/space" primaryText={<span><span className="iconfont icon-pussy"></span>Space</span>} />
							</Menu>
					</Drawer>
						{this.props.children}
					<div className={this.props.isHome?'footer home-footer':'footer'} >
						<p>
						  Powered by : &nbsp;&nbsp;&nbsp;
							<a href="https://nodejs.org/en/" target="_blank">Node.js</a>&nbsp;-&nbsp;
							<a href="https://www.mongodb.com" target="_blank">MongoDB</a>&nbsp;-&nbsp;
							<a href="http://www.expressjs.com.cn/" target="_blank">Express</a>&nbsp;-&nbsp;
							<a href="https://facebook.github.io/react/" target="_blank">React</a>&nbsp;-&nbsp;  
							<a href="http://www.material-ui.com/" target="_blank">Material UI</a>&nbsp;-&nbsp; 
							<a href="http://webpack.github.io/" target="_blank">Webpack</a>
						</p>
						<p>
							Email : &nbsp;&nbsp;&nbsp;lllyp618@163.com &nbsp;&nbsp;(～ o ～)~zZ 
						</p>
						<p>
							浙ICP备17019260号
						</p>
					</div>
				</div>
		)
	}
}

export default Page;