import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Auth from '../../partial/spaceAuth';
import Loading from '../../partial/loading/loading';

class SpaceClassifyList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			classifyList : [],
			loaded:false
		}
	}
	componentDidMount() {
		Auth(()=>{
			fetch('/api/space/blog_classify_list')
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				let classifyList=[];
				data.classifyList.map((v,i) => {
					classifyList.push(v.classify)
				})
				this.setState({
					classifyList:classifyList,
					loaded:true
				})
			})
		})
	}
	classifyUp = (i) =>{
		let classifyList = this.state.classifyList;
		let ary = classifyList.slice(i - 1,i + 1);
		classifyList.splice(i - 1,2,ary[1],ary[0]);
		this.setState({
			classifyList:classifyList
		});
	}
	submitHandler = () => {
		fetch('/api/space/blog_classify_modify',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				classifyList:this.state.classifyList
			})
		})
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			if(data.status == 1 ){
				alert('修改成功！')
			}else {
				alert('修改失败！')
			}
		})
	}
	render() {
		if(!this.state.loaded){
			return (
					<div className="contents-table">
						<Loading words=""/>
					</div>
			)
		}
		let classifyList = this.state.classifyList;
		let classifyTr = [];
		classifyList.map((v,i) =>{

			classifyTr.push(
				i == 0 ? 
				<TableRow selectable={false} key={i}>
					<TableRowColumn>{i+1}</TableRowColumn>
	        <TableRowColumn>{v}</TableRowColumn>
	        <TableRowColumn>
	        	 {/*  <RaisedButton label="修改" onClick={() => {}}/> &nbsp;*/}
	        </TableRowColumn>
	      </TableRow> :
				<TableRow selectable={false} key={i}>
					<TableRowColumn>{i+1}</TableRowColumn>
	        <TableRowColumn>{v}</TableRowColumn>
	        <TableRowColumn>
	        	 {/*  <RaisedButton label="修改" onClick={() => {}}/> &nbsp;*/}
	        	<RaisedButton label="上移" onClick={() => {this.classifyUp(i)}}/>
	        </TableRowColumn>
	      </TableRow>
			)
		})
		return (
			<div className="contents-table">
				<Table>
			    <TableHeader displaySelectAll={false} adjustForCheckbox={false} selectable={false} multiSelectable={false}>
			      <TableRow>
			      	<TableHeaderColumn>序号</TableHeaderColumn>
			        <TableHeaderColumn>类目</TableHeaderColumn>
			        <TableHeaderColumn>操作</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody displayRowCheckbox={false}>
			    	{classifyTr}
			    </TableBody>
			  </Table>
			  <div style={{textAlign:'center',marginTop:40}}>
			  	<RaisedButton label="确 定" primary={true} onClick={this.submitHandler}/>
			  </div>
			 </div>
			)
	}
}

export default SpaceClassifyList;