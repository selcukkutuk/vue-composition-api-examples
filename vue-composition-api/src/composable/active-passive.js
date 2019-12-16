import { ref } from '@vue/composition-api'

export function useActivePassive(def = true) {
  const state = ref(def)
  const toggleState = () => {
    state.value = !state.value
  }
  return { state, toggleState }
}
