<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRecipeStore } from '@/entities/recipe'
import { convertMinute } from '@/shared/lib/convertMinute'
import { RecipeTags } from '@/shared/ui/RecipeTags'

const recipeStore = useRecipeStore()
const { isLoading, recipe } = storeToRefs(recipeStore)

const route = useRoute()
const recipeId = computed(() => {
  const id = route.params.id
  return id ? Number(id) : null
})
const activeStep = ref(0)

const steps = computed(() => {
  return recipe.value?.analyzedInstructions?.flatMap(i => i.steps) ?? []
})

function handleNextStep() {
  if (activeStep.value < steps.value.length - 1) {
    activeStep.value++
  }
  else {
    activeStep.value = 0
  }
}

onMounted(async () => {
  await recipeStore.getRecipeById(recipeId.value)
})

// добавить сброс recipe
// onUnmounted(() => {

// })
</script>

<template>
  <ElScrollbar
    v-loading="isLoading"
    class="h-full"
  >
    <div
      v-if="recipe"
      class="flex flex-col gap-5 m-5"
    >
      <div class="flex flex-row justify-between gap-5">
        <img
          :src="recipe.image"
          class="w-full rounded-lg"
        >
        <div class="flex flex-col gap-3">
          <div class="flex flex-col">
            <h1 class="text-2xl font-bold">
              {{ recipe.title }}
            </h1>
            <RecipeTags :recipe="recipe" />
            <ElScrollbar max-height="350">
              <p v-html="recipe.summary" />
            </ElScrollbar>
          </div>
          <div class="flex gap-6 text-gray-700">
            <div>
              <span class="font-semibold">
                Подготовка:
              </span>
              {{ convertMinute(recipe.readyInMinutes) }}
            </div>
            <div>
              <span class="font-semibold">
                Готовка:
              </span>
              {{ convertMinute(recipe.cookingMinutes) }}
            </div>
            <div>
              <span class="font-semibold">
                Всего:
              </span>
              {{ convertMinute(recipe.readyInMinutes) }}
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-row items-start justify-between">
        <div
          v-if="steps.length"
          class="flex flex-col gap-2 w-[500px]"
        >
          <h1 class="text-xl">
            Инструкция к приготовлению
          </h1>

          <ElSteps
            :active="activeStep"
            finish-status="success"
            direction="vertical"
          >
            <ElStep
              v-for="(step, index) in steps"
              :key="index"
              :title="`Шаг ${step.number}`"
              :description="step.step"
            />
          </ElSteps>

          <ElButton
            type="primary"
            class="w-[200px]"
            @click="handleNextStep"
          >
            Следующий шаг
          </ElButton>
        </div>
        <div class="w-[500px]">
          <h2 class="text-xl font-semibold mb-2">
            Ингредиенты
          </h2>
          <ElScrollbar max-height="500">
            <ul class="flex flex-col gap-2">
              <li
                v-for="ingredient in recipe.extendedIngredients"
                :key="ingredient.id"
                class="flex items-center gap-3 p-2 border rounded-lg shadow-sm bg-white"
              >
                <div>
                  <p class="font-medium">
                    {{ ingredient.name }}
                  </p>
                  <p class="text-sm text-gray-500">
                    {{ ingredient.amount }} {{ ingredient.unit }}
                  </p>
                </div>
              </li>
            </ul>
          </ElScrollbar>
        </div>
      </div>
    </div>
  </ElScrollbar>
</template>
