import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RightMenu from '../rightMenu/rightMenu';
import './page.less';
class Page extends React.Component {
	constructor(props){
		super(props);
		this.state = {open:false};
	}
	static propTypes = {
		isLeftMenu:React.PropTypes.bool.isRequired,
		isRightMenu:React.PropTypes.bool.isRequired
	};
	drawerToggle = () => this.setState({open:!this.state.open})

	handleClose = () => this.setState({open: false})

	itemTouchtapHandler = (event,item,index) => {
		window.location.hash = item.props.value;
	}

	componentWillMount() {
		window.scrollTo(0,0)
	}
	render(){
		let Childs = this.props.isRightMenu ?
					<div className="main-content">
						<div className="left-box" >
							{this.props.children}
						</div>
						<RightMenu/>
					</div> :
		 			<div className="main-content">
						{this.props.children}
					</div> ;
		let sHashRoot = window.location.hash.match(/#\/[^\/]*/)[0];
		return (
			<MuiThemeProvider>
				<div className="main-page">
					<AppBar title="LuLu's Blog" onLeftIconButtonTouchTap={this.drawerToggle} style={{position:"fixed",top:0}}/>
					<Drawer open={this.props.isLeftMenu ? true : this.state.open  }  onRequestChange={(open) => this.setState({open})} width={224}>
						<AppBar 
							title={<Link to="/" className="link" style={{color:"#fff"}}>Home</Link>}
					    iconElementLeft={<IconButton><FontIcon className="iconfont icon-home2" /></IconButton>}
					    onTitleTouchTap={this.handleClose}
				     />
				     	<Menu width={200} onItemTouchTap={this.itemTouchtapHandler} value={sHashRoot}>
							<MenuItem value="#/blog" primaryText="Blog" />
							<MenuItem value="#/daily" primaryText="Daily" />
							<MenuItem value="#/space" primaryText="Space" />
							</Menu>
					</Drawer>
					{Childs}
					<div className="footer" >
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
}

export default Page;