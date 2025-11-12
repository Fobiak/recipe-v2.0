import type { RecipeItem } from '../types/recipe-data.types'
import type { RecipeCardData } from '@/features/recipe/types/recipe-card'
import type { PaginatedResponse } from '@/shared/services/types'
import makeRequest from '@/shared/services/api/http'

const { VITE_API_KEY, VITE_API_BASE_URL } = import.meta.env

export const recipeService = {
  async getRecipe(page: number, pageSize: number, searchTerm?: string) {
    const offset = (page - 1) * pageSize
    return await makeRequest<PaginatedResponse<RecipeCardData>>({
      method: 'GET',
      url: `${VITE_API_BASE_URL}/recipes/complexSearch`,
      params: { offset, number: pageSize, apiKey: VITE_API_KEY, addRecipeInformation: true, query: searchTerm },
    })
  },

  async getRecipeId(id: number | null) {
    return await makeRequest<RecipeItem>({
      method: 'GET',
      url: `${VITE_API_BASE_URL}/recipes/${id}/information`,
      params: { apiKey: VITE_API_KEY },
    })
  },
}
