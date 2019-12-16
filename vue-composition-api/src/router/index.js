import Vue from 'vue'
import VueRouter from 'vue-router'
import OptionsApi from '@/views/OptionsApi.vue'
import CompositionApi from '@/views/CompositionApi.vue'
import ReusableCompositionApi from '@/views/ReusableCompositionApi.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/options-api', component: OptionsApi },
  { path: '/composition-api', component: CompositionApi },
  { path: '/reusable-composition-api', component: ReusableCompositionApi },
  { path: '*', redirect: '/options-api' }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
