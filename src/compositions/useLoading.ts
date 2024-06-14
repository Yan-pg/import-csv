import { ref } from "vue";

export function useLoading(): {
  loading: ReturnType<typeof ref>;
  startLoading: () => void;
  stopLoading: () => void;
} {
  const loading = ref(false);

  function startLoading() {
    loading.value = true;
  }

  function stopLoading() {
    loading.value = false;
  }

  return {
    loading,
    startLoading,
    stopLoading,
  };
}
