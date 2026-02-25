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

async function loadById(id: number | null) {
  if (!id)
    return

  await Promise.all([
    recipeStore.getRecipeById(id),
    recipeStore.getRecipeSimilarById(id),
  ])
}

onMounted(() => {
  loadById(recipeId.value)
})

onBeforeRouteUpdate((to) => {
  loadById(Number(to.params.id))
})

onBeforeUnmount(() => {
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
      class="flex gap-3 items-start"
    >
      <div class="flex flex-1 flex-col gap-5 bg-bg-card rounded-2xl p-6 shadow-sm border">
        <RecipeDetailHeader
          :recipe="recipe"
        />
        <div class="flex flex-col gap-3">
          <div>
            <h2 class="text-xl font-semibold mb-2 text-text-primary">
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
      <div class="flex shrink-0 flex-col max-w-[450px] gap-3 bg-bg-card rounded-xl p-5 shadow-sm border">
        <span class="text-xl text-text-primary">
          Похожие рецепты
        </span>
        <RecipeSimilarCard
          v-for="similar in recipeSimilar"
          :key="similar.id"
          :similar-recipe="similar"
        />
      </div>
    </div>
  </ElScrollbar>
</template>
