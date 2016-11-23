import React from 'react';
import ReactDOM from 'react-dom';
import './normalize.css';
import './common.css';
import LeftMenu from './components/leftMenu/index.js';
class App extends React.Component {  //组件名首字母一定要大写
	render(){
		return (
				<LeftMenu />
		)
	}
}
ReactDOM.render(<App />,document.getElementById('app'));