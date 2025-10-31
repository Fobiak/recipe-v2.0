<script setup lang="ts">
import { MainHeader } from '@/widgets/MainHeader'
</script>

<template>
  <div class="bg-fill_extralight size-full">
    <MainHeader />
    <div class="overflow-hidden p-5">
      <div class="border-border_lighter bg-bg_base flex size-full rounded border ">
        <div class="flex-grow overflow-hidden">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>
