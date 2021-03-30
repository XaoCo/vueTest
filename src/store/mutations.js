import axios from 'axios'
import { message } from 'ant-design-vue';
export default {
	getLoopImg(state){
		const token = localStorage.getItem('token')
		axios({
			method: "get",
			url: "/api/menu/list",
			headers: {
				Authorization: "Bearer " + token
			},
			timeout:5000
		})
		.then(res => {
			if (res.data.errno === 0) {
				const data = res.data.data.rows;
				state.list = data;
			}else{
				message.error(res.data.message);
			} 
		})
		.catch(()=>{
			message.error("请求超时，请稍后再试");
		})
	},
	changeInfo(state,obj){
		if(obj.name){
			state.name = obj.name
		}
		if(obj.photo){
			state.url = obj.photo
		}

	}
}