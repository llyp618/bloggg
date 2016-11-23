import React from 'react';

class LeftMenuLi extends React.Component {
	render(){
		return (
			<li>
				<a href={this.props.href}>{this.props.title}</a>
			</li>
		)
	}
}
export default LeftMenuLi;