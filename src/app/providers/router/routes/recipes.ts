import type { RouteRecordRaw } from 'vue-router'
import MainPage from '@/MainPage.vue'
import { RECIPES_ROUTE_NAMES } from '@/shared/router/routes'

export const RECIPE_ROUTES: RouteRecordRaw[] = [
  {
    path: '/recipes',
    name: RECIPES_ROUTE_NAMES.MAIN,
    component: MainPage,
    redirect: '/recipes/all-recipes',
    children: [
      {
        path: '/recipes/all-recipes',
        name: RECIPES_ROUTE_NAMES.ALL_RECIPES,
        component: () => import('@/pages/Recipes/ui/RecipesPage.vue'),
      },
      {
        path: '/recipes/favorite',
        name: RECIPES_ROUTE_NAMES.FAVORITE_RECIPES,
        component: () => import('@/pages/FavoriteRecipes/ui/FavoriteRecipesPage.vue'),
      },
      {
        path: '/recipes/recipe-detail/:id',
        name: RECIPES_ROUTE_NAMES.RECIPE_DETAIL,
        component: () => import('@/pages/RecipesDetail/ui/RecipesDetailPage.vue'),
      },
    ],
  },
]
