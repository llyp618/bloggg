import React from 'react';
import Page from '../../partial/page/page';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './space.less';

// 登录
class LoginBox extends React.Component{
	render(){
		return (
			<div className="login-box">
				<TextField
		      hintText="账号"
		      floatingLabelText="输入账号" fullWidth={true}
		    /> <br/>
				<TextField
		      hintText="密码"
		      floatingLabelText="输入密码" fullWidth={true} type="password"
		    /> <br/><br/><br/>
		     <RaisedButton label="确 认 登 录" primary={true} fullWidth={true} />
			</div>

		)
	}
}


class Space extends React.Component{

	render(){
		return (
			<Page isRightMenu={false}>
				<div style={{marginLeft:220}}>
					<h3>登 录</h3>
					<LoginBox />
				</div>
			</Page>
		)
	}
}

export default Space;