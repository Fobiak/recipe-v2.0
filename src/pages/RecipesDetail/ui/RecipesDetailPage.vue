<script setup lang="ts">
import { Food, Star, Timer, Wallet } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '@/entities/recipe'
import { RecipeSimilarCard } from '@/features/recipe'
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

const info = computed(() => [
  { label: 'Время приготовления', icon: Timer, value: convertMinute(recipe.value?.readyInMinutes) },
  { label: 'Полезность', icon: Star, value: recipe.value?.healthScore },
  { label: 'Цена за порцию', icon: Wallet, value: `${recipe.value?.pricePerServing?.toFixed(2)}$` },
  { label: 'Порций', icon: Food, value: recipe.value?.servings },
])

function handleNextStep() {
  if (activeStep.value < steps.value.length - 1) {
    activeStep.value++
  }
  else {
    activeStep.value = 0
  }
}

async function handleLoadRecipe(recipeId: number | null) {
  await recipeStore.getRecipeById(recipeId)
  await recipeStore.getRecipeSimilarById(recipeId)
}

onMounted(() => {
  handleLoadRecipe(recipeId.value)
})

onUnmounted(() => {
  recipeStore.resetData()
})
</script>

<template>
  <ElScrollbar
    v-loading="isLoading"
    class="size-full"
  >
    <div
      v-if="recipe"
      :key="recipe.id"
      class="flex gap-5 m-5 items-start"
    >
      <div class="flex flex-1 flex-col gap-5 bg-white rounded-2xl p-6 shadow-sm border">
        <div class="flex gap-3">
          <div class="flex flex-col min-w-[400px] gap-2">
            <img
              :src="recipe.image"
              class="rounded-2xl w-full h-[300px] object-cover shadow-md"
            >
            <div class="flex justify-between items-center gap-4 w-full">
              <template
                v-for="item in info"
                :key="item.label"
              >
                <div
                  v-if="item.value"
                  class="flex items-center gap-1"
                >
                  <ElIcon>
                    <component
                      :is="item.icon"
                    />
                  </ElIcon>
                  <span>{{ item.value }}</span>
                </div>
              </template>
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <h1 class="text-2xl font-bold">
              {{ recipe.title }}
            </h1>
            <RecipeTags :recipe="recipe" />
            <p v-html="recipe.summary" />
          </div>
        </div>
        <div class="flex flex-col gap-3">
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
            <span class="text-xl">
              Инструкция к приготовлению
            </span>

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
              class="w-[200px] flex justify-center"
              @click="handleNextStep"
            >
              Следующий шаг
            </ElButton>
          </div>
        </div>
      </div>
      <div class="flex shrink-0 flex-col w-[500px] gap-3 bg-white rounded-xl p-5 shadow-sm border">
        <span class="text-xl">
          Похожие рецепты
        </span>
        <RecipeSimilarCard
          v-for="similar in recipeSimilar"
          :key="similar.id"
          :similar-recipe="similar"
          @click-similar="handleLoadRecipe"
        />
      </div>
    </div>
  </ElScrollbar>
</template>
