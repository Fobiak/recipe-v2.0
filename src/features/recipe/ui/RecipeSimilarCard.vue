<script setup lang="ts">
import type { RecipeSimilarCardData } from '../types/recipe-similar-card'
import { Food, Timer } from '@element-plus/icons-vue'
import { convertMinute } from '@/shared/lib/convertMinute'
import { RECIPES_ROUTE_NAMES } from '@/shared/router/routes'

const props = defineProps<{
  similarRecipe: RecipeSimilarCardData
}>()

const similarRecipe = toRef(props, 'similarRecipe')

const router = useRouter()

function handleGoDetailPage() {
  router.push({ name: RECIPES_ROUTE_NAMES.RECIPE_DETAIL, params: { id: similarRecipe.value.id } })
}

const imageUrl = computed(() => {
  return `https://spoonacular.com/recipeImages/${similarRecipe.value.id}-556x370.${similarRecipe.value.imageType}`
})
</script>

<template>
  <div
    class="flex gap-4 p-3 rounded-xl bg-white shadow hover:shadow-md transition cursor-pointer"
    @click="handleGoDetailPage"
  >
    <img
      :src="imageUrl"
      :alt="similarRecipe.title"
      class="w-32 h-24 rounded-lg"
    >

    <div class="flex flex-col justify-between">
      <span class="font-semibold text-base line-clamp-2">
        {{ similarRecipe.title }}
      </span>

      <div class="flex items-center gap-4">
        <span class="flex items-center gap-1">
          <ElIcon
            :size="20"
          >
            <Timer />
          </ElIcon>
          {{ convertMinute(similarRecipe.readyInMinutes) }}
        </span>

        <span class="flex items-center gap-1">
          <ElIcon :size="20">
            <Food />
          </ElIcon>
          {{ similarRecipe.servings }} порц.
        </span>
      </div>
    </div>
  </div>
</template>
