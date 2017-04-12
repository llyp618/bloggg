import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../../partial/page/page.js';
import Loading from '../../partial/loading/loading';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import 'whatwg-fetch';
class Blog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loaded:false
		}
		this.style = {
			blog_time:{
				fontSize:14,
				color:'#FF6C37',
				position:'absolute',
				top:20,
				right:16
			}
		}
	}
	componentDidMount(){
		fetch('/api/bloglist')
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				this.setState({
					loaded:true,
					blogList : data.blogs
				})
			})
	}
	render(){

		let CardList = [];
		if(!this.state.loaded){
			return (
				<Page isLeftMenu={true} isRightMenu={true}>
					<Loading words="加载中" />
				</Page>
			)
		}
		this.state.blogList.map((data,i) => {
			CardList.push(
				<Card className="article-card" key={i}>
			    <CardTitle title={data.title} subtitle={data.classify}>
			    	<span style={this.style.blog_time}>{data.create_time}</span>
			    </CardTitle>
			    <CardText>
			      {data.info}
			    </CardText>
			    <CardActions style={{textAlign:'right'}}>
			      <Link className="link" to={`/blog/article/${data._id}`}><FlatButton primary={true}>查看更多</FlatButton></Link>
			    </CardActions>
			  </Card>
			)
		})

		return (
				<Page isLeftMenu={true} isRightMenu={true}>
					{CardList}
				</Page>
			)
	}
}

export default Blog;