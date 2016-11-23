import React from 'react';
import './index.less';
import LeftMenuLi from './leftMenuLi.js';
class LeftMenu extends React.Component {
	liData(){
		return [
			{title:"list1",href:"1"},
			{title:"list2",href:"2"},
			{title:"list3",href:"3"},
			{title:"list4",href:"4"},
		]
	}               //不需要逗号 ","

	renderData(data){
		return data.map((v,i)=>{           //es5 新增map方法
			return  <LeftMenuLi key={i} href={v.href} title={v.title} />
		})
	}

	render(){
		return (
			<div className="left-menu">
				<h2>LULU</h2>
				<ul>
					{this.renderData(this.liData())}
				</ul>
			</div>
		)
	}
}
export default LeftMenu;