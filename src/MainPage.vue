<script setup lang="ts">
import { MainHeader } from '@/widgets/MainHeader'
import { MainFooter } from './widgets/MainFooter'
</script>

<template>
  <div class="grid size-full grid-rows-[68px_1fr_auto] bg-fill_extralight">
    <MainHeader />
    <div class="overflow-hidden">
      <div class="flex size-full bg-bg_base">
        <div class="flex-grow overflow-hidden">
          <RouterView />
        </div>
      </div>
    </div>
    <MainFooter />
  </div>
</template>
