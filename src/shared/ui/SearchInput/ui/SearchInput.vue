<script setup lang="ts">
import type { ComInputEmits, ComInputProps, ComInputSlots } from '../types'
import { useDebounceFn } from '@vueuse/core'

defineProps<ComInputProps>()

const emits = defineEmits<ComInputEmits>()

defineSlots<ComInputSlots>()

const model = defineModel<string | null | undefined | number | any>({ default: '' })

const inputRef = ref()

const debounceFn = useDebounceFn(() => {
  emits('debounce', model.value as string)
}, 400)

function handleInput(value: string) {
  emits('input', value)
  debounceFn()
}

defineExpose({
  focus,
  inputRef,
})
</script>

<template>
  <ElInput
    ref="inputRef"
    v-model="model"
    v-bind="{
      ...$props,
      ...$attrs,
    }"
    :suffix-icon="model ? '' : 'Search'"
    class="w-full"
    placeholder="Поиск"
    :clearable="true"
    @input="handleInput"
    @change="$emit('change', $event)"
    @clear="$emit('clear')"
    @focus="$emit('focus', $event)"
    @blur="$emit('blur', $event)"
  >
    <template
      v-for="(slotName) in Object.keys($slots)"
      #[slotName]
    >
      <slot :name="(slotName as keyof ComInputSlots)" />
    </template>
  </ElInput>
</template>
