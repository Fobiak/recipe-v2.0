import type { FormFilters, RecipeItem } from '../types/recipe-data.types'
import type { RecipeCardData } from '@/features/recipe/types/recipe-card'
import type { RecipeSimilarCardData } from '@/features/recipe/types/recipe-similar-card'
import type { PaginatedResponse } from '@/shared/services/types'
import makeRequest from '@/shared/services/api/http'

const { VITE_API_KEY, VITE_API_BASE_URL } = import.meta.env

export const recipeService = {
  async getRecipe(filters: FormFilters) {
    const { page, pageSize } = filters

    const offset = (page - 1) * pageSize

    return await makeRequest<PaginatedResponse<RecipeCardData>>({
      method: 'GET',
      url: `${VITE_API_BASE_URL}/recipes/complexSearch`,
      params: {
        offset,
        number: pageSize,
        apiKey: VITE_API_KEY,
        addRecipeInformation: true,
        ...filters,
      },
    })
  },

  async getRecipeById(id: number | null) {
    return await makeRequest<RecipeItem>({
      method: 'GET',
      url: `${VITE_API_BASE_URL}/recipes/${id}/information`,
      params: { apiKey: VITE_API_KEY },
    })
  },

  async getRecipeSimilar(id: number | null) {
    return await makeRequest<RecipeSimilarCardData[]>({
      method: 'GET',
      url: `${VITE_API_BASE_URL}/recipes/${id}/similar`,
      params: { apiKey: VITE_API_KEY, number: 10 },
    })
  },
}
