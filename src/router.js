import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

const DemandList = () => import('./views/demand/List.vue')
const SummaryList = () => import('./views/summary/List.vue')
const AnalyzeList = () => import('./views/analyze/List.vue')
const FaultList = () => import('./views/fault/List.vue')
const ScheduleCal = () => import('./views/schedule/Detail.vue')
const Tools = () => import('./views/tools/Detail')

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
      path: '/summary',
      name: 'summary',
      component: SummaryList
    },
    {
      path: '/analyze',
      name: 'analyze',
      component: AnalyzeList
    },
    {
      path: '/fault',
      name: 'fault',
      component: FaultList
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: ScheduleCal
    },
    {
      path: '/tools',
      name: 'tools',
      component: Tools
    },
  ]
})
