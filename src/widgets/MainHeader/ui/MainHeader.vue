<script setup lang="ts">
import RecipeMainIcon from '@/shared/icons/RecipeMainIcon.vue'
import { RECIPES_ROUTE_NAMES } from '@/shared/router/routes'
import TabTools from '@/shared/ui/TabTools.vue'

const router = useRouter()

function handlePushMainPage() {
  router.push({ name: RECIPES_ROUTE_NAMES.ALL_RECIPES })
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
      <div>
        <p class="text-3xl font-bold">
          Все рецепты
        </p>
        <p class="text-xs text-slate-400">
          Еда — это искусство, а ты художник
        </p>
      </div>
    </div>
    <TabTools />
  </div>
</template>
