import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

const DemandList = () => import('./views/demand/List.vue')
const FaultList = () => import('./views/fault/List.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/demand',
      name: 'demand',
      component: DemandList
    },
    {
      path: '/fault',
      name: 'fault',
      component: FaultList
    }
  ]
})
