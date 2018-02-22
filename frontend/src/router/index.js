import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import QuestionMaster from '@/components/QuestionMaster'
import Details from '@/components/details/Details'
import Bootstrap from '@/components/Bootstrap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/questions',
      name: 'Service',
      component: QuestionMaster
    },
    {
      path: '/details/:id',
      name: 'Details',
      component: Details
    },
    {
      path: '/bootstrap',
      name: 'Bootstrap',
      component: Bootstrap
    }
  ]
})
