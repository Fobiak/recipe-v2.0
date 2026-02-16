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
  <div class="flex h-[68px] w-full items-center justify-start gap-3 border-b border-border bg-bg-header px-10 transition-colors duration-300 rounded-lg">
    <div
      class="flex cursor-pointer items-center gap-4"
      @click="handlePushMainPage"
    >
      <ElIcon size="40">
        <RecipeMainIcon />
      </ElIcon>
      <div class="flex flex-col min-w-[200px]">
        <p class="text-3xl font-bold text-text-primary transition-colors duration-300">
          Все рецепты
        </p>
        <p class="text-xs text-text-secondary transition-colors duration-300">
          Еда — это искусство, а ты художник
        </p>
      </div>
    </div>

    <TabTools />

    <div class="flex gap">
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
  </div>
</template>
