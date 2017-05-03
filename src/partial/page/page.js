import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import Drawer from 'material-ui/Drawer';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import RightMenu from '../rightMenu';
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
		let nextHash = item.props.value
		//bug
		if(nextHash == '#/visit/blog') {
			nextHash = '#/visit/blog/all'
		}
		window.location.hash = nextHash;
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
		// let sHashRoot = window.location.hash.match(/#\/[^\/]*/)[0];
		let hash = window.location.hash,sHashRoot;
		switch (0){
			case hash.search('#/visit/blog'):
			sHashRoot = '#/visit/blog';
			break;
			case hash.search('#/visit/daily'):
			sHashRoot = '#/visit/daily';
			break;
			case hash.search('#/space'):
			sHashRoot = '#/space';
			break;
		}
		return (
				<div className="main-page">
					<AppBar title="LuLu's Blog" onLeftIconButtonTouchTap={this.drawerToggle} style={{position:"fixed",top:0}}/>
					<Drawer open={this.props.isLeftMenu ? true : this.state.open  }  onRequestChange={(open) => this.setState({open})} width={224}>
						<AppBar 
							title={<Link to="/" className="link" style={{color:"#fff"}}>Home</Link>}
					    iconElementLeft={<IconButton><FontIcon className="iconfont icon-home2" /></IconButton>}
					    onTitleTouchTap={this.handleClose}
				     />
				     	<Menu width={200} onItemTouchTap={this.itemTouchtapHandler} value={sHashRoot}>
							<MenuItem value="#/visit/blog" primaryText="Blog" />
							<MenuItem value="#/visit/daily" primaryText="Daily" />
							<MenuItem value="#/space" primaryText="Space" />
							</Menu>
					</Drawer>
					{Childs}
					<div className="footer" >
					</div>
				</div>
		)
	}
}

export default Page;