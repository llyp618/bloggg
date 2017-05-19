import React from 'react';
import Paper from 'material-ui/Paper';
// import {List,ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';	
import Calendar from 'material-ui/DatePicker'
import './rightMenu.less';
import headerImg from '../../images/header.jpg';
import 'whatwg-fetch';
import {Link} from 'react-router';

class RightMenu extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			classifyList:[]
		}
	}
	componentDidMount() {
		fetch('/api/space/blog_classify_list',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			}
		})
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			this.setState({
				classifyList:data.classifyList
			})
		})
	}
	render(){
		let classifyList = this.state.classifyList, ListItems = [];
		classifyList.map( (v,i) => {
			if(v.classify == 'Daily') return;
			ListItems.push(
					<Link to={`/blog/${encodeURI(v.classify)}`} key={i} className="fast-link" activeStyle={{background:'#f3f3f3'}}>{v.classify}({v.article_num})</Link>
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
						<Link to={`/blog/all`} className="fast-link" activeStyle={{background:'#f3f3f3'}}>全部分类</Link>
						{ListItems}
					</div>
				</Paper>
				<Paper style={{marginTop:20}}>
				</Paper>
			</div>
			
		)
	}
}

export default RightMenu;