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
    v-loading="isLoading"
    class="flex flex-col h-full items-center pt-5"
  >
    <ElScrollbar v-if="recipes.length">
      <BaseListRecipe>
        <RecipeCard
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </BaseListRecipe>
    </ElScrollbar>
    <div
      v-if="recipes.length"
      class="flex justify-center my-2"
    >
      <ElPagination
        v-model:current-page="formFilters.page"
        :page-size="formFilters.pageSize"
        :total="totalResults"
        layout="prev, pager, next"
      />
    </div>
    <div
      v-else-if="!isLoading"
      class="flex items-center justify-center h-full"
    >
      Нет найденных рецептов
    </div>
  </div>
</template>
