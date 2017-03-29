import React from 'react';
import Page from '../../partial/page/page';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import marked from 'marked';
import highlightJs from 'highlight.js';
import '../article/hightlight.css';
import Auth from '../../partial/spaceAuth';
import Loading from '../../partial/loading/loading';
marked.setOptions({
	renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return highlightJs.highlightAuto(code).value
  }
});



class Editor extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			preview:'',
		}
	}
	handleChange = (e) => {
		let marks = e.target.value;
		let preview = marked(marks);
		this.setState({
			preview:preview
		});
	}
	render(){
		return (
			<div className="article-markdown">
				<Paper className="edit-area" zDepth={1}>
					<textarea spellCheck={false} onChange={this.handleChange} placeholder="markdown 编辑区"></textarea>
				</Paper>
				<Paper className="preview-area" zDepth={1}  dangerouslySetInnerHTML={{__html:this.state.preview}}>
					
				</Paper>
			</div>
		)
	}
}

class SpaceArticleEdit extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			loaded:false,
			preview:''
		}
	}
	componentDidMount() {
		Auth(() => {
			this.setState({
				loaded:true
			})
		});
	}
	render(){
		const category = ["javascript","css","html"]
		if(!this.state.loaded){
			return (
				<Page isLeftMenu={true} isRightMenu={false}>
					<div className="space-edit-container">
						<Loading words="加载中"/>
					</div>
				</Page>
			)
		}
		return (
			<Page isLeftMenu={true} isRightMenu={false}>
				<div className="space-edit-container">
					<div className="article-set">
						<TextField
				      hintText="文章标题"
				      floatingLabelText="文章标题"
				    />
				    &nbsp;&nbsp;&nbsp;&nbsp;
				    <AutoComplete
				      floatingLabelText="文章分类"
				      filter={AutoComplete.caseInsensitiveFilter}
				      dataSource={category}
				    />
						<RaisedButton label="发 布" secondary={true} className="post-btn" />
					</div>
					<Editor />
				</div>
			</Page>
		)
	}
}

export default SpaceArticleEdit;