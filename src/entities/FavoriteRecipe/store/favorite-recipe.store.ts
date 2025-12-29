import type { RecipeCardData } from '@/features/recipe/types/recipe-card'

const STORAGE_KEY = 'favorite-recipes'

export const useFavoriteStore = defineStore('favorite-store', () => {
  const favoriteRecipes = ref<RecipeCardData[]>(loadFromStorage())

  function loadFromStorage(): RecipeCardData[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    }
    catch {
      return []
    }
  }

  function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteRecipes.value))
  }

  function isFavoriteRecipe(id: number) {
    return favoriteRecipes.value.some(r => r.id === id)
  }

  function addRecipe(recipe: RecipeCardData) {
    if (!isFavoriteRecipe(recipe.id)) {
      favoriteRecipes.value.push(recipe)
    }
  }

  function removeRecipe(id: number) {
    favoriteRecipes.value = favoriteRecipes.value.filter(r => r.id !== id)
  }

  function toggleFavorite(recipe: RecipeCardData) {
    isFavoriteRecipe(recipe.id)
      ? removeRecipe(recipe.id)
      : addRecipe(recipe)
  }

  watch(favoriteRecipes, saveToStorage, { deep: true })

  return {
    favoriteRecipes,
    isFavoriteRecipe,
    addRecipe,
    removeRecipe,
    toggleFavorite,
  }
})
