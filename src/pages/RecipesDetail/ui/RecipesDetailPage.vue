<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useRecipeStore } from '@/entities/recipe'
import { RecipeSimilarCard } from '@/features/recipe'
import { RecipeDetailHeader, RecipeIngredients, RecipeSteps } from '@/widgets/RecipeDetail'

const recipeStore = useRecipeStore()
const { isLoading, recipe, recipeSimilar } = storeToRefs(recipeStore)

const route = useRoute()
const recipeId = computed(() => {
  const id = route.params.id
  return id ? Number(id) : null
})

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
        <RecipeDetailHeader
          :recipe="recipe"
        />
        <div class="flex flex-col gap-3">
          <div>
            <h2 class="text-xl font-semibold mb-2">
              Ингредиенты
            </h2>
            <div class="flex flex-col gap-2">
              <RecipeIngredients
                v-for="ingredient in recipe.extendedIngredients"
                :key="ingredient.id"
                :ingredient="ingredient"
              />
            </div>
          </div>
          <RecipeSteps
            v-if="recipe.analyzedInstructions?.length"
            :steps="recipe.analyzedInstructions.flatMap(i => i.steps)"
          />
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
