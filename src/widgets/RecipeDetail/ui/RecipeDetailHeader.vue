<script setup lang="ts">
import type { RecipeInfoItem, RecipeItem } from '@/entities/recipe/types/recipe-data.types'
import { Food, Star, Timer, Wallet } from '@element-plus/icons-vue'
import { convertMinute } from '@/shared/lib/convertMinute'
import { RecipeTags } from '@/shared/ui/RecipeTags'

const props = defineProps<{
  recipe: RecipeItem
}>()

const info: RecipeInfoItem[] = [
  { label: 'Время приготовления', icon: Timer, value: convertMinute(props.recipe.readyInMinutes ?? 0) },
  { label: 'Полезность', icon: Star, value: props.recipe.healthScore ?? null },
  { label: 'Цена за порцию', icon: Wallet, value: props.recipe.pricePerServing ? `${props.recipe.pricePerServing.toFixed(2)}$` : null },
  { label: 'Порций', icon: Food, value: props.recipe.servings ?? null },
]
</script>

<template>
  <div class="flex flex-col gap-3">
    <h1 class="text-2xl font-bold">
      {{ props.recipe.title }}
    </h1>
    <RecipeTags :recipe="props.recipe" />
    <img
      :src="props.recipe.image"
      class="rounded-2xl w-full h-[300px] object-cover shadow-md"
    >
    <div class="flex justify-between items-center gap-4 w-full text-text-primary">
      <template
        v-for="item in info"
        :key="item.label"
      >
        <div
          v-if="item.value"
          class="flex items-center gap-1"
        >
          <ElIcon>
            <component :is="item.icon" />
          </ElIcon>
          <span>{{ item.value }}</span>
        </div>
      </template>
    </div>
    <p
      class="text-text-primary"
      v-html="props.recipe.summary"
    />
  </div>
</template>
