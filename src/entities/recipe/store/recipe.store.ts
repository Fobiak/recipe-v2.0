import type { RecipeData } from '../types/recipe-data.types'
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
  const recipes = ref<RecipeData[]>([])

  const recipeData = ref<RecipeData>({
    id: 0,
    image: '',
    title: '',
    readyInMinutes: '',
    servings: null,
    aggregateLikes: null,
    dishTypes: [],
    summary: '',
    analyzedInstructions: [],
  })

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

  function resetData() {
    recipeData.value = {
      id: 0,
      image: '',
      title: '',
      readyInMinutes: '',
      servings: null,
      aggregateLikes: null,
      dishTypes: [],
      summary: '',
      analyzedInstructions: [],
    }
  }

  function resetFilters() {
    formFilters.value = structuredClone(DEFAULT_FORM_FILTERS)
  }

  return {
    isLoading,
    recipes,
    recipeData,
    getRecipes,
    resetData,
    totalResults,
    formFilters,
    resetFilters,
  }
})
