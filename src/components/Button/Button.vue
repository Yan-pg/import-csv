<template>
  <button
    :class="[
      'w-full h-6 rounded-2xl border border-dark-primary text-xs',
      'flex items-center justify-center gap-2',
      'hover:bg-slate-200 transition-all duration-200',
      'font-normal text-dark-secondary px-2',
    ]"
    @click="onClick"
  >
    <slot v-if="$slots.startIcon" name="startIcon" />
    <slot />
  </button>
</template>

<script setup>
const emit = defineEmits(["click"]);

function onClick() {
  emit("click");
}
</script>

<style scoped></style>
