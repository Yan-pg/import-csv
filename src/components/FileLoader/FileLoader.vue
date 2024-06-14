<template>
  <div class="flex items-center justify-between mt-2">
    <div class="flex items-center gap-2">
      <PhFileCsv size="20" weight="bold" />
      <p class="text-sm truncate max-w-40">{{ fileName }}</p>
    </div>
    <Button class="max-w-40">Selecione outro arquivo</Button>
  </div>

  <div class="mt-5">
    <div class="w-full bg-background h-2 rounded-2xl relative">
      <div
        :style="{ width: `${percent}%` }"
        :class="[
          'bg-blue-primary absolute z-20 h-2',
          'rounded-2xl transition-all duration-700 ease-in-out',
        ]"
      ></div>
    </div>

    <p class="text-sm mt-1">
      Envio do Arquivo: <strong>{{ percent }}%</strong>
    </p>

    <div class="flex justify-end mt-5">
      <Button class="max-w-28" @click="cancel">Cancelar</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PhFileCsv } from "@phosphor-icons/vue";
import Button from "../Button/Button.vue";

defineProps<{ fileName: string; percent: number }>();

const emit = defineEmits<{
  (e: "cancel"): void;
}>();

function cancel() {
  emit("cancel");
}
</script>
