import React from 'react';
import Page from '../../partial/page/page.js';

class Visit extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLeftMenu:true,
			isRightMenu:true,
			isLeftMenuDocked:true
		}
	}

	checkDeviceWidth = () => {
		let winWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || 0;
		if(winWidth < 760){
			this.setState({
				isLeftMenu:false,
				isRightMenu:false,
				isLeftMenuDocked:false
			})
		}
		if(winWidth > 760){
			this.setState({
				isLeftMenu:true,
				isRightMenu:true,
				isLeftMenuDocked:true
			})
		}
	}

	componentWillMount() {
		this.checkDeviceWidth()
		window.onresize = this.checkDeviceWidth;
	}
	render() {
		return (
        <Page isLeftMenu={this.state.isLeftMenu} isRightMenu={this.state.isRightMenu} isLeftMenuDocked={this.state.isLeftMenuDocked}>
        	{this.props.children}
        </Page>
			)
	}
}

export default Visit;