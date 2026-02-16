<script setup lang="ts">
import type { ExtendedIngredient } from '@/entities/recipe/types/recipe-data.types'

const props = defineProps<{
  ingredient: ExtendedIngredient
}>()
</script>

<template>
  <div class="flex items-center gap-3 p-2 border rounded-lg shadow-sm bg-bg-hover">
    <div class="flex flex-col text-text-primary">
      <p class="font-medium">
        {{ props.ingredient.name }}
      </p>
      <p class="text-sm">
        {{ props.ingredient.amount }} {{ props.ingredient.unit }}
      </p>
    </div>
  </div>
</template>
