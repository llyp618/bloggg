import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './index.less';
class Animation extends React.Component {
	render(){
		return (
			<div className="animation-box">
				<ReactCSSTransitionGroup 
					transitionName="excited"
					transitionAppear={true}
		      transitionAppearTimeout={1000}
		      transitionEnter={false}
		      transitionLeave={false}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}
				>
				<span className="excited">sad</span>
				</ReactCSSTransitionGroup>

			</div>
		)
	}
}

export default Animation