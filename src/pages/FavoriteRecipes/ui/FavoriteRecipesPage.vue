<script setup lang="ts">
import { useFavoriteStore } from '@/entities/FavoriteRecipe'
import { RecipeCard } from '@/features/recipe'
import { BaseListRecipe } from '@/shared/ui/BaseListRecipe'

const favoriteStore = useFavoriteStore()
const { favoriteRecipes } = storeToRefs(favoriteStore)
</script>

<template>
  <div class="flex flex-col h-full">
    <ElScrollbar v-if="favoriteRecipes.length">
      <BaseListRecipe>
        <RecipeCard
          v-for="recipe in favoriteRecipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </BaseListRecipe>
    </ElScrollbar>
    <div
      v-else
      class="flex items-center justify-center h-full"
    >
      Нет избранных рецептов
    </div>
  </div>
</template>
