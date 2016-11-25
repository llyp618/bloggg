import React from 'react';
import LeftMenu from '../leftMenu/index.js';
import RightBox from '../rightBox/index.js';
class Page extends React.Component {
	render() {
		return (
			<div className="page">
				<LeftMenu />
				<RightBox children = {this.props.children} />
			</div>
		)
	}
}
export default Page;