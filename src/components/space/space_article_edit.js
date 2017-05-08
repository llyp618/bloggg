import React from 'react';
import Page from '../../partial/page/page';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import marked from 'marked';
import highlightJs from 'highlight.js';
import '../article/hightlight.css';
import Auth from '../../partial/spaceAuth';
import Loading from '../../partial/loading/loading';
import {hashHistory} from 'react-router';
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
			md:this.props.value || '',
			preview:marked(this.props.value || ''),
		}
	}
	// static propTypes = {
	// 	value:PropTypes.string,
	// };
	handleChange = (e) => {
		let marks = e.target.value;
		let preview = marked(marks);
		this.setState({
			md:marks,
			preview:preview
		});
	}
	render(){
		return (
			<div className="article-markdown">
				<Paper className="edit-area" zDepth={1}>
					<textarea spellCheck={false} onChange={this.handleChange} placeholder="markdown 编辑区" value={this.state.md}></textarea>
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
			preview:'',
			dialog:false,
			dialog_words:'',
			blog_info:{
				title:'',
				classify:'',
				content:'',
				_id:'',
				info:'',
				oldClassify:''
			},
			classify:[]
		}
		this.style={
			textfield:{
				color:'#78828F'
			}
		}
	}
	componentDidMount() {
		Auth(() => {
			if(this.props.params.blog_id){
				fetch('/api/space/blog_getOne',{
					method:'POST',
					headers:{
						'Content-Type':'application/json'
					},
					body:JSON.stringify({
						_id:this.props.params.blog_id
					})
				})
				.then((res) => {
					return res.json()
				})
				.then((data) => {
					this.setState({
						loaded:true,
						blog_info:{
							title:data.blog.title,
							classify:data.blog.classify,
							content:data.blog.content,
							info:data.blog.info,
							_id:this.props.params.blog_id,
							oldClassify:data.blog.classify
						}
					})
				})
			}else {
				this.setState({
					loaded:true
				})
			};
			fetch('/api/space/blog_classify_list')
			.then((res) => {
				return res.json()
			})
			.then((data) => {
				let classifyList=[];
				data.classifyList.map((v,i) => {
					classifyList.push(v.classify)
				})
				this.setState({
					classify:classifyList
				})
			})
		});
	}
	handleSubmit = () => {
		//这里的处理方式有问题，。
		let title = this.refs.title.getValue().replace(/(^\s*)|(\s*$)/g, ""),
				info = this.refs.info.getValue(),
				classify = this.refs.classify.state.searchText.replace(/(^\s*)|(\s*$)/g, ""),
				content = this.refs.content.state.md;//这种获取子组件值的方法是否可取？ 另外一种方法是在子组件事件回调给props执行自定义事件给父组件设置state，应该用哪个？？
		if(title == '' || classify == '' || info == '' || content.length < 1){
			this.setState({
				dialog:true,
				dialog_words:'输入信息不完整，请确保文章标题，分类，简介不为空,文章内容不少于100字！'
			});
			return false;
		}
		fetch('/api/space/blog_create_modify',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				title:title,
				classify:classify,
				content:content,
				info:info,
				_id:this.state.blog_info._id,
				oldClassify:this.state.blog_info.oldClassify
			})
		}).then((res) =>{
			return res.json();
		}).then((data) => {
			if(data.status == 0){
				this.setState({
					dialog:true,
					dialog_words:'保存失败！请检查服务！'
				});
			}else {
				hashHistory.push('/space/space_blog_list');
			}
		})
	}
	handleDialogClose = () => {
		this.setState({
			dialog:false
		})
	}
	
	render(){
		const category = this.state.classify
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
				      ref="title"
				      defaultValue={this.state.blog_info.title}
				      inputStyle={this.style.textfield}
				    />
				    &nbsp;&nbsp;&nbsp;&nbsp;
				    <AutoComplete
				      floatingLabelText="文章分类"
				      filter={AutoComplete.caseInsensitiveFilter}
				      dataSource={category}
				      ref="classify"
				      searchText={this.state.blog_info.classify}
				      inputStyle={this.style.textfield}
				      openOnFocus={true}
				    />
						<RaisedButton label="发 布" secondary={true} className="post-btn" onClick={this.handleSubmit} />
					</div>
					<div className="article-info">
						<TextField
				      hintText="文章简介"
				      multiLine={true}
				      rows={1}
				      rowsMax={4}
				      fullWidth={true}
				      ref="info"
				      defaultValue={this.state.blog_info.info}
				      textareaStyle={this.style.textfield}
				    />
					</div>
					<Editor value={this.state.blog_info.content} ref="content" />
				</div>

				<Dialog
          actions={
          	<FlatButton
			        label="确定"
			        primary={true}
			        onTouchTap={this.handleDialogClose}
			      />
			    }
          modal={true}
          open={this.state.dialog}
        >
         	{this.state.dialog_words}
        </Dialog>
			</Page>
		)
	}
}

export default SpaceArticleEdit;