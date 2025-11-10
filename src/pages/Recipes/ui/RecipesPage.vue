<script setup lang="ts">
import { useRecipeStore } from '@/entities/recipe'
import { RecipeCard } from '@/features/recipe'

const recipeStore = useRecipeStore()
const { recipes, page, pageSize, totalResults, isLoading } = storeToRefs(recipeStore)

const hasRecipes = computed(() => recipes.value?.length > 0)

onMounted(() => {
  recipeStore.getRecipes()
})

watch(page, async () => {
  await recipeStore.getRecipes()
})
</script>

<template>
  <div
    v-loading="isLoading"
    class="flex flex-col h-full"
  >
    <ElScrollbar>
      <div class="grid grid-cols-4 gap-5 m-5">
        <RecipeCard
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>
      <div
        v-if="hasRecipes"
        class="flex justify-center mb-2"
      >
        <ElPagination
          v-model:current-page="page"
          :page-size="pageSize"
          :total="totalResults"
          layout="prev, pager, next"
        />
      </div>
    </ElScrollbar>
  </div>
</template>
