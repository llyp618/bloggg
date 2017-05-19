import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Auth from '../../partial/spaceAuth';
import {Link} from 'react-router';
import Loading from '../../partial/loading/loading';
import ReactPaginate from 'react-paginate';
class SpaceBlogList extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			loaded:false,
			dialog:false,
			dialog_words:'确定删除该文章吗？',
			blogList:[],
			totalPages:1,
			currentPage:1,
			classifyList:[],
			classify:'all',
		};
		this.delete_id = '';
	}
	componentDidMount() {
		Auth(()=> {
			this.getBlogList(1,'all');
			// 分类列表
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
				let classifyList=[];
				data.classifyList.map((v,i) => {
					classifyList.push(v.classify)
				})
				this.setState({
					classifyList:classifyList
				})
			})
		});
	}
	getBlogList = (page,classify,cb) => {
		fetch('/api/space/bloglist',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				currentPage:page,
				classify:classify
			})
		})
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				this.setState({
					loaded:true,
					blogList:data.blogs,
					totalPages:data.totalPages,
					currentPage:page
				});
				if(typeof cb == 'function'){
					cb()
				}
			})
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
				_id:this.delete_id,
				currentPage:this.state.currentPage
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
				this.getBlogList(this.state.currentPage,this.state.classify,() => {
					this.setState({
						dialog:false,
					})
				});
			}
		})
	}
	handlePageChange = (e) => {
		this.getBlogList(e.selected + 1,this.state.classify,() => {
			window.scrollTo(0,0)
		});
	}
	handleClassifyChange = (e,i,v) => {
		this.getBlogList(this.state.currentPage,v,() => {
			this.setState({
				classify:v
			})
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
		let TableRows = [];
		this.state.blogList.map((data,i) => {
			TableRows.push(
				<TableRow selectable={false} key={i}>
	        <TableRowColumn>{data._id}</TableRowColumn>
	        <TableRowColumn>{data.classify}</TableRowColumn>
	        <TableRowColumn>{data.title}</TableRowColumn>
	        <TableRowColumn>{data.create_time}</TableRowColumn>
	        <TableRowColumn>{data.pv}</TableRowColumn>
	        <TableRowColumn>
	        	<Link to={`/space/space_article_edit/${data._id}`}>
	        		<RaisedButton label="修 改" primary={true} />
	        	</Link>
	        	&nbsp;&nbsp;&nbsp;&nbsp;
	        	<RaisedButton label="删 除" onClick={() => {this.handleDelete(data._id)}}/>
	        </TableRowColumn>
	      </TableRow>
			)
		});
		let classifyList = [];
		this.state.classifyList.map((data,i) => {
			classifyList.push(
					<MenuItem key={i} value={data} primaryText={data} />
				)
		});
		return (
			<div className="contents-table">
				 <Table>
			    <TableHeader displaySelectAll={false} adjustForCheckbox={false} selectable={false} multiSelectable={false}>
			      <TableRow>
			        <TableHeaderColumn>ID</TableHeaderColumn>
			        <TableHeaderColumn>
			        	<DropDownMenu 
				        	value={this.state.classify} 
				        	underlineStyle={{borderTop:'none'}}
				        	style={{verticalAlign:'middle'}}
				        	labelStyle={{paddingLeft:0,color:'rgb(158, 158, 158)'}}
				        	onChange={this.handleClassifyChange}>
				        	<MenuItem value='all' primaryText='所有' />
				          {classifyList}
				        </DropDownMenu>
			        </TableHeaderColumn>
			        <TableHeaderColumn>标题</TableHeaderColumn>
			        <TableHeaderColumn>日期</TableHeaderColumn>
			        <TableHeaderColumn>pv</TableHeaderColumn>
			        <TableHeaderColumn>操作</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
			    <TableBody displayRowCheckbox={false}>
			      {TableRows}
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
export default SpaceBlogList