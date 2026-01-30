<script setup lang="ts">
import { Moon, Star, StarFilled, Sunny } from '@element-plus/icons-vue'
import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
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

const isDark = useDark()
const toggleDark = useToggle(isDark)

function handleToggleTheme() {
  toggleDark()
}
</script>

<template>
  <div class="flex h-[68px] w-full items-center justify-start gap-3 border-b border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-900 px-10 transition-colors duration-300">
    <div
      class="flex cursor-pointer items-center gap-4"
      @click="handlePushMainPage"
    >
      <ElIcon size="40">
        <RecipeMainIcon />
      </ElIcon>
      <div class="flex flex-col min-w-[200px]">
        <p class="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">
          Все рецепты
        </p>
        <p class="text-xs text-slate-400 dark:text-slate-300 transition-colors duration-300">
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

    <ElButton
      circle
      size="large"
      @click="handleToggleTheme"
    >
      <ElIcon size="20">
        <component :is="isDark ? Sunny : Moon" />
      </ElIcon>
    </ElButton>
  </div>
</template>
