import type { FormFilters, RecipeItem } from '../types/recipe-data.types'
import type { RecipeCardData } from '@/features/recipe/types/recipe-card'
import type { RecipeSimilarCardData } from '@/features/recipe/types/recipe-similar-card'
import { recipeService } from '../api/recipe.service'

const DEFAULT_FORM_FILTERS: FormFilters = {
  page: 1,
  pageSize: 18,
  query: null,
  cuisine: null,
  diet: null,
  type: null,
  includeIngredients: null,
  excludeIngredients: null,
  sort: null,
  sortDirection: null,
}

export const useRecipeStore = defineStore('recipe-store', () => {
  const error = ref<unknown | string | null>(null)
  const isLoading = ref(false)
  const formFilters = ref(structuredClone(DEFAULT_FORM_FILTERS))
  const totalResults = ref(0)
  const recipes = ref<RecipeCardData[]>([])
  const recipe = ref<RecipeItem | null>(null)
  const recipeSimilar = ref<RecipeSimilarCardData[]>([])

  async function getRecipes() {
    isLoading.value = true
    error.value = null
    try {
      const { data } = await recipeService.getRecipe(formFilters.value)

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
      const { data } = await recipeService.getRecipeById(id)

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

  async function getRecipeSimilarById(id: number | null) {
    isLoading.value = true
    error.value = null
    try {
      const { data } = await recipeService.getRecipeSimilar(id)

      if (!data)
        throw new Error('Не удалось получить похожие рецепты')

      recipeSimilar.value = data
    }
    catch (e: unknown) {
      error.value = e
    }
    finally {
      isLoading.value = false
    }
  }

  function updateFilters(payload: Partial<FormFilters>) {
    formFilters.value = {
      ...formFilters.value,
      ...payload,
    }
    getRecipes()
  }

  function resetFilters() {
    formFilters.value = structuredClone(DEFAULT_FORM_FILTERS)
    getRecipes()
  }

  function resetData() {
    recipe.value = null
    recipeSimilar.value = []
  }

  return {
    isLoading,
    recipes,
    recipe,
    recipeSimilar,
    getRecipes,
    totalResults,
    formFilters,
    updateFilters,
    resetFilters,
    getRecipeById,
    getRecipeSimilarById,
    resetData,
  }
})
