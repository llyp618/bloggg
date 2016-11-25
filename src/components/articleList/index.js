import React from 'react';
import './index.less';
import {Link} from 'react-router';
class ArticleList extends React.Component {
	render(){
		return (
			<div className="article-list">
				<div className="article-info">
					<p>
						弱者普遍易怒如虎，而且容易暴怒。强者通常平静如水，并且相对平和。一个内心不强大的人，自然内心不够平静。内心不平静的人，处处是风浪。再小的事，都会被无限放大。一个内心不强大的人，心中永远缺乏安全感...
					</p>
					<div className="article-btn">
						<a href="javascript:;">推荐</a> &nbsp;&nbsp;
						<Link to='/1/:1' >查看更多~</Link>
					</div>
				</div>
				<div className="article-info">
					<p>
						弱者普遍易怒如虎，而且容易暴怒。强者通常平静如水，并且相对平和。一个内心不强大的人，自然内心不够平静。内心不平静的人，处处是风浪。再小的事，都会被无限放大。一个内心不强大的人，心中永远缺乏安全感...
					</p>
					<div className="article-btn">
						<a href="javascript:;">推荐</a> &nbsp;&nbsp;
						<Link to='/1/:1' >查看更多~</Link>
					</div>
				</div>

				<div className="article-info">
					<p>
						弱者普遍易怒如虎，而且容易暴怒。强者通常平静如水，并且相对平和。一个内心不强大的人，自然内心不够平静。内心不平静的人，处处是风浪。再小的事，都会被无限放大。一个内心不强大的人，心中永远缺乏安全感...
					</p>
					<div className="article-btn">
						<a href="javascript:;">推荐</a> &nbsp;&nbsp;
						<Link to='/1/:1' >查看更多~</Link>
					</div>
				</div>

				<div className="article-info">
					<p>
						弱者普遍易怒如虎，而且容易暴怒。强者通常平静如水，并且相对平和。一个内心不强大的人，自然内心不够平静。内心不平静的人，处处是风浪。再小的事，都会被无限放大。一个内心不强大的人，心中永远缺乏安全感...
					</p>
					<div className="article-btn">
						<a href="javascript:;">推荐</a> &nbsp;&nbsp;
						<Link to='/1/:1' >查看更多~</Link>
					</div>
				</div>
				
				<div className="article-info">
					<p>
						弱者普遍易怒如虎，而且容易暴怒。强者通常平静如水，并且相对平和。一个内心不强大的人，自然内心不够平静。内心不平静的人，处处是风浪。再小的事，都会被无限放大。一个内心不强大的人，心中永远缺乏安全感...
					</p>
					<div className="article-btn">
						<a href="javascript:;">推荐</a> &nbsp;&nbsp;
						<Link to='/1/:1' >查看更多~</Link>
					</div>
				</div>
			</div>

		)
	}
}
export default ArticleList;