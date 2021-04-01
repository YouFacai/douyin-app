import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/index.vue'),
	children:[{
		path:'tv',
		component:()=>import('@/views/topbarlist/tv'),
	},
	{
		path:'city',
		component:()=>import('@/views/topbarlist/city'),
	},
	{
		path:'attention',
		component:()=>import('@/views/topbarlist/attention'),
	},{
		path:'recommend',
		component:()=>import('@/views/topbarlist/recommend')
	},{
		path:'search',
		component:()=>import('@/views/topbarlist/search'),
	}
	],
	redirect: '/recommend'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
