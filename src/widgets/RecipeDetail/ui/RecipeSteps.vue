<script setup lang="ts">
import type { StepsItem } from '@/entities/recipe/types/recipe-data.types'

const props = defineProps<{
  steps: StepsItem[]
}>()

const activeStep = ref(0)

function handleNextStep() {
  if (activeStep.value < props.steps.length - 1) {
    activeStep.value++
  }
  else {
    activeStep.value = 0
  }
}
</script>

<template>
  <div
    v-if="steps.length"
    class="flex flex-col gap-2 w-full text-text-primary"
  >
    <span class="text-xl">
      Инструкция к приготовлению
    </span>

    <ElSteps
      :active="activeStep"
      finish-status="success"
      direction="vertical"
    >
      <ElStep
        v-for="(step, index) in steps"
        :key="index"
        :title="`Шаг ${step.number}`"
        :description="step.step"
      />
    </ElSteps>

    <ElButton
      type="primary"
      class="w-[200px] flex justify-center"
      @click="handleNextStep"
    >
      Следующий шаг
    </ElButton>
  </div>
</template>
