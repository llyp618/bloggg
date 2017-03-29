import React from 'react';
import {hashHistory} from 'react-router';
import Page from '../../partial/page/page';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import './space.less';
import 'whatwg-fetch';
// 登录
class LoginBox extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			accountError:'',
			passwordError:'',
			resError:true,
			resMsg:''
		}
	}
	verify(account,password){
		if(account == '' ){
			this.setState({
				accountError:'请输入账号'
			})
			return false;
		}
		if(password == '') {
			this.setState({
				passwordError:'请输入密码'
			})
			return false;
		}
		return true
	}
	doLogin(){
		let sAccount = this.refs.account.getValue().replace(/\s/,'');
		let sPassword = this.refs.password.getValue().replace(/\s/,'');
		if(!this.verify(sAccount,sPassword)) return false;
		fetch('/api/space/space_login',{
			method:'POST',
			headers:{
				'Content-Type':'application/json'
			},
			body:JSON.stringify({
				account:sAccount,
				password:sPassword
			})
		}).then((res) => {
			if(res.status == 200){
				const token = res.headers.get('access-token');
				console.log(token)
				sessionStorage.setItem('access_token',token);
			}
			return res.json()
		})
		.then((data) => {
			if(data.status == 0){
				this.setState({
					resError:true,
					resMsg:data.msg
				})
			}else if (data.status == 1){
				hashHistory.push('/space');

			}
		})
	}
	render(){
		return (
			<div className="login-box">
				<TextField
		      hintText="账号"
		      floatingLabelText="输入账号" fullWidth={true}
		      name="account"
		      ref="account"
		      errorText={this.state.accountError}
		    /> <br/>
				<TextField
		      hintText="密码"
		      floatingLabelText="输入密码" fullWidth={true} type="password"
		      name="password"
		      ref="password"
		      errorText={this.state.passwordError}
		    /> <br/><br/><br/>
		    <RaisedButton label="确 认 登 录" onClick={() => this.doLogin()} primary={true} fullWidth={true} />
				<p className={`error-text ${this.state.resError? 'active' : ''}`}>
					{this.state.resMsg}
				</p>
			</div>
		)
	}
}


class SpaceLogin extends React.Component{

	render(){
		return (
			<Page isLeftMenu={true} isRightMenu={false}>
				<div style={{marginLeft:220}}>
					<h3>登 录</h3>
					<LoginBox />
				</div>
			</Page>
		)
	}
}

export default SpaceLogin;