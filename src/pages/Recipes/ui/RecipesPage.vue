<script setup lang="ts">
import { useRecipeStore } from '@/entities/recipe'
import { RecipeCard } from '@/features/recipe'

const recipeStore = useRecipeStore()
const { recipes } = storeToRefs(recipeStore)

onMounted(() => {
  recipeStore.getRecipes()
})
</script>

<template>
  <div class="size-full">
    <ElScrollbar>
      <div class="grid grid-cols-4 gap-5 m-5">
        <RecipeCard
          v-for="recipe in recipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>
    </ElScrollbar>
  </div>
</template>
