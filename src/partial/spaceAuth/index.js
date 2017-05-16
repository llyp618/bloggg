import {hashHistory} from 'react-router';
import 'whatwg-fetch';
const Auth = (cb) => {
	fetch('/api/space/space_auth',{
		method:'POST',
		headers:{
			'Content-Type':'application/json',
			'access-token':sessionStorage.getItem('access_token')
		}
	}).
	then((res) => {
		return res.json()
	}).
	then((data) => {
		if(data.status == 0){
			hashHistory.push('/space/space_login');
		}else if(data.status == 1){
			cb();
		}
	})

}
export default Auth;