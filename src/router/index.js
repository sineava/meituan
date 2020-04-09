import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/goods'
    },
    {
        path: '/goods',
        name: 'Goods',
        component: () => import('@/components/goods/Goods')
    },
    {
        path: '/rating',
        name: 'Rating',
        component: () => import('@/components/rating/Rating')
    },
    {
        path: '/seller',
        name: 'Seller',
        component: () => import('@/components/seller/Seller')
    }
]

const router = new VueRouter({
    routes,
    // 选中样式
    linkActiveClass: 'active'
})

export default router
