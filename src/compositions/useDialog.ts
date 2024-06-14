import { Ref, ref } from "vue";

export function useDialog(): {
  isOpen: Ref<boolean>;
  openDialog: () => void;
  closeDialog: () => void;
} {
  const isOpen = ref(false);

  function openDialog() {
    isOpen.value = true;
  }

  function closeDialog() {
    isOpen.value = false;
  }
  return { isOpen, openDialog, closeDialog };
}
