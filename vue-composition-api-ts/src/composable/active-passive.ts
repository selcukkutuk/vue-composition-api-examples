import { ref, Ref } from "@vue/composition-api";

export function useActivePassive(def: boolean = true): any {
  const state: Ref<boolean> = ref<boolean>(def);
  function toggleState(): void {
    state.value = !state.value;
  }
  return { state, toggleState };
}
