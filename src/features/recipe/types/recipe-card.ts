export interface RecipeCardData {
  id: number
  image: string
  title: string
  readyInMinutes: number
  servings: number | null
  aggregateLikes: number | null
  dishTypes: string[]
  summary: string
  vegetarian: boolean
  vegan: boolean
  glutenFree: boolean
  dairyFree: boolean
  veryHealthy: boolean
  cheap: boolean
  veryPopular: boolean
  sustainable: boolean
  lowFodmap: boolean
  healthScore: number
  pricePerServing: number
  weightWatcherSmartPoints: number
}
