<script setup lang="ts">
import type { ExtendedIngredient } from '@/entities/recipe/types/recipe-data.types'

const props = defineProps<{
  ingredient: ExtendedIngredient
}>()
</script>

<template>
  <div class="flex items-center gap-3 p-2 border rounded-lg shadow-sm bg-white">
    <div>
      <p class="font-medium">
        {{ props.ingredient.name }}
      </p>
      <p class="text-sm text-gray-500">
        {{ props.ingredient.amount }} {{ props.ingredient.unit }}
      </p>
    </div>
  </div>
</template>
