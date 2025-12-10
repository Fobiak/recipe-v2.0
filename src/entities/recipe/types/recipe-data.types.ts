import type { RecipeCardData } from '@/features/recipe/types/recipe-card'

export interface RecipeItem extends RecipeCardData {
  analyzedInstructions: AnalyzedInstructionsItem[]
  extendedIngredients: ExtendedIngredient[]
  cookingMinutes: number
  preparationMinutes: number
}

interface AnalyzedInstructionsItem {
  name: string
  steps: StepsItem[]
}

interface StepsItem {
  number: number
  step: string
  ingridients: []
  equipment: EquipmentItem[]
}

interface EquipmentItem {
  id: number
  name: string
  localizedName: string
  image: string
}

interface ExtendedIngredient {
  id: number
  aisle: null | string
  image: string
  consistency: Consistency
  name: string
  nameClean: string
  original: string
  originalName: string
  amount: number
  unit: string
  meta: string[]
}

export enum Consistency {
  Liquid = 'LIQUID',
  Solid = 'SOLID',
}

export interface FormFilters {
  page: number
  pageSize: number
  query?: string | null
  cuisine?: string | null
  diet?: string | null
  type?: string | null
  intolerances?: string | null
  includeIngredients?: string | null
  excludeIngredients?: string | null
  sort?: string | null
  sortDirection?: string | null
}
