import React from 'react';
import Page from '../../partial/page/page';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper';
import marked from 'marked';
import '../article/hightlight.css';



class SpaceArticleEdit extends React.Component{
	constructor(props) {
		super(props);
		this.state={
			preview:''
		}
	}
	handleChange = (e) => {
		let marks = e.target.value;
	}
	render(){
		const category = ["javascript","css","html"]
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
					</div>

					<div className="article-markdown">
						<Paper className="edit-area" zDepth={1}>
							<textarea spellCheck="false"  onChange={this.handleChange}>
							</textarea>
						</Paper>
						<Paper className="preview-area" zDepth={1}  dangerouslySetInnerHTML={{__html:this.state.preview}}>
							
						</Paper>
					</div>
				</div>
			</Page>
		)
	}
}

export default SpaceArticleEdit;