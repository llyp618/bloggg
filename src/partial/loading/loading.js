import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

class Loading extends React.Component {
	constructor(props){
		super(props);
		this.style = {
			div:{
				width:400,
				margin:'0 auto',
				marginTop:100,
				padding:20,
				verticlAlign:'top',
				fontSize:18,
				textAlign:'center'
			},
			p:{
				marginTop:20,
				marginBottom:0,
				color:'#2F2F2E'
			}
		}
	}
	static propTypes = {
		words:React.PropTypes.string
	};
	render(){
		return (
				<div style={this.style.div}>
					<CircularProgress style={this.style.circular} size={80} thickness={8}/>	
					<p style={this.style.p}>{this.props.words}</p>
				</div>
		)
		
	}
}

export default Loading;