import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from "../views/store";
import Product from "../views/product";
import Shop from "../views/shop";
Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name:'Store',
        component: Store
    },
    {
        path: '/product',
        name: 'Product',
        component:Product
    },
    {
        path:'/shop/:id',
        name:'Shop',
        component:Shop
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
