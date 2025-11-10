import type { RouteRecordRaw } from 'vue-router'
import { MAIN_ROUTE_NAMES } from '@/shared/router/routes'
import { RECIPE_ROUTES } from './routes/recipes'

const additionalRoutes: RouteRecordRaw[] = [
  ...RECIPE_ROUTES,
]

const routes: readonly RouteRecordRaw[] = [
  {
    path: '/',
    name: MAIN_ROUTE_NAMES.MAIN,
    redirect: '/recipes/all-recipes',
  },
  ...additionalRoutes,
]

export default routes
