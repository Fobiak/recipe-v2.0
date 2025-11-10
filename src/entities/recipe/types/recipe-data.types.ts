import type { RecipeCardData } from '@/features/recipe/types/recipe-card'

export interface RecipeData extends RecipeCardData {
  analyzedInstructions: []
}
