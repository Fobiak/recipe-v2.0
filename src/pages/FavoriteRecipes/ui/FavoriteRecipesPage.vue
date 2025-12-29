<script setup lang="ts">
import { useFavoriteStore } from '@/entities/FavoriteRecipe'
import { RecipeCard } from '@/features/recipe'

const favoriteStore = useFavoriteStore()
const { favoriteRecipes } = storeToRefs(favoriteStore)
</script>

<template>
  <div class="flex flex-col h-full">
    <ElScrollbar v-if="favoriteRecipes.length">
      <div
        class="grid grid-cols-6 gap-3 m-5"
      >
        <RecipeCard
          v-for="recipe in favoriteRecipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>
    </ElScrollbar>
    <div
      v-else
      class="flex items-center justify-center h-full"
    >
      Нет избранных рецептов
    </div>
  </div>
</template>
