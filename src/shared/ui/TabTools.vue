<script setup lang="ts">
import { Filter } from '@element-plus/icons-vue'
import { useRecipeStore } from '@/entities/recipe'
import { RECIPES_ROUTE_NAMES } from '../router/routes'
import SearchInput from './SearchInput/ui/SearchInput.vue'

const router = useRouter()

const recipeStore = useRecipeStore()

const visible = ref(false)
const searchInput = ref('')

async function handleInput() {
  recipeStore.updateFilters({ page: 1 })
  if (router.currentRoute.value.name !== RECIPES_ROUTE_NAMES.ALL_RECIPES) {
    router.push({ name: RECIPES_ROUTE_NAMES.ALL_RECIPES })
  }
  recipeStore.updateFilters({ query: searchInput.value })
  recipeStore.getRecipes()
}
</script>

<template>
  <div class="w-[500px]">
    <SearchInput
      v-model="searchInput"
      size="large"
      @debounce="handleInput"
    />
  </div>
  <ElPopover
    key="popover"
    placement="bottom-start"
    :visible="visible"
    width="632px"
    :teleported="false"
  >
    <div class="flex flex-col gap-3">
      <div class="flex items-center justify-between">
        <h2 class="font-medium">
          Фильтры
        </h2>
        <ElIcon
          size="16"
          class="cursor-pointer"
        >
          <Close />
        </ElIcon>
      </div>

      <div class="flex justify-end gap-3">
        <ElButton
          text
        >
          Сбросить все
        </ElButton>
        <ElButton
          type="primary"
        >
          Применить
        </ElButton>
      </div>
    </div>
    <template #reference>
      <ElButton
        class="w-[40px]"
        size="large"
      >
        <ElIcon :size="16">
          <Filter />
        </ElIcon>
      </ElButton>
    </template>
  </ElPopover>
</template>
