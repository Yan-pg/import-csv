<template>
  <div class="relative cursor-pointer group">
    <input
      type="file"
      class="absolute opacity-0 top-2 bottom-2 left-2 right-2 cursor-pointer"
      :accept="ACCEPTED_FORMATS.join(', ')"
      @change="onFilesChange"
      @drag="onDrag"
      @dragenter="onDragEnter"
      @dragleave="onDragLeave"
    />

    <div
      :class="[
        'border border-dashed border-light-mode-black-600 rounded-2xl h-48',
        isDragActive
          ? 'border-blue-primary bg-gray-100'
          : 'border-light-mode-black-600',
      ]"
    >
      <div
        v-if="!isDragActive"
        :class="['flex items-center justify-center flex-col gap-4 py-9']"
      >
        <p>Arraste um arquivo CSV, XLSX até aqui</p>
        <p>Ou se preferir</p>

        <div
          class="border-2 border-blue-primary px-4 py-1 rounded-2xl text-blue-primary font-bold"
        >
          selecione um arquivo do seu dispositivo
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface InputFileEvent extends Event {
  target: HTMLInputElement;
}

export interface CSVData {
  headers: string[];
  data: Record<string, string>[];
}

const ACCEPTED_FORMATS = ["text/csv"];
const emit = defineEmits<{
  (e: "getCsvData", csvData: CSVData): void;
  (e: "getFileName", fileName: string): void;
  (e: "startLoading", loading: boolean): void;
  (e: "onProgress", progress: number): void;
}>();

const isDragActive = ref(false);

function onLoad(e: ProgressEvent<FileReader>) {
  const content = e.target?.result as string;
  const lines = content.split("\n").filter((line) => line);

  const headers = lines[0].split(",");

  const regex = new RegExp(`\\s*(")?(.*?)\\1\\s*(?:,|$)`, "gs");

  const match = (line) =>
    [...line.matchAll(regex)].map((m) => m[2]).slice(0, -1);

  const data = lines.slice(1).map((line) => {
    const values = match(line);

    return headers.reduce((acc, header, index) => {
      acc[header] = values[index];

      return { ...acc, id: Math.random().toString(36).substr(2, 9) };
    }, {} as Record<string, string>);
  });

  emit("getCsvData", { headers, data });
}

function onProgress(e: ProgressEvent<FileReader>) {
  const progress = Math.round((e.loaded / e.total) * 100);
  emit("onProgress", progress);
}

function onFilesChange(event: InputFileEvent) {
  emit("startLoading", true);
  try {
    const file = event?.target?.files?.[0];

    if (!file) return null;

    if (!ACCEPTED_FORMATS.includes(file.type)) {
      // I would want to show a toast here :( (I'll implement in another time)
      alert("Formato de arquivo inválido");
      return null;
    }

    const reader = new FileReader();

    reader.readAsText(file);
    reader.onprogress = onProgress;
    reader.onload = onLoad;

    emit("getFileName", file.name);
  } catch (error) {
    console.error(error);
    alert("Ocorreu um erro ao tentar ler o arquivo");
  } finally {
    isDragActive.value = false;
  }
}

function onDrag(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();
  isDragActive.value = false;
}

function onDragEnter(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();
  isDragActive.value = true;
}

function onDragLeave(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();
  isDragActive.value = false;
}
</script>

<style scoped></style>
