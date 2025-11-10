<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { useRecipeStore } from '@/entities/recipe'
import RecipeMainIcon from '@/shared/icons/RecipeMainIcon.vue'
import { RECIPES_ROUTE_NAMES } from '@/shared/router/routes'

const router = useRouter()

const recipeStore = useRecipeStore()
const { formFilters } = storeToRefs(recipeStore)

const debounceFetch = useDebounceFn(() => {
  recipeStore.getRecipes()
}, 500)

watch(
  () => formFilters.value.search,
  () => {
    formFilters.value.page = 1
    debounceFetch()
  },
)

function handlePushMainPage() {
  router.push({ name: RECIPES_ROUTE_NAMES.ALL_RECIPES })
}
</script>

<template>
  <div class="flex h-[68px] w-full flex-row items-center justify-start gap-10 border-b border-gray-300 bg-white px-10">
    <div
      class="flex cursor-pointer flex-row items-center gap-4"
      @click="handlePushMainPage"
    >
      <ElIcon size="40">
        <RecipeMainIcon />
      </ElIcon>
      <div>
        <p class="text-3xl font-bold">
          Все рецепты
        </p>
        <p class="text-xs text-slate-400">
          Еда — это искусство, а ты художник
        </p>
      </div>
    </div>
    <div>
      <ElInput
        :model-value="formFilters.search"
        size="large"
        class="!w-[500px]"
        placeholder="Поиск по рецептам"
        clearable
        @update:model-value="val => formFilters.search = val"
      />
    </div>
  </div>
</template>
