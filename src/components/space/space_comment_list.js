import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import Auth from '../../partial/spaceAuth';
import ReactPaginate from 'react-paginate';
import Loading from '../../partial/loading/loading';
class SpaceCommentList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			loaded:false,
			title:'all',
			currentPage:1,
			commentList:[]
		}
	}
	componentDidMount() {
		let title = this.state.title;
		Auth(() => {
			this.getCommentList(title,1,() => {
				this.setState({
					loaded:true
				})
			})
		});
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
				commentList:data.comments

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
	render(){
		if(!this.state.loaded){
			return (
					<div className="contents-table">
						<Loading words=""/>
					</div>
			)
		}
		let commentTr = [];
		this.state.commentList.map((v,i) => {
			let content = v.comment.content.substring(0,20)+'...'
			commentTr.push(
				<TableRow selectable={false} key={i}>
	        <TableRowColumn width="15%">{v.title}</TableRowColumn>
	        <TableRowColumn width="15%">{v.comment.commenter}</TableRowColumn>
	        <TableRowColumn width="15%">{v.comment.create_time}</TableRowColumn>
	        <TableRowColumn width="35%">{content}</TableRowColumn>
	        <TableRowColumn>
	        	<RaisedButton label="删 除" />
	        </TableRowColumn>
	      </TableRow>
			)
		})
		return (
			<div className="contents-table">
				<Table>
			    <TableHeader displaySelectAll={false} adjustForCheckbox={false} selectable={false} multiSelectable={false}>
			      <TableRow>
			        <TableHeaderColumn width="15%">标题</TableHeaderColumn>
			        <TableHeaderColumn width="15%">留言者</TableHeaderColumn>
			        <TableHeaderColumn width="15%">日期</TableHeaderColumn>
			        <TableHeaderColumn width="35%">留言</TableHeaderColumn>
			        <TableHeaderColumn>操作</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody displayRowCheckbox={false}>
			      {commentTr}
			    </TableBody>
			  </Table>
			  <ReactPaginate 
			  pageCount={10} 
			  pageRangeDisplayed={5} 
			  marginPagesDisplayed={2}
			  previousLabel="上一页"
			  nextLabel="下一页"
			  containerClassName="pagination"
			  onPageChange={this.handlePageChange}
			  >
			  </ReactPaginate>
			</div>
		)
	}
}
export default SpaceCommentList