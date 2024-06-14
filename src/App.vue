<template>
  <header class="p-4 flex items-center gap-5">
    <span
      :class="[
        'text-blue-primary font-light',
        !isTableShow ? 'font-bold' : 'font-light',
      ]"
      >Início</span
    >
    <PhCaretRight v-if="isTableShow" :size="16" />
    <span v-if="isTableShow" class="text-blue-primary font-bold text-sm"
      >Detalhe do CSV</span
    >
  </header>

  <main class="p-4">
    <section v-if="!isTableShow" class="flex items-center justify-between">
      <h1 class="font-light text-lg">Seus Arquivos</h1>

      <Button class="max-w-32 w-fit" @click="openDialog">
        <template #startIcon>
          <PhPlus :size="12" weight="bold" />
        </template>
        Importar CSV
      </Button>
    </section>

    <section v-else class="flex items-center justify-between gap-5">
      <div>
        <Popover @toggleAll="toggleAll" :selected-rows="selectedRows">
          <template #trigger>
            <Button class="max-w-20 w-fit -mt-2">
              <template #startIcon>
                <PhColumns :size="12" weight="bold" />
              </template>
              Colunas
            </Button>
          </template>
        </Popover>
      </div>

      <div>
        <Button class="w-32 -mt-4" @click="downloadCSV">
          <template #startIcon>
            <PhPlus :size="12" weight="bold" />
          </template>
          Exportar CSV
        </Button>
      </div>
    </section>

    <section class="mt-5 h-full">
      <EmptyState v-if="!currentTableData.headers.length" />
      <Table
        v-if="isTableShow"
        :col-defs="tableData.headers"
        :row-data="tableData.data"
        @getGridApi="getGridApi"
        @on-selection-changed="onSelectionChanged"
      />
    </section>
  </main>

  <SelectFileDialog
    :visible="isOpen"
    @onClose="closeDialog()"
    @on-dropzone-change="onSelectedFile"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PhCaretRight, PhColumns, PhPlus } from "@phosphor-icons/vue";
import { ColDef, ColGroupDef, GridApi } from "@ag-grid-community/core";

import { useDialog } from "./compositions";
import Button from "./components/Button/Button.vue";
import Popover from "./components/Popover/Popover.vue";
import EmptyState from "./components/EmptyState/EmptyState.vue";
import SelectFileDialog from "./components/SelectFileDialog/SelectFileDialog.vue";
import Table from "./components/Table/Table.vue";
import { CSVData } from "./components/Dropzone/Dropzone.vue";

interface TableDataProps {
  headers: (ColGroupDef<any> | ColDef<any>)[];
  data: any[];
}

const { isOpen, closeDialog, openDialog } = useDialog();

const tableData = ref<TableDataProps>({
  headers: [],
  data: [],
});
const currentTableData = ref<TableDataProps>({
  headers: [],
  data: [],
});

const isTableShow = ref(false);
const gridApi = ref<GridApi>({} as GridApi);
const selectedRows = ref<any[]>([]);
const headerString = ref("");

function onSelectedFile(data: CSVData) {
  const headers: (ColGroupDef<any> | ColDef<any>)[] = data.headers.map(
    (header, index) => ({
      headerName: header,
      field: header,
      checkboxSelection: index === 0,
      showDisabledCheckboxes: index === 0,
      rowMultiSelectWithClick: true,
    })
  );

  currentTableData.value.headers = headers;
  currentTableData.value.data = data.data;
  headerString.value = data.headers.join(",");

  tableData.value.headers = headers;
  tableData.value.data = data.data;

  isTableShow.value = true;
}

function getGridApi(api: GridApi) {
  gridApi.value = api;
}

function toggleAll(showAll: boolean) {
  if (showAll) {
    tableData.value.headers = currentTableData.value.headers.map((header) => ({
      ...header,
      hide: true,
    }));
    return;
  }

  tableData.value.headers = currentTableData.value.headers.map((header) => ({
    ...header,
    hide: false,
  }));
}

function onSelectionChanged(rows: any[]) {
  selectedRows.value = rows;
}

function arrayToCSV(data: any[]) {
  const headers = data[0];

  const headerName = headers.map((header) => header.headerName).join(",");

  const rowData = data[1].map((row: any) => {
    return headers.map((header: any) => row[header.field]).join(",");
  });

  return [headerName, ...rowData].join("\n");
}

function downloadCSV() {
  if (!selectedRows.value.length) {
    alert("Selecione pelo menos uma linha para exportar");
    return;
  }

  const selectedData = arrayToCSV([
    currentTableData.value.headers,
    currentTableData.value.data,
  ]);

  const blob = new Blob([selectedData], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.setAttribute("href", url);
  link.setAttribute("download", "selected-data.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style scoped></style>
