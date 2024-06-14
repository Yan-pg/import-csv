<template>
  <AgGridVue
    :rowData="rowData"
    :columnDefs="colDefs"
    style="height: 600px"
    class="ag-theme-quartz"
    rowSelection="multiple"
    @grid-ready="getGridApi"
    @selectionChanged="onSelectionChanged"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { GridApi } from "@ag-grid-community/core";

defineProps<{ rowData: any[]; colDefs: any[] }>();
const emit = defineEmits<{
  (e: "getGridApi", gridApi: GridApi): void;
  (e: "onSelectionChanged", selectedRows: any[]): void;
}>();

const gridApi = ref<GridApi>({} as GridApi);

function getGridApi(params: any) {
  gridApi.value = params.api;

  emit("getGridApi", params.api);
}

function onSelectionChanged(event) {
  const selectedRows = gridApi.value.getSelectedNodes();
  emit("onSelectionChanged", selectedRows);
}
</script>
