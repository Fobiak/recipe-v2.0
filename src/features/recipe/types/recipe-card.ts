export interface RecipeCardData {
  id: number
  image: string
  title: string
  readyInMinutes: string
  servings: number | null
  aggregateLikes: number | null
  dishTypes: string[]
  summary: string
}
