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
		if(res.status == 401){
			hashHistory.push('/space/space_login');
		}else if(res.status == 200){
			cb();
		}
	})
}
export default Auth;