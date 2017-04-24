import React from 'react';
import TextField from 'material-ui/TextField';

class Captcha extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			expression:'输入答案',
			result:0,
		}
	}
	componentDidMount() {
		this.createExpression();
	}
	createExpression = () => {
		let a = Math.round(Math.random() * 100),
			  b = Math.round(Math.random() * 100),
			  n = Math.round(Math.random());	  
		this.setState({
			expression:`输入答案: ${a}+${b}`,
			result:a + b
		})
	}
	checkInput = (e) => {
		var res = e.target.value;
		var isValid = parseInt(res) == this.state.result;
		this.props.captchaRe(isValid)
	}
	render() {

		return (
			<div>
				<TextField
		      hintText="验证码"
		      floatingLabelText={this.state.expression} fullWidth={true}
		      name="input"
		      ref="input"
		      onChange={this.checkInput}
		    />
			</div>
		)
	}
}


export default Captcha;