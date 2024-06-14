<template>
  <div class="fixed top-16 w-full max-w-sm px-4 z-[1000]">
    <Popover class="relative">
      <PopoverButton as="div" class="max-w-20">
        <slot name="trigger" />
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="absolute left-[150px] mt-3 w-[250px] -translate-x-36 transform px-4 sm:px-0 lg:max-w-3xl"
        >
          <div class="overflow-hidden rounded-lg shadow-lg bg-white p-4">
            <div class="flex flex-col gap-2">
              <button class="flex items-center gap-2" @click="toggleAll(false)">
                <PhCopy :size="18" />
                <span class="text-sm text-start">Mostrar todas as Colunas</span>
              </button>

              <button class="flex items-center gap-2" @click="toggleAll(true)">
                <PhCopy :size="18" />
                <span class="text-sm text-start"
                  >Esconder todas as Colunas</span
                >
              </button>
            </div>

            <hr class="mt-2" />

            <div class="mt-4 space-y-3">
              <div
                v-for="(_, index) in selectedRows"
                class="flex items-center justify-between gap-2"
              >
                <div class="flex items-center gap-2 -mt-3">
                  <PhCopy :size="18" />
                  <span class="text-sm">Coluna {{ index + 1 }}</span>
                </div>

                <Toggle :default="true" />
              </div>
            </div>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import { PhCopy } from "@phosphor-icons/vue";

import Toggle from "../Toggle/Toggle.vue";

defineProps<{
  selectedRows: any[];
}>();

const emit = defineEmits<{
  (e: "toggleAll", showAll: boolean): void;
}>();

function toggleAll(showAll: boolean) {
  emit("toggleAll", showAll);
}
</script>
