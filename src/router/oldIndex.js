/**
 * 原来的 router 直接引入 前段自己控制的。
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/pages/login/Login.vue'
import Home from '@/pages/home/Home.vue'
import productlist from '@/pages/productlist/index.vue'
import professional from '@/pages/research/professional/index.vue'
import userInfo from '@/pages/customercenter/userInfo/index.vue'
import userPassword from '@/pages/customercenter/userPassword/index.vue'
import reported from '@/pages/research/reported/index.vue'
import dictionary from '@/pages/configuration/index.vue'
import Error from '@/pages/error/Error.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        { 
            path:'/',
            name:'Login',
            component:Login
        },
        { 
            path:'/homepage',
            name:'Home',
            component:Home
        },
        { 
            path:'/productlist',
            name:'productlist',
            component:productlist
        },
        { 
            path:'/research/professional',
            name:'professional',
            component:professional
        },
        { 
            path:'/research/reported',
            name:'reported',
            component:reported
        },
        { 
            path:'/configuration/dictionary',
            name:'dictionary',
            component:dictionary
        },
        { 
            path:'/user/info',
            name:'userInfo',
            component:userInfo
        },
        { 
            path:'/user/password',
            name:'userPassword',
            component:userPassword
        },
        { 
            path:'/error',
            name:'Error',
            component:Error
        }
    ]
})