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
	static defaultProps = {
		isHome : false,
		isRightMenu : true
	}
	drawerToggle = () => this.setState({open:!this.state.open})

	handleClose = () => this.setState({open: false})

	itemTouchtapHandler = (event,item,index) => {
		window.location.hash = item.props.value;
	}

	componentWillMount() {
		window.scrollTo(0,0)
	}
	render(){
		const Childs = this.props.isRightMenu ?
					<div className="main-content">
						<div className="left-box" >
							{this.props.children}
						</div>
						<RightMenu/>
					</div> :
		 			<div className="main-content">
						{this.props.children}
					</div> ;

		return (
			<MuiThemeProvider>
				<div className="main-page">
					<AppBar title="Hello World" onLeftIconButtonTouchTap={this.drawerToggle} style={{position:"fixed",top:0}}/>
					<Drawer open={this.props.isHome ? this.state.open : true }  onRequestChange={(open) => this.setState({open})} width={224}>
						<AppBar 
							title={<Link to="/" className="link" style={{color:"#fff"}}>Home</Link>}
					    iconElementLeft={<IconButton><FontIcon className="iconfont icon-home2" /></IconButton>}
					    onTitleTouchTap={this.handleClose}
				     />
				     	<Menu width={200} onItemTouchTap={this.itemTouchtapHandler} value={window.location.hash}>
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