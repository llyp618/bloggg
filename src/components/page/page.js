import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
class Page extends React.Component {
	constructor(props){
		super(props);
		this.state = {open:false};
	}
	drawerToggle = () => this.setState({open:!this.state.open});
	handleClose = () => this.setState({open: false});
	render(){
		return (
			<MuiThemeProvider>
				<div className="main-page" style={{paddingTop:64}}>
					<AppBar title="Hello World" onLeftIconButtonTouchTap={this.drawerToggle} style={{position:"fixed",top:0}}/>
					<Drawer open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})} >
						<AppBar 
							title={<Link to="/" className="link" style={{color:"#fff"}}>Home</Link>}
					    iconElementLeft={<IconButton><FontIcon className="iconfont icon-home2" /></IconButton>}
					    onTitleTouchTap={this.handleClose}
				     />
						<Menu onItemTouchTap={this.handleClose}>
							<MenuItem><Link to="/blog" className="link">My Blog</Link></MenuItem>
							<MenuItem><Link className="link">My DailyLife</Link></MenuItem>
							<MenuItem><Link className="link">My Personal Space</Link></MenuItem>
						</Menu>
					</Drawer>
					{this.props.children}
					<div className="footer">
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
}

export default Page;