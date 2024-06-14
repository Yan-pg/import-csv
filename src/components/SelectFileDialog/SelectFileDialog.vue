<template>
  <Dialog :isOpen="visible" @close="onClose">
    <Dropzone
      :class="[loading && 'hidden']"
      @getCsvData="onDropzoneChange"
      @startLoading="startLoading"
      @onProgress="onProgress"
      @getFileName="getFileName"
    />

    <div :class="[!loading && 'hidden']">
      <FileLoader
        :fileName="fileNameValue"
        :percent="progressValue"
        @cancel="stopLoading"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useLoading } from "../../compositions";
import Dialog from "../Dialog/Dialog.vue";
import Dropzone, { CSVData } from "../Dropzone/Dropzone.vue";
import FileLoader from "../FileLoader/FileLoader.vue";

interface SelectFileDialogProps {
  visible: boolean;
}

defineProps<SelectFileDialogProps>();

const { loading, startLoading, stopLoading } = useLoading();
const emits = defineEmits<{
  (e: "onClose"): void;
  (e: "onDropzoneChange", data: CSVData): void;
}>();
const progressValue = ref(0);
const fileNameValue = ref("");

function onClose() {
  stopLoading();
  emits("onClose");
}

function onDropzoneChange(event: CSVData) {
  emits("onDropzoneChange", event);
  stopLoading();
  onClose();
}

function onProgress(progress: number) {
  progressValue.value = progress;
}

function getFileName(fileName: string) {
  fileNameValue.value = fileName;
}
</script>
