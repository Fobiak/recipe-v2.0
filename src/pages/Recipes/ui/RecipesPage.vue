<script setup lang="ts">
import { useRecipeStore } from '@/entities/recipe'
import { RecipeCard } from '@/features/recipe'

const recipeStore = useRecipeStore()
const { recipes, formFilters, totalResults, isLoading } = storeToRefs(recipeStore)

onMounted(() => {
  recipeStore.getRecipes()
})

watch(() => formFilters.value.page, async () => {
  await recipeStore.getRecipes()
})
</script>

<template>
  <div
    v-loading="isLoading"
    class="flex flex-col h-full"
  >
    <ElScrollbar>
      <div class="grid grid-cols-6 gap-3 m-5">
        <RecipeCard
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
          view-type="basic"
        />
      </div>
      <div
        v-if="recipes.length"
        class="flex justify-center mb-2"
      >
        <ElPagination
          v-model:current-page="formFilters.page"
          :page-size="formFilters.pageSize"
          :total="totalResults"
          layout="prev, pager, next"
        />
      </div>
    </ElScrollbar>
  </div>
</template>
