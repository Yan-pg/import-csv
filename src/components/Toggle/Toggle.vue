<template>
  <div>
    <Switch
      v-model="enabled"
      :class="enabled ? 'bg-blue-primary' : 'bg-light-mode-black-600'"
      class="relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
    >
      <span class="sr-only">Use setting</span>
      <span
        aria-hidden="true"
        :class="
          enabled
            ? 'translate-x-4 bg-blue-secondary'
            : '-translate-x-1 bg-white'
        "
        class="pointer-events-none inline-block h-[28px] w-[28px] -mt-1.5 transform rounded-full shadow-lg ring-0 transition duration-200 ease-in-out"
      />
    </Switch>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Switch } from "@headlessui/vue";

const props = defineProps<{
  default: boolean;
}>();

const enabled = ref(props.default);
</script>
