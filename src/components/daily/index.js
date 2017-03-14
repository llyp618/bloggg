import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../../partial/page/page.js';
import Loading from '../../partial/loading/loading';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
class Blog extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			loaded:false,
			dailyList : [
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
		fetch('/api/dailylist')
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				this.setState({
					loaded:true,
					dailyList : data.dailyList
				})
			})
	}
	render(){

		let CardList = [];
		if(!this.state.loaded){
			return (
				<Page>
					<Loading words="加载中" />
				</Page>
			)
		}
		this.state.dailyList.map((data,i) => {
			CardList.push(
				<Card className="article-card" key={data.id}>
			    <CardTitle title={data.title} subtitle={data.subtitle} />
			    <CardText>
			      {data.text}
			    </CardText>
			    <CardActions>
			      <Link className="link" to={`/daily/article/${data.id}`}><FlatButton>查看更多</FlatButton></Link>
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