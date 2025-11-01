<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const recipeId = computed(() => {
  const id = route.params.id
  return id ? Number(id) : null
})
</script>

<template>
  <div class="size-fll p-5">
    {{ recipeId }}
  </div>
</template>
