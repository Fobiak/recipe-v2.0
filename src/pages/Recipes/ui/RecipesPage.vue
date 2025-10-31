<script setup lang="ts">
import { ElScrollbar } from 'element-plus'
import { RecipeCard } from '@/features/recipe'
import { mockRecipes } from '@/features/recipe/mock/mock-recipe'
</script>

<template>
  <div class="size-full">
    <ElScrollbar>
      <div class="grid grid-cols-4 gap-5 my-5">
        <RecipeCard
          v-for="recipe in mockRecipes"
          :key="recipe.id"
          :recipe="recipe"
        />
      </div>
    </ElScrollbar>
  </div>
</template>
