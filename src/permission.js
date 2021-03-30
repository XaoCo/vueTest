/**
 * @author song
 */
import router from '@/router'
import axios from 'axios'

// 获取 路由 请求
function getRouterList () {
  const token = localStorage.getItem('token')
  return axios({
    method: "get",
    url: "/api/menu/list",
    headers: {
      Authorization: "Bearer " + token
    },
    timeout: 5000
  })
  .then(res => {
    if (res.data.errno === 0) {
      return res.data.data.rows
    }
  })
}

async function getRouter() {
	const routerList = await getRouterList()
	const arr = []
	// 加载 路由
	for (let i in routerList) {
		const children = routerList[i].child
		for (let j in children) {
			const obj = {}
			obj.path = children[j].url
			obj.name = children[j].name
			obj.component = () => import(`@/pages${children[j].component}.vue`)
			arr.push(obj)
		}
	}
  router.addRoutes([...arr])
	// const routerLists = [
	//   { 
	//     path:'/homepage',
	//     name:'Home',
	//     component: () => import('@/pages/home/Home.vue'),
	//   },
	// ]
}

// 默认生成新路由
export function updateRouter() {
  const token = localStorage.getItem('token') || ''
  token && getRouter()
}
