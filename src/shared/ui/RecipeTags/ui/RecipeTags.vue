<script setup lang="ts">
import type { RecipeFlags } from '../types/recipe-tags'
import { TAGS } from '../types/recipe-tags'

const props = defineProps<{
  recipe: RecipeFlags
}>()
</script>

<template>
  <div class="flex flex-row gap-2">
    <template
      v-for="tag in TAGS"
      :key="tag.key"
    >
      <ElTag
        v-if="props.recipe[tag.key]"
        type="success"
        effect="light"
        class="text-sm"
      >
        {{ tag.label }}
      </ElTag>
    </template>
  </div>
</template>
