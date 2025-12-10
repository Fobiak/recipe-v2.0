import type { InputProps } from 'element-plus'
import type { VNode } from 'vue'

export interface ComInputProps extends /** @vue-ignore */ Partial<InputProps> {
  modelValue?: string | null
}
export interface ComInputEmits {
  (event: 'blur', value: FocusEvent): void
  (event: 'focus', value: FocusEvent): void
  (event: 'input', value: string): void
  (event: 'change', value: string): void
  (event: 'clear'): void
  (event: 'debounce', value: string): void
}

export interface ComInputSlots {
  prefix?: () => VNode[]
  suffix?: () => VNode[]
  prepand?: () => VNode[]
  append?: () => VNode[]
}
