<script setup lang="ts">
import { Star, StarFilled } from '@element-plus/icons-vue'
import RecipeMainIcon from '@/shared/icons/RecipeMainIcon.vue'
import { RECIPES_ROUTE_NAMES } from '@/shared/router/routes'
import TabTools from '@/widgets/TabTools/ui/TabTools.vue'

const router = useRouter()
const route = useRoute()

const isFavoritesPage = computed(() => route.name === RECIPES_ROUTE_NAMES.FAVORITE_RECIPES)

function handlePushMainPage() {
  router.push({ name: RECIPES_ROUTE_NAMES.ALL_RECIPES })
}

function handlePushFavorites() {
  router.push({ name: RECIPES_ROUTE_NAMES.FAVORITE_RECIPES })
}
</script>

<template>
  <div class="flex h-[68px] w-full flex-row items-center justify-start gap-3 border-b border-gray-300 bg-white px-10">
    <div
      class="flex cursor-pointer flex-row items-center gap-4"
      @click="handlePushMainPage"
    >
      <ElIcon size="40">
        <RecipeMainIcon />
      </ElIcon>
      <div class="flex flex-col min-w-[200px]">
        <p class="text-3xl font-bold">
          Все рецепты
        </p>
        <p class="text-xs text-slate-400">
          Еда — это искусство, а ты художник
        </p>
      </div>
    </div>

    <TabTools />

    <ElButton
      circle
      size="large"
      @click="handlePushFavorites"
    >
      <ElIcon size="20">
        <component :is="isFavoritesPage ? StarFilled : Star" />
      </ElIcon>
    </ElButton>
  </div>
</template>
