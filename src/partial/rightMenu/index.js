import React from 'react';
import Paper from 'material-ui/Paper';
import {List,ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';	
import Calendar from 'material-ui/DatePicker'
import './rightMenu.less';
import headerImg from '../../images/header.jpg';
import 'whatwg-fetch';
import UtilPb from '../UtilPb'



class RightMenu extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			classifyList:[]
		}
	}
	componentDidMount() {
		fetch('/api/space/blog_classify_list')
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			this.setState({
				classifyList:data.classifyList
			})
		})
	}
	handleClick = (v) => {
		UtilPb.dispatch('classifySearch',v)
	}
	render(){
		let classifyList = this.state.classifyList, ListItems = [];
		classifyList.map( (v,i) => {
			if(v == 'Daily') return;
			ListItems.push(
				<ListItem insetChildren={true} key={i} onClick={() => {this.handleClick(v)}} primaryText={v} />
			)
		})
		return (
			<div className="right-menu">
				<Paper>
					<div className="owner-head">
						<img src={headerImg} alt=""/>
						<strong>LuLu</strong>
					</div>
					<Divider />
					<div className="info-list">
						<List>
							{ListItems}
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