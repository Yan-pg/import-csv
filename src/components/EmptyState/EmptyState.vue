<template>
  <div
    :class="[
      'bg-white p-4 rounded-2xl w-full h-screen',
      'flex justify-center items-center shadow-2xl',
    ]"
  >
    <div class="flex flex-col items-center justify-center">
      <img src="/icon_table.svg" alt="icon_table" />

      <div class="text-center mt-10">
        <h2 class="font-bold">Sem tabelas importadas</h2>
        <span>Importe clicando no botão acima “importar csv” para começar</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dialog from "../Dialog/Dialog.vue";
</script>
