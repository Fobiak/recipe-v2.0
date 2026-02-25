<script setup lang="ts">
import { MainHeader } from '@/widgets/MainHeader'
import { MainFooter } from './widgets/MainFooter'
</script>

<template>
  <div class="size-full flex flex-col bg-bg-main">
    <div class="flex justify-center bg-bg-main pt-2">
      <MainHeader class="w-full max-w-7xl" />
    </div>

    <div class="flex-1 flex justify-center overflow-hidden">
      <div class="w-full max-w-7xl bg-bg_base overflow-hidden py-2">
        <RouterView />
      </div>
    </div>

    <div class="flex justify-center bg-bg-main pb-2">
      <MainFooter class="w-full max-w-7xl" />
    </div>
  </div>
</template>
