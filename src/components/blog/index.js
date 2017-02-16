import React from 'react';
import ReactDOM from 'react-dom';
import Page from '../page/page.js';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router';
class Blog extends React.Component {

	render(){
		return (
				<Page>
					<Card className="article-card">
				    <CardTitle title="Card title" subtitle="Card subtitle" />
				    <CardText>
				      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
				      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
				      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
				    </CardText>
				    <CardActions>
				      <Link className="link" to="/article"><FlatButton>查看更多</FlatButton></Link>
				    </CardActions>
				  </Card>
				  <Card className="article-card">
				    <CardTitle title="Card title" subtitle="Card subtitle" />
				    <CardText>
				      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
				      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
				      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
				    </CardText>
				    <CardActions>
				      <Link className="link" to="/article"><FlatButton>查看更多</FlatButton></Link>
				    </CardActions>
				  </Card>
				  <Card className="article-card">
				    <CardTitle title="Card title" subtitle="Card subtitle" />
				    <CardText>
				      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
				      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
				      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
				    </CardText>
				    <CardActions>
				      <Link className="link" to="/article"><FlatButton>查看更多</FlatButton></Link>
				    </CardActions>
				  </Card>
				</Page>
			)
	}
}

export default Blog;