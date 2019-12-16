import { ref, onMounted, onUnmounted, Ref } from "@vue/composition-api";

export function useActivityTracker(): any {
  let intervalIdleTime: number;
  const idleTime: Ref<number> = ref(0);
  const activityEvents: string[] = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];
  function activity(): void {
    idleTime.value = 0;
  }
  intervalIdleTime = setInterval(() => idleTime.value++, 1000);
  onMounted(() => {
    activityEvents.forEach(eventName => {
      document.addEventListener(eventName, activity, true);
    });
  });
  onUnmounted(() => {
    activityEvents.forEach(eventName => {
      document.removeEventListener(eventName, activity, true);
    });
    clearInterval(intervalIdleTime);
  });
  return {
    idleTime
  };
}
