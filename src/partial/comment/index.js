import React from 'react';
import TextField from 'material-ui/TextField';
import {Card, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './comment.less';
import 'whatwg-fetch';
class Comment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			commentList : [],

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
		let commenter = this.refs.commenter.getValue(),
				content = this.refs.content.getValue(),
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

			}else if (data.status == 'succeed'){
				let theCommentList = this.state.commentList;
				theCommentList.push(data.comment)
				this.setState({
					commentList:theCommentList
				})
			}
		})
	}
	render(){
		let comments = [];
		let commentList = this.state.commentList;
		commentList.map((v,i) => {
			comments.push(
				<li key={i}>
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
				<li key={-1}>
  				<p className="commentText">暂无评论。。。</p>
  			</li>
			)
		}
		return (
			<Card className="articleComments">
	  		<CardHeader title="评论留言" titleStyle={{fontSize:20,fontWeight:800}}></CardHeader>
	  		<ul>
	  			{comments}
	  		</ul>
	  		<hr className="commentHr"/>
	  		<div className="commentField">
	  			<TextField
				      hintText="你的大名"
				      floatingLabelText="你的大名"
				      ref="commenter"
				      inputStyle={{}}
				    />
	  			<TextField
				      hintText="留言"
				      multiLine={true}
				      rows={1}
				      rowsMax={4}
				      fullWidth={true}
				      ref="content"
				      textareaStyle={{}}
				    />
			    <RaisedButton
		        label="发布"
		        primary={true}
		        className="postBtn"
		        onClick={this.handleCommentPost}
		      />
	  		</div>
	  	</Card>
		)
	}
}

export default Comment;