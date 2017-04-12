import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Auth from '../../partial/spaceAuth';
import {Link} from 'react-router';
import Loading from '../../partial/loading/loading';
class SpaceBlogList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			loaded:false,
			dialog:false,
			dialog_words:'确定删除该文章吗？'
		};
		this.delete_id = '';
	}
	componentDidMount() {
		Auth(() => {
			fetch('/api/space/bloglist')
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
	handleDelete = (id) => {
		this.delete_id = id;
		this.setState({
			dialog:true
		})
	}
	handleDialogClose = () => {
		this.delete_id = '';
		this.setState({
			dialog:false
		})
	}
	handleComfirm = () => {
		fetch('/api/space/blog_delete',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				_id:this.delete_id
			})
		}).then((res) =>{
			return res.json();
		}).then((data) => {
			if(data.status == 0){
				this.setState({
					dialog:true,
					dialog_words:'删除失败！请检查服务！'
				});
			}else {
				this.delete_id = '';
				this.setState({
					dialog:false,
					blogList:data.blogs
				})
			}
		})
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
	        	<RaisedButton label="删 除" onClick={() => {this.handleDelete(data._id)}}/>
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
			  <Dialog
          actions={[
			      <FlatButton
			        label="取消"
			        primary={true}
			        keyboardFocused={true}
			        onTouchTap={this.handleDialogClose}
			      />,
			      <FlatButton
			        label="确定"
			        primary={true}
			        onTouchTap={this.handleComfirm}
			      />]}
          modal={true}
          open={this.state.dialog}
          onRequestClose={this.handleDialogClose}
        >
        {this.state.dialog_words}
        </Dialog>
			</div>
		)
	}
}
export default SpaceBlogList