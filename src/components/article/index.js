import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../../partial/page/page.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
import Loading from '../../partial/loading/loading';
import './hightlight.css';
class Article extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			articleContent:{
				//title:'',
				//subtitle:'',
				//text:'',
				//id
			},
			loaded:false
		};
		this.style = {
			cardText : {
				fontSize:16,
				lineHeight:1.4
			}
		}
	}
	componentDidMount() {
		let articleId = this.props.params.id,
				articleType = this.props.params.type
		fetch('/api/article',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				id:articleId,
				type:articleType
			})
		})
		.then((res) => {
			return res.json()
		})
		.then((data) => {
			this.setState({
				articleContent : data.article,
				loaded:true
			})
		})
	}
	render(){
		if(!this.state.loaded){
			return (
				<Page>
					<Loading words="加载中" />
				</Page>
			)
		}
		return (
				<Page>
					<Card className="article-card" >
				    <CardText style={this.style.cardText} dangerouslySetInnerHTML={{__html:this.state.articleContent}}>
				    </CardText>
				    <CardActions>
				      <Link className="link" to={`/${this.props.params.type}`}><FlatButton label="返回列表" primary={true}></FlatButton></Link>
				    </CardActions>
				  </Card>
				</Page>
		)
	}
}

export default Article;