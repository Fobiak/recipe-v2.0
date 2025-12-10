<script setup lang="ts">
import type { FormFilters } from '@/entities/recipe/types/recipe-data.types'
import { Filter } from '@element-plus/icons-vue'
import { useRecipeStore } from '@/entities/recipe'
import { RECIPES_ROUTE_NAMES } from '@/shared/router/routes'
import { SearchInput } from '@/shared/ui/SearchInput'
import { cuisines, diets, intolerances, types } from '../config/constant'

const router = useRouter()

const recipeStore = useRecipeStore()
const { updateFilters } = recipeStore

const visible = ref(false)
const searchInput = ref('')
const selectedCuisines = ref<string[]>([])
const selectedDiets = ref<string[]>([])
const selectedTypes = ref<string[]>([])
const selectedIntolerances = ref<string[]>([])
const includeIngredients = ref<string | null>(null)
const excludeIngredients = ref<string | null>(null)

const INIT_FORM_DATA: Partial<FormFilters> = ({
  cuisine: null,
  diet: null,
  type: null,
  intolerances: null,
  includeIngredients: null,
  excludeIngredients: null,
})

const applyFilters = ref<Partial<FormFilters>>({
  ...INIT_FORM_DATA,
})

function toggleFilters() {
  visible.value = !visible.value
}

function onApplyFilters() {
  const payload: Partial<FormFilters> = {
    ...applyFilters.value,
    cuisine: selectedCuisines.value.join(',') || null,
    diet: selectedDiets.value.join(',') || null,
    type: selectedTypes.value.join(',') || null,
    intolerances: selectedIntolerances.value.join(',') || null,
    includeIngredients: includeIngredients.value || null,
    excludeIngredients: excludeIngredients.value || null,
  }
  updateFilters(payload)
  toggleFilters()
}

function onResetFilters() {
  selectedCuisines.value = []
  selectedDiets.value = []
  selectedTypes.value = []
  selectedIntolerances.value = []
  includeIngredients.value = null
  excludeIngredients.value = null

  recipeStore.resetFilters()
  toggleFilters()
}

async function handleInput() {
  recipeStore.updateFilters({ page: 1 })
  if (router.currentRoute.value.name !== RECIPES_ROUTE_NAMES.ALL_RECIPES) {
    router.push({ name: RECIPES_ROUTE_NAMES.ALL_RECIPES })
  }
  recipeStore.updateFilters({ query: searchInput.value })
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
          @click="toggleFilters"
        >
          <Close />
        </ElIcon>
      </div>

      <ElForm class="grid grid-cols-2 gap-2">
        <ElFormItem
          label="Кухня"
          label-position="top"
        >
          <ElSelect
            v-model="selectedCuisines"
            :options="cuisines"
            multiple
          />
        </ElFormItem>
        <ElFormItem
          label="Диета"
          label-position="top"
        >
          <ElSelect
            v-model="selectedDiets"
            :options="diets"
            multiple
          />
        </ElFormItem>
        <ElFormItem
          label="Тип блюда"
          label-position="top"
        >
          <ElSelect
            v-model="selectedTypes"
            :options="types"
            multiple
          />
        </ElFormItem>
        <ElFormItem
          label="Аллергия"
          label-position="top"
        >
          <ElSelect
            v-model="selectedIntolerances"
            :options="intolerances"
            multiple
          />
        </ElFormItem>
        <ElFormItem
          label="Обязательные ингредиенты"
          label-position="top"
        >
          <ElInput
            v-model="includeIngredients"
          />
        </ElFormItem>
        <ElFormItem
          label="Исключить ингредиенты"
          label-position="top"
        >
          <ElInput
            v-model="excludeIngredients"
          />
        </ElFormItem>
      </ElForm>

      <div class="flex justify-end gap-3">
        <ElButton
          text
          @click="onResetFilters"
        >
          Сбросить все
        </ElButton>
        <ElButton
          type="primary"
          @click="onApplyFilters"
        >
          Применить
        </ElButton>
      </div>
    </div>
    <template #reference>
      <ElButton
        class="w-[40px]"
        size="large"
        @click="toggleFilters"
      >
        <ElIcon :size="16">
          <Filter />
        </ElIcon>
      </ElButton>
    </template>
  </ElPopover>
</template>
