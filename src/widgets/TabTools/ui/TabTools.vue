<script setup lang="ts">
import type { FormFilters } from '@/entities/recipe/types/recipe-data.types'
import { Close, Filter } from '@element-plus/icons-vue'
import { onClickOutside } from '@vueuse/core'
import { useRecipeStore } from '@/entities/recipe'
import { RECIPES_ROUTE_NAMES } from '@/shared/router/routes'
import { SearchInput } from '@/shared/ui/SearchInput'
import { cuisines, diets, intolerances, sortChoice, types } from '../config/constant'

const router = useRouter()
const recipeStore = useRecipeStore()
const { updateFilters } = recipeStore

const visible = ref(false)
const popoverRef = ref()
const searchInput = ref('')
const selectedCuisines = ref<string[]>([])
const selectedDiets = ref<string[]>([])
const selectedTypes = ref<string[]>([])
const selectedIntolerances = ref<string[]>([])
const includeIngredients = ref<string | null>(null)
const excludeIngredients = ref<string | null>(null)
const sort = ref<string | null>(null)

const INIT_FORM_DATA: Partial<FormFilters> = ({
  cuisine: null,
  diet: null,
  type: null,
  intolerances: null,
  includeIngredients: null,
  excludeIngredients: null,
  sort: null,
})

const applyFilters = ref<Partial<FormFilters>>({
  ...INIT_FORM_DATA,
})

const isMainPage = computed(() => router.currentRoute.value.name === RECIPES_ROUTE_NAMES.ALL_RECIPES)

onClickOutside(popoverRef, (event) => {
  const isSelectElement = (event.target as Element).closest?.('.el-select')
    || (event.target as Element).closest?.('.el-input')
    || (event.target as Element).closest?.('.el-popper')

  if (!isSelectElement) {
    visible.value = false
  }
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
    sort: sort.value || null,
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
  if (isMainPage.value) {
    router.push({ name: RECIPES_ROUTE_NAMES.ALL_RECIPES })
  }
  recipeStore.updateFilters({ page: 1, query: searchInput.value })
}

async function handleSelectSort() {
  recipeStore.updateFilters({ sort: sort.value })
}

onUnmounted(() => {
  onResetFilters()
})
</script>

<template>
  <div class="flex justify-between w-full">
    <div class="flex gap-4">
      <SearchInput
        v-model="searchInput"
        size="large"
        class="!w-[500px]"
        @debounce="handleInput"
      />
      <ElPopover
        v-if="isMainPage"
        ref="popoverRef"
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
                placeholder="Выберите тип кухни"
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
                placeholder="Выберите тип диеты"
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
                placeholder="Выберите тип блюда"
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
                placeholder="Выберите, если есть аллергия"
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
    </div>
    <ElSelect
      v-if="isMainPage"
      v-model="sort"
      :options="sortChoice"
      size="large"
      placeholder="Сортировка"
      class="w-[200px]"
      @change="handleSelectSort"
    />
  </div>
</template>
