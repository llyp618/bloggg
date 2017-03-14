import React from 'react';
import Paper from 'material-ui/Paper';
import {List,ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';	
import Calendar from 'material-ui/DatePicker'
import './rightMenu.less';
import headerImg from '../../images/header.jpg';
class RightMenu extends React.Component{
	render(){
		return (
			<div className="right-menu">
				<Paper >
					<div className="owner-head">
						<img src={headerImg} alt=""/>
						<strong>LuLu</strong>
					</div>
					<Divider />
					<div className="info-list">
						<List>
							<ListItem insetChildren={true} primaryText="first info" />
							<Divider inset={true} />
							<ListItem insetChildren={true} primaryText="second info" />
							<Divider inset={true} />
							<ListItem  insetChildren={true} primaryText="third info" />
						</List>
					</div>
				</Paper>
				<Paper style={{marginTop:20}}>
				</Paper>
			</div>
			
		)
	}
}

export default RightMenu;