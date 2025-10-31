<script setup lang="ts">
import { MainHeader } from '@/widgets/MainHeader'
</script>

<template>
  <div class="grid size-full grid-rows-[68px_1fr] bg-fill_extralight">
    <MainHeader />
    <div class="overflow-hidden">
      <div class="flex size-full border-border_lighter bg-bg_base rounded border ">
        <div class="flex-grow overflow-hidden">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
