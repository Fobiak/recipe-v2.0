import type { RouteRecordRaw } from 'vue-router'
import MainPage from '@/MainPage.vue'
import { MAIN_ROUTE_NAMES } from '@/shared/router/routes'
import { RECIPE_ROUTES } from './routes/recipes'

const additionalRoutes: RouteRecordRaw[] = [
  ...RECIPE_ROUTES,
]

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: MAIN_ROUTE_NAMES.MAIN,
    component: MainPage,
  },
  ...additionalRoutes,
]

export default routes
