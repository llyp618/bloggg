import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../page/page.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
class Blog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			blogList : [
				// {
				// 		title:'',
				// 		subtitle:'',
				// 		text:'',
				// 		id:''
				// }
			]
		}
	}
	componentDidMount(){
		fetch('/api/bloglist')
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				this.setState({
					blogList : data.blogList
				})
			})
	}
	render(){

		let CardList = [];

		this.state.blogList.map((data,i) => {
			CardList.push(
				<Card className="article-card" key={data.id}>
			    <CardTitle title={data.title} subtitle={data.subtitle} />
			    <CardText>
			      {data.text}
			    </CardText>
			    <CardActions>
			      <Link className="link" to="/article"><FlatButton>查看更多</FlatButton></Link>
			    </CardActions>
			  </Card>
			)
		})

		return (
				<Page>
					{CardList}
				</Page>
			)
	}
}

export default Blog;