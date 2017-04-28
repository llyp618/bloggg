import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Auth from '../../partial/spaceAuth';
import ReactPaginate from 'react-paginate';
import Loading from '../../partial/loading/loading';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';
class SpaceCommentList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			loaded:false,
			title:'all',
			currentPage:1,
			commentList:[],
			totalPages:1,
			dialog:false,
			dialog_words:'确定删除该文章评论吗？',
			titleSources:[]
		}
		this.delete_id = '';
	}
	componentDidMount() {
		let title = this.state.title;
		Auth(() => {
			this.getTitleSources();
			this.getCommentList(title,1,() => {
				this.setState({
					loaded:true
				})
			})
		});
	}
	getTitleSources = () => {
		fetch('/api/space/get_titles').then((res) => {
			return res.json()
		}).then((data) => {
			this.setState({
				titleSources:data.titleSources
			})
		})
	}
	getCommentList = (title,currentPage,cb) => {
		fetch('/api/space/get_comments',{
			method:'POST',
			headers:{
				'Content-type':'application/json'
			},
			body:JSON.stringify({
				title,
				currentPage
			})
		}).then((res) => {
			return res.json()
		}).then((data) => {
			this.setState({
				commentList:data.comments,
				totalPages:data.totalPages,
				currentPage:currentPage
			})
			if(typeof cb == 'function'){
				cb();
			}
		})
	}
	handlePageChange = (e) => {
		let title = this.state.title;
		this.getCommentList(title,e.selected + 1,() => {
			window.scrollTo(0,0)
		});
	}
	handleDelete = (id) => {
		this.delete_id = id ;
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
		fetch('/api/space/delete_comment',{
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
			if(data.status == 'failed'){
				this.setState({
					dialog:true,
					dialog_words:'删除失败！请检查服务！'
				});
			}else {
				this.delete_id = '';
				this.getCommentList(this.state.title,this.state.currentPage,() => {
					this.setState({
						dialog:false,
					})
				});
			}
		})
	}
	updateList = (title) => {
		this.getCommentList(title,1,() => {
			this.setState({
				title:title
			})
		})	
	}
	render(){
		let titleSources = this.state.titleSources
		if(!this.state.loaded){
			return (
					<div className="contents-table">
						<Loading words=""/>
					</div>
			)
		}
		let commentTr = [] 
		this.state.commentList.map((v,i) => {
			let content = v.comment.content.substring(0,50)+'...'
			commentTr.push(
				<TableRow selectable={false} key={i}>
					<TableRowColumn width="5%">{i+1}</TableRowColumn>
	        <TableRowColumn width="20%">{v.title}</TableRowColumn>
	        <TableRowColumn width="15%">{v.comment.commenter}</TableRowColumn>
	        <TableRowColumn width="15%">{v.comment.create_time}</TableRowColumn>
	        <TableRowColumn width="30%">{content}</TableRowColumn>
	        <TableRowColumn width="10%">
	        	<RaisedButton label="删 除" onClick={() => {this.handleDelete(v._id)}}/>
	        </TableRowColumn>
	      </TableRow>
			)
		})
		if (commentTr.length == 0) {
			commentTr.push(
				<div style={{textAlign:'center',padding:20}}>
					无数据
				</div>
			)
		}
		return (
			<div className="contents-table">
				<Table>
			    <TableHeader displaySelectAll={false} adjustForCheckbox={false} selectable={false} multiSelectable={false}>
			      <TableRow>
			      	<TableHeaderColumn width="5%">序号</TableHeaderColumn>
			        <TableHeaderColumn width="20%">
			        <AutoComplete
			        	hintText={'标题 '}
					      filter={AutoComplete.caseInsensitiveFilter}
					      dataSource={titleSources}
					      ref="titleSources"
					      searchText={this.state.title}
					      textFieldStyle={{width:120,color:'rgb(158, 158, 158)',fontSize:12}}
					      id="titleSources"
					      onNewRequest={this.updateList}
					    />
			        </TableHeaderColumn>
			        <TableHeaderColumn width="15%">留言者</TableHeaderColumn>
			        <TableHeaderColumn width="15%">日期</TableHeaderColumn>
			        <TableHeaderColumn width="30%">留言</TableHeaderColumn>
			        <TableHeaderColumn width="10%">操作</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody displayRowCheckbox={false}>
			      {commentTr}
			    </TableBody>
			  </Table>
			  <ReactPaginate 
			  pageCount={this.state.totalPages} 
			  pageRangeDisplayed={5} 
			  marginPagesDisplayed={2}
			  previousLabel="上一页"
			  nextLabel="下一页"
			  containerClassName="pagination"
			  onPageChange={this.handlePageChange}
			  >
			  </ReactPaginate>
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
export default SpaceCommentList