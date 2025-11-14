<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRecipeStore } from '@/entities/recipe'
import { RecipeCard } from '@/features/recipe'
import { convertMinute } from '@/shared/lib/convertMinute'
import { RecipeTags } from '@/shared/ui/RecipeTags'

const recipeStore = useRecipeStore()
const { isLoading, recipe, recipeSimilar } = storeToRefs(recipeStore)

const route = useRoute()
const recipeId = computed(() => {
  const id = route.params.id
  return id ? Number(id) : null
})
const activeStep = ref(0)

const steps = computed(() => {
  return recipe.value?.analyzedInstructions?.flatMap(i => i.steps) ?? []
})

const info = [
  { label: 'Время приготовления', value: convertMinute(recipe.value?.readyInMinutes) },
  { label: 'Полезность', value: recipe.value?.healthScore },
  { label: 'Цена за порцию', value: recipe.value?.pricePerServing.toFixed(2) },
  { label: 'Порций', value: recipe.value?.servings },
  { label: 'WW Points', value: recipe.value?.weightWatcherSmartPoints },
]

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
  await recipeStore.getRecipeSimilarById(recipeId.value)
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
      class="flex flex-col items-center gap-5 m-5"
    >
      <div class="flex flex-col gap-5 max-w-[700px] bg-green-50 rounded-xl p-3 shadow-sm">
        <img
          :src="recipe.image"
          class="rounded-lg"
        >
        <div class="flex flex-col gap-3">
          <div class="flex flex-col justify-center max-w-[700px]">
            <h1 class="text-2xl font-bold">
              {{ recipe.title }}
            </h1>
            <RecipeTags :recipe="recipe" />
            <p v-html="recipe.summary" />
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <template
              v-for="item in info"
              :key="item.label"
            >
              <div
                v-if="item.value"
                class="flex flex-col items-center justify-center bg-green-50 rounded-xl p-3 shadow-sm"
              >
                <p class="text-xl font-semibold text-green-700">
                  {{ item.value }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ item.label }}
                </p>
              </div>
            </template>
          </div>
          <div>
            <h2 class="text-xl font-semibold mb-2">
              Ингредиенты
            </h2>
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
          </div>
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
        </div>
      </div>
      <RecipeCard
        v-for="recipeSim in recipeSimilar"
        :key="recipeSim.id"
        :recipe="recipeSim"
        view-type="similar"
      />
    </div>
  </ElScrollbar>
</template>
