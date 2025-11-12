export interface RecipeFlags {
  vegetarian: boolean
  vegan: boolean
  glutenFree: boolean
  dairyFree: boolean
  veryHealthy: boolean
  cheap: boolean
  veryPopular: boolean
  sustainable: boolean
  lowFodmap: boolean
}

export const TAGS: { key: keyof RecipeFlags, label: string }[] = [
  { key: 'vegetarian', label: 'Вегетарианское' },
  { key: 'vegan', label: 'Веганское' },
  { key: 'glutenFree', label: 'Без глютена' },
  { key: 'dairyFree', label: 'Без лактозы' },
  { key: 'veryHealthy', label: 'Полезное' },
  { key: 'cheap', label: 'Недорогое' },
  { key: 'veryPopular', label: 'Популярное' },
  { key: 'sustainable', label: 'Экологичное' },
  { key: 'lowFodmap', label: 'low Fodmap' },
]
