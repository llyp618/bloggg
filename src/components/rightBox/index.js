import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './index.less';
class RightBox extends React.Component{
	
	render(){
		return (
			<ReactCSSTransitionGroup transitionName="right-box" transitionAppear={true} transitionAppearTimeout={1000} transitionEnterTimeout={500} transitionLeaveTimeout={500}>
				<div className="right-box">
					{this.props.children}
				</div>
			</ReactCSSTransitionGroup>
		)
	}
}

export default RightBox;