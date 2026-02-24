<script setup lang="ts">
import { useRecipeStore } from '@/entities/recipe'
import { RecipeCard } from '@/features/recipe'
import { BaseListRecipe } from '@/shared/ui/BaseListRecipe'

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
    v-if="recipes.length"
    v-loading="isLoading"
    class="flex flex-col h-full"
  >
    <ElScrollbar>
      <BaseListRecipe>
        <RecipeCard
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </BaseListRecipe>
      <div
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
  <div
    v-else
    class="flex items-center justify-center h-full"
  >
    Нет найденных рецептов
  </div>
</template>
