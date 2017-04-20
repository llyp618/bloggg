import React from 'react';
import Page from '../../partial/page/page.js';
import Loading from '../../partial/loading/loading';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
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
			classify:'Daily'
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
		this.getBlogList(1,'Daily');
	}
	getBlogList = (page,classify,cb) => {
		fetch('/api/dailylist',{
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
	handlePageChange = (e) => {
		this.getBlogList(e.selected + 1,this.state.classify,() => {
			window.scrollTo(0,0)
		});
	}
	render(){
		let CardList = [];
		if(!this.state.loaded){
			return (
				<div>
					<Loading words="加载中" />
				</div>
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
			      <Link className="link" to={`/visit/daily/article/${data._id}`}><FlatButton primary={true}>查看更多</FlatButton></Link>
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