import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Position from '../views/position'


Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect: '/home'
  },
  {
    path:'/home',
    name: 'home',
    component:Home
  },
  {
    path:'/position',
    name: 'position',
    component:Position
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
