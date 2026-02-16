<script setup lang="ts">
import type { RecipeCardData } from '../types/recipe-card'
import { Food, PieChart, Star, StarFilled, Timer } from '@element-plus/icons-vue'
import { useFavoriteStore } from '@/entities/FavoriteRecipe'
import { convertMinute } from '@/shared/lib/convertMinute'
import { getCalories } from '@/shared/lib/getCalories'
import { RECIPES_ROUTE_NAMES } from '@/shared/router/routes'

const props = defineProps<{
  recipe: RecipeCardData
}>()

const recipe = toRef(props, 'recipe')
const favoriteStore = useFavoriteStore()

const router = useRouter()

const isFavorite = computed(() =>
  favoriteStore.isFavoriteRecipe(props.recipe.id),
)

function toggleFavorite() {
  favoriteStore.toggleFavorite(props.recipe)
}

function handleGoDetailPage() {
  router.push({ name: RECIPES_ROUTE_NAMES.RECIPE_DETAIL, params: { id: recipe.value.id } })
}
</script>

<template>
  <ElCard
    shadow="hover"
    class="w-[300px] h-[430px] flex flex-col justify-between cursor-pointer !bg-bg-card"
    :body-style="{ padding: '0px' }"
    @click="handleGoDetailPage"
  >
    <img
      :src="recipe.image"
      :alt="recipe.title"
      class="w-full h-[180px]"
    >

    <div class="p-4 flex flex-col min-h-[160px]">
      <div class="flex justify-between text-text-primary text-sm">
        <div class="flex items-center gap-1">
          <ElIcon
            :size="20"
          >
            <PieChart />
          </ElIcon>
          {{ getCalories(recipe.summary) }} ккал
        </div>
        <div class="flex items-center gap-1">
          <ElIcon
            :size="20"
          >
            <Timer />
          </ElIcon>
          {{ convertMinute(recipe.readyInMinutes) }}
        </div>
      </div>

      <h2 class="text-lg font-bold truncate mt-2 text-text-primary">
        {{ recipe.title }}
      </h2>
      <div class="flex flex-wrap gap-1 mt-2 text-sm text-text-secondary">
        <span
          v-for="type in recipe.dishTypes?.slice(0, 6)"
          :key="String(type)"
          class="bg-bg-hover px-2 py-1 rounded-md"
        >
          {{ type }}
        </span>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between items-center px-4">
        <div class="flex flex-col text-sm text-text-primary">
          <span class="flex gap-1 p-1">
            <ElIcon :size="20">
              <Food />
            </ElIcon>
            {{ recipe.servings }} порц.
          </span>
          <span class="flex gap-1 p-1">
            <ElIcon :size="20">
              <StarFilled />
            </ElIcon>
            {{ recipe.aggregateLikes }}
          </span>
        </div>
        <ElButton
          link
          class="text-text-primary"
          @click.stop="toggleFavorite"
        >
          <ElIcon size="20">
            <StarFilled v-if="isFavorite" />
            <Star v-else />
          </ElIcon>
        </ElButton>
      </div>
    </template>
  </ElCard>
</template>
