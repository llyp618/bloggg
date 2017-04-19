import React from 'react';
import Page from '../../partial/page/page.js';

class Visit extends React.Component {
	constructor(props) {
		super(props);
		
	}


	render() {
		return (
        <Page isLeftMenu={true} isRightMenu={true}>
        	{this.props.children}
        </Page>
			)
	}
}

export default Visit;