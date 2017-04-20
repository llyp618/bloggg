import React from 'react';
import Page from '../../partial/page/page.js';
import Loading from '../../partial/loading/loading';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Link,hashHistory} from 'react-router';
import 'whatwg-fetch';
import ReactPaginate from 'react-paginate';
class Blog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loaded:false,
			totalPages:1,
			currentPage:1,
			blogList:[],
			classify:'all' ,
			classifyList:[]
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
	componentWillReceiveProps(nextProps) {  
		if(nextProps.location.action == 'PUSH'){
			this.getBlogList(1,nextProps.params.classify)
		}
	}
	componentDidMount(){
		this.getBlogList(1,this.state.classify);
	}
	getBlogList = (page,classify,cb) => {
		fetch('/api/bloglist',{
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
					currentPage:page,
					classify:classify
				});
				if(typeof cb == 'function'){
					cb()
				}
			})
	}
	handlePageChange = (e) => {
		this.getBlogList(e.selected + 1,this.state.classify,() => {
			window.scrollTo(0,0)
		});
	}
	render(){
		let CardList = [];
		if(!this.state.loaded){
			return (
					<Loading words="加载中" />
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
			      <Link className="link" to={`/visit/blog/article/${data._id}`}><FlatButton primary={true}>查看更多</FlatButton></Link>
			    </CardActions>
			  </Card>
			)
		})

		return (
				<div>
					{CardList}
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
				</div>
			)
	}
}

export default Blog;