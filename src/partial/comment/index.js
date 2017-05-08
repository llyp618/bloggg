import React from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import './comment.less';
import 'whatwg-fetch';
class Comment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentList : [],
			commenterV:'',
			contentV:'',
			commenterError:'',
			contentError:''
		}
	}
	componentDidMount() {
		let title = this.props.commentTitle;
		fetch('/api/article/getComments',{
			method:'POST',
			headers:{
				'Content-type':'application/json'
			},
			body:JSON.stringify({
				title:title
			})
		}).then((res) => {
			return res.json()
		}).then((data) => {
			this.setState({
				commentList:data.comments
			})
		})
	}
	handleCommentPost = () => {
		let commenter = this.state.commenterV,
				content = this.state.contentV,
				title = this.props.commentTitle
		fetch('/api/article/createComment',{
			method:'POST',
			headers:{
				'Content-type':'application/json'
			},
			body:JSON.stringify({
				commenter,
				content,
				title
			})
		}).then((res) => {
			return res.json()
		}).then((data) => {
			if(data.status == 'failed'){
				alert('留言失败')
			}else if (data.status == 'succeed'){
				let theCommentList = this.state.commentList;
				theCommentList.push(data.comment)
				this.setState({
					commentList:theCommentList,
					commenterV:'',
					contentV:'',
				})
			}
		})
	}
	commenterChange = (e) => {
		let v = e.target.value;
		if (v.replace(/\s/g,'') == '') {
			this.setState({
				commenterV:v,
				commenterError:'请输入您的大名'
			})
		}else {
			this.setState({
				commenterV:v,
				commenterError:''
			})
		}
	}
	contentChange = (e) => {
		let v = e.target.value;
		if (v.replace(/\s/g,'') == '') {
			this.setState({
				contentV:v,
				contentError:'请输入您的留言'
			})
		}else {
			this.setState({
				contentV:v,
				contentError:''
			})
		}
	}
	render(){
		let comments = [];
		let commentList = this.state.commentList;
		commentList.map((v,i) => {
			comments.push(
				<li key={i} className="commentLi">
  				<p>
  					<span className="commentName"><strong>{i+1}楼 &nbsp;</strong> {v.commenter} :</span>
  					<em className="commentTime">{v.create_time}</em>
  				</p>
  				<p className="commentText">{v.content}</p>
  			</li>
			)
		})
		if(comments.length == 0){
			comments.push(
				<li key={-1} className="commentLi">
  				<p className="commentText">暂无评论。。。</p>
  			</li>
			)
		}
		return (
			<Card className="articleComments">
	  		<CardHeader title={<span>评论留言<span className="iconfont icon-31pinglun"></span></span>} titleStyle={{fontSize:20,fontWeight:800}}></CardHeader>
	  		<ul>
	  			<CSSTransitionGroup
	          transitionName="ali"
	          transitionEnterTimeout={500}
	          transitionLeaveTimeout={200}>
	  				{comments}
	        </CSSTransitionGroup>
	  		</ul>
	  		<hr className="commentHr"/>
	  		<div className="commentField">
	  			<TextField
				      hintText="你的大名"
				      floatingLabelText="你的大名"
				      ref="commenter"
				      value={this.state.commenterV}
				      errorText={this.state.commenterError}
				      onChange={this.commenterChange}
				    />
	  			<TextField
				      hintText="留言"
				      multiLine={true}
				      rows={1}
				      rowsMax={4}
				      fullWidth={true}
				      ref="content"
				      value={this.state.contentV}
				      errorText={this.state.contentError}
				      onChange={this.contentChange}
				    />
			    <RaisedButton
		        label="发布"
		        primary={true}
		        className="postBtn"
		        disabled={!(!!this.state.contentV && !!this.state.commenterV)}
		        onClick={this.handleCommentPost}
		      />
	  		</div>
	  	</Card>
		)
	}
}

export default Comment;