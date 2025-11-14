<script setup lang="ts">
import type { RecipeCardData } from '../types/recipe-card'
import { Food, PieChart, StarFilled, Timer } from '@element-plus/icons-vue'
import { convertMinute } from '@/shared/lib/convertMinute'
import { getCalories } from '@/shared/lib/getCalories'
import { RECIPES_ROUTE_NAMES } from '@/shared/router/routes'

const props = defineProps<{
  recipe: RecipeCardData
  viewType: 'basic' | 'similar'
}>()

const recipe = toRef(props, 'recipe')

const router = useRouter()

function handleGoDetailPage() {
  router.push({ name: RECIPES_ROUTE_NAMES.RECIPE_DETAIL, params: { id: recipe.value.id } })
}
</script>

<template>
  <ElCard
    shadow="hover"
    class="w-[300px] h-[430px] flex flex-col justify-between cursor-pointer"
    :body-style="{ padding: '0px' }"
    @click="handleGoDetailPage"
  >
    <img
      :src="recipe.image"
      :alt="recipe.title"
      class="w-full h-[180px]"
    >

    <div class="p-4 flex flex-col flex-grow">
      <div class="flex justify-between text-gray-800 text-sm">
        <span class="flex items-center gap-1">
          <ElIcon
            :size="20"
          >
            <PieChart />
          </ElIcon>
          {{ getCalories(recipe.summary) }} ккал
        </span>
        <span class="flex items-center gap-1">
          <ElIcon
            :size="20"
          >
            <Timer />
          </ElIcon>
          {{ convertMinute(recipe.readyInMinutes) }}
        </span>
      </div>

      <h2 class="text-lg font-bold truncate mt-2">
        {{ recipe.title }}
      </h2>
      <div class="flex flex-wrap gap-1 mt-2 text-sm text-gray-500">
        <span
          v-for="type in recipe.dishTypes?.slice(0, 6)"
          :key="String(type)"
          class="bg-gray-200 px-2 py-1 rounded-md"
        >
          {{ type }}
        </span>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-between items-center px-4 py-2">
        <div class="flex flex-col text-sm">
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
          class="flex items-center"
          round
        >
          Перейти
        </ElButton>
      </div>
    </template>
  </ElCard>
</template>
