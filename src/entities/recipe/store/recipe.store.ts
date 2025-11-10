import type { RecipeData } from '../types/recipe-data.types'
import { recipeService } from '../api/recipe.service'

export const useRecipeStore = defineStore('recipe-store', () => {
  const error = ref<unknown | string | null>(null)
  const isLoading = ref(false)
  const page = ref(1)
  const pageSize = ref(10)
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
      const { data } = await recipeService.getRecipe(page.value, pageSize.value)

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

  return {
    isLoading,
    recipes,
    recipeData,
    getRecipes,
    resetData,
    totalResults,
    page,
    pageSize,
  }
})
