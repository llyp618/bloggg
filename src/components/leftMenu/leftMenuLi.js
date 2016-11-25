import React from 'react';
import { Link } from 'react-router';
class LeftMenuLi extends React.Component {
	render(){
		return (
			<li>
				<Link to={this.props.href}>{this.props.title}</Link>
			</li>
		)
	}
}
export default LeftMenuLi;