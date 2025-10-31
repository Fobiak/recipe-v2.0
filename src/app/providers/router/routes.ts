import type { RouteRecordRaw } from 'vue-router'
import MainPage from '@/MainPage.vue'
import { MAIN_ROUTE_NAMES } from '@/shared/router/routes'

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: MAIN_ROUTE_NAMES.MAIN,
    component: MainPage,
  },
]

export default routes
