import type { RecipeItem } from '../types/recipe-data.types'
import type { RecipeCardData } from '@/features/recipe/types/recipe-card'
import { recipeService } from '../api/recipe.service'

interface FormFilters {
  page: number
  pageSize: number
  search?: string
}

const DEFAULT_FORM_FILTERS: FormFilters = {
  page: 1,
  pageSize: 10,
  search: '',
}

export const useRecipeStore = defineStore('recipe-store', () => {
  const error = ref<unknown | string | null>(null)
  const isLoading = ref(false)
  const formFilters = ref(structuredClone(DEFAULT_FORM_FILTERS))
  const totalResults = ref(0)
  const recipes = ref<RecipeCardData[]>([])
  const recipe = ref<RecipeItem>()

  async function getRecipes() {
    isLoading.value = true
    error.value = null
    try {
      const { data } = await recipeService.getRecipe(formFilters.value.page, formFilters.value.pageSize, formFilters.value.search)

      if (!data)
        throw new Error('Не удалось получить рецепты')

      recipes.value = data.results
      totalResults.value = data.totalResults
    }
    catch (e: unknown) {
      error.value = e
    }
    finally {
      isLoading.value = false
    }
  }

  async function getRecipeById(id: number | null) {
    isLoading.value = true
    error.value = null
    try {
      const { data } = await recipeService.getRecipeId(id)

      if (!data)
        throw new Error('Не удалось получить детальную информацию о рецепте')

      recipe.value = data
    }
    catch (e: unknown) {
      error.value = e
    }
    finally {
      isLoading.value = false
    }
  }

  function resetFilters() {
    formFilters.value = structuredClone(DEFAULT_FORM_FILTERS)
  }

  return {
    isLoading,
    recipes,
    recipe,
    getRecipes,
    totalResults,
    formFilters,
    resetFilters,
    getRecipeById,
  }
})
