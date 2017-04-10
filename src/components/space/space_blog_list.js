import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Auth from '../../partial/spaceAuth';
import {Link} from 'react-router';
import Loading from '../../partial/loading/loading';
class SpaceBlogList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			loaded:false
		}
	}
	componentDidMount() {
		Auth(() => {
			fetch('/api/bloglist')
				.then((res) => {
					return res.json()
				})
				.then((data) => {
					this.setState({
						loaded:true,
						blogList:data.blogs
					});
				})
		});
	}
	handleDelete = (e) => {
		console.log(e.currentTarget)
	}
	render(){
		if(!this.state.loaded){
			return (
				<div className="contents-table">
					<Loading words=""/>
				</div>
			)
		}
		let TableRows = [];
		this.state.blogList.map((data,i) => {
			TableRows.push(
				<TableRow selectable={false} key={i}>
	        <TableRowColumn>1</TableRowColumn>
	        <TableRowColumn>{data.classify}</TableRowColumn>
	        <TableRowColumn>{data.title}</TableRowColumn>
	        <TableRowColumn>{data.create_time}</TableRowColumn>
	        <TableRowColumn>
	        	<Link to={`/space/space_article_edit/${data._id}`}>
	        		<RaisedButton label="修 改" primary={true} />
	        	</Link>
	        	&nbsp;&nbsp;&nbsp;&nbsp;
	        	<RaisedButton label="删 除" data-blogId={data._id} onClick={this.handleDelete}/>
	        </TableRowColumn>
	      </TableRow>
			)
		})
		return (
			<div className="contents-table">
				 <Table>
			    <TableHeader displaySelectAll={false} adjustForCheckbox={false} selectable={false} multiSelectable={false}>
			      <TableRow>
			        <TableHeaderColumn>ID</TableHeaderColumn>
			        <TableHeaderColumn>分类</TableHeaderColumn>
			        <TableHeaderColumn>标题</TableHeaderColumn>
			        <TableHeaderColumn>日期</TableHeaderColumn>
			        <TableHeaderColumn>操作</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody displayRowCheckbox={false}>
			      {TableRows}
			    </TableBody>
			  </Table>
			</div>
		)
	}
}
export default SpaceBlogList