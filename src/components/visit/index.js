import React from 'react';
import Page from '../../partial/page/page.js';
import RightMenu from '../../partial/rightMenu';
class Visit extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className="main-content">
				<div className="left-box" >
      	{this.props.children}
      	</div>
				<RightMenu/>
			</div>
			)
	}
}

export default Visit;