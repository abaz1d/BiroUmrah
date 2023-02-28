<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Dashboard</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button class="btn btn-primary shadow-md mb-3 mr-2 pr-5">
        <PlusIcon class="w-4 h-4 mr-2" />
        <p class="hidden xl:block mr-1">Data</p>
        Baru
      </button>

      <a href="" class="ml-auto sm:ml-0 btn px-2 h-10 box flex items-center text-primary">
        <RefreshCcwIcon class="w-4 h-4 sm:mr-3 sm:m-0 m-2" />
        <p class="sm:block hidden">Reload Data</p>
      </a>
    </div>
  </div>
  <div class="grid grid-cols-12 gap-6">
    <div class="col-span-12 2xl:col-span-9">
      <div class="intro-y box p-5 mt-5">
        <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
          <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
            <div class="sm:flex items-center sm:mr-4">
              <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Field</label>
              <select id="tabulator-html-filter-field" v-model="filter.field"
                class="form-select w-full 2xl:w-full mt-2 sm:mt-0 sm:w-auto">
                <option value="id_user">ID User</option>
                <option value="username">Username</option>
                <option value="role">Role</option>
                <option value="nama_region">Region</option>
                <option value="email_user">Email</option>
                <option value="password">Password</option>
              </select>
            </div>
            <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
              <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Type</label>
              <select id="tabulator-html-filter-type" v-model="filter.type"
                class="form-select w-full mt-2 sm:mt-0 sm:w-auto">
                <option value="like" selected>like</option>
                <option value="=">=</option>
                <option value="<">&lt;</option>
                <option value="<=">&lt;=</option>
                <option value=">">></option>
                <option value=">=">>=</option>
                <option value="!=">!=</option>
              </select>
            </div>
            <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
              <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2">Value</label>
              <input id="tabulator-html-filter-value" v-model="filter.value" type="text"
                class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0" placeholder="Search..." />
            </div>
            <div class="mt-2 xl:mt-0">
              <button id="tabulator-html-filter-go" type="button" class="btn btn-primary w-full sm:w-16"
                @click="onFilter">
                Go
              </button>
              <button id="tabulator-html-filter-reset" type="button"
                class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1" @click="onResetFilter">
                Reset
              </button>
            </div>
          </form>
          <div class="flex mt-5 sm:mt-0">
            <button id="tabulator-print" class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2" @click="onPrint">
              <PrinterIcon class="w-4 h-4 mr-2" /> Print
            </button>
            <Dropdown class="w-1/2 sm:w-auto">
              <DropdownToggle class="btn btn-outline-secondary w-full sm:w-auto">
                <FileTextIcon class="w-4 h-4 mr-2" /> Export
                <ChevronDownIcon class="w-4 h-4 ml-auto sm:ml-2" />
              </DropdownToggle>
              <DropdownMenu class="w-40">
                <DropdownContent>
                  <DropdownItem @click="onExportCsv">
                    <FileTextIcon class="w-4 h-4 mr-2" /> Export CSV
                  </DropdownItem>
                  <DropdownItem @click="onExportXlsx">
                    <FileTextIcon class="w-4 h-4 mr-2" /> Export XLSX
                  </DropdownItem>
                </DropdownContent>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div class="overflow-x-auto scrollbar-hidden">
          <div id="tabulator" ref="tableRef" class="mt-5 table-report table-report--tabulator"></div>
        </div>
      </div>
    </div>
    <div class="col-span-12 2xl:col-span-3">
      <ChildList v-if="Dashboard.items2.length !== 0" v-for="detail in Dashboard.items2" :key="detail.noid_produk"
        :detail="detail" @openModalRemove="openModalRemove" @updateTotalAnggota="openupdateTotalAnggota" :data="data" />
    </div>
  </div>
  <div v-show="isLoading" wire:loading
    class="fixed top-0 left-0 right-0 bottom-0 w-full h-[50vw] z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center">
    <Loader2Icon class="motion-safe:animate-spin stroke-[10px] text-white h-12 w-12 mb-4" />
    <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
    <p class="w-1/3 text-center text-white">
      Ini mungkin memakan waktu beberapa detik, tolong jangan tutup halaman
      ini.
    </p>
  </div>
  <!-- BEGIN: Delete Confirmation Modal -->
  <Modal :show="deleteConfirmationModal" @hidden="deleteConfirmationModal = false">
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <TrashIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div v-if="data_utama" class="text-xl mt-5">
          Apakah Anda yakin akan menghapus Region
          <b> {{ itemDel.id_region }} - {{ itemDel.nama_region }} </b> ? <br>
          <small>Jika anda Menghapus Region ini, Anda juga akan menghapus detail tiap bulanya</small> <br>
          <small>{{ itemDel.id_utama }}</small>
        </div>

        <div v-else class="text-xl mt-5">
          Apakah Anda yakin akan menghapus Data Bulan <b> {{ moment(itemDel.periode_bulanan).format("MMM, YYYY") }} - {{
            itemDel.id_region
          }}</b> ? <br>
          <small>{{ itemDel.noid_produk }}</small>
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button type="button" @click="resetModal" class="btn btn-outline-secondary w-24 mr-1">
          Cancel
        </button>
        <button type="button" class="btn btn-danger w-24" @click="
          data_utama ?
            removeData(itemDel.id_utama)
            : removeItem(itemDel.noid_produk)
        ">
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: Delete Confirmation Modal -->
  <!-- <Modal backdrop="static" size="modal-xl" :show="ModalData" @hidden="ModalData = false">
    <ModalHeader>
      <h2 v-if="isEdit" class="font-medium text-base mr-auto">Edit Data {{ more_edit }}</h2>
      <h2 v-else class="font-medium text-base mr-auto">Tambah Data</h2>
    </ModalHeader>
    <ModalBody>
      <form @submit.prevent="!isEdit ? addData() : updateData()" id="DataForm">
        <div class="text-slate-600 dark:text-slate-500 leading-relaxed text-center px-5">
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/4">
              <label
                class="block text-center sm:text-left text-gray-600 dark:text-white font-bold md:text-left mb-1 md:mb-0 sm:pr-4"
                for="inline-full-name">
                Kota / Kabupaten
              </label>
            </div>
            <div class="md:w-3/4">
              <input type="text" placeholder="Nama Kota/ kabupaten" v-model="input_kota_kabupaten" disabled
                class="w-full sm:pl-3 sm:text-left text-center text-sm border-0 border-b-2 border-gray-400 rounded-md dark:border-white dark:text-black outline-none focus:border-blue-400" />
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/4">
              <label
                class="block text-center sm:text-left text-gray-600 dark:text-white font-bold md:text-left mb-1 md:mb-0 sm:pr-4"
                for="inline-password">
                Alamat Sekretariatan
              </label>
            </div>
            <div class="md:w-3/4">
              <textarea type="text" placeholder="Alamat Sekretariatan" v-model="input_alamat"
                class="w-full sm:pl-3 sm:text-left text-center text-sm border-0 border-b-2 border-gray-400 rounded-md dark:border-white dark:text-black outline-none focus:border-blue-400"></textarea>
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/4">
              <label
                class="block text-center sm:text-left text-gray-600 dark:text-white font-bold md:text-left mb-1 md:mb-0 sm:pr-4"
                for="inline-full-name">
                No Telepon / WA
              </label>
            </div>
            <div class="md:w-3/4">
              <input type="text" placeholder="No Telepon / WA" v-model="input_nomer"
                class="w-full sm:pl-3 sm:text-left text-center text-sm border-0 border-b-2 border-gray-400 rounded-md dark:border-white dark:text-black outline-none focus:border-blue-400" />
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/4">
              <label
                class="block text-center sm:text-left text-gray-600 dark:text-white font-bold md:text-left mb-1 md:mb-0 sm:pr-4"
                for="inline-full-name">
                Masa Kepengurusan
              </label>
            </div>
            <div class="md:w-3/4">
              <Litepicker v-model="start_jabatan" :options="{
                autoApply: true,
                dropdowns: {
                  minYear: new Date(Date.now()).getFullYear() - 10,
                  maxYear: new Date(Date.now()).getFullYear() + 10,
                  months: true,
                  years: true,
                },
              }"
                class="w-1/3 sm:pl-3 sm:text-left text-center text-sm border-0 border-b-2 border-gray-400 rounded-md dark:border-white dark:text-black outline-none focus:border-blue-400" />
              <p class="w-1/3 mx-auto inline-block">s.d.</p>
              <Litepicker v-model="end_jabatan" :options="{
                autoApply: true,
                dropdowns: {
                  minYear: new Date(Date.now()).getFullYear() - 10,
                  maxYear: new Date(Date.now()).getFullYear() + 10,
                  months: true,
                  years: true,
                },
              }"
                class="w-1/3 sm:pl-3 sm:text-left text-center text-sm border-0 border-b-2 border-gray-400 rounded-md dark:border-white dark:text-black outline-none focus:border-blue-400" />
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/4">
              <label
                class="block text-center sm:text-left text-gray-600 dark:text-white font-bold md:text-left mb-1 md:mb-0 sm:pr-4"
                for="inline-full-name">
                Foto Kantor & Plang Nama
              </label>
            </div>
            <div class="md:w-3/4">
              <div
                class="w-full sm:p-3 py-1 sm:text-left text-center text-sm border-0 border-b-2 border-gray-400 rounded-md dark:border-white dark:text-white  outline-none focus:border-blue-400">
                <Dropzone ref-key="dropzoneMultipleRef" :options="{
                  url: 'https://httpbin.org/post',
                  acceptedFiles: 'image/*',
                  thumbnailWidth: 150,
                  maxFilesize: 1.5,
                  maxFiles: 3,
                  addRemoveLinks: true,
                  headers: { 'Access-Control-Allow-Headers': 'Authorization, Content-Type, Accept, X-Mashape-Authorization' },
                }" class="dropzone">
                  <UploadIcon class="w-10 h-10 mx-auto -mt-8" />
                  <div class="text-lg font-medium">
                    Drop files here or click to upload.
                  </div>
                  <div class="text-gray-600 dark:text-white -mb-8">
                    Maks 3 Foto, Urutan File, Mulai dari kiri <br>
                    <span class="font-medium">Tampak Depan, Tampak Belakang, Plang Nama</span>.
                  </div>
                </Dropzone>
                <small v-if="isEdit">* Untuk Merubah Foto, HAPUS SEMUA Foto Lama terlebih dahulu</small>
              </div>
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/4">
              <label
                class="block text-center sm:text-left text-gray-600 dark:text-white font-bold md:text-left mb-1 md:mb-0 sm:pr-4"
                for="inline-full-name">
                Softfile SK
              </label>
            </div>
            <div class="relative md:w-3/4">
              <div
                class="w-full sm:p-3 py-1 sm:text-left text-center text-sm border-0 border-b-2 border-gray-400 rounded-md dark:border-white dark:text-white  outline-none focus:border-blue-400">
                <Dropzone ref-key="dropzoneSingleRef" :options="{
                  url: 'https://httpbin.org/post',
                  acceptedFiles: 'application/pdf',
                  thumbnailWidth: 150,
                  addRemoveLinks: true,
                  maxFilesize: 1.5,
                  maxFiles: 1,
                  headers: { 'Access-Control-Allow-Headers': 'Authorization, Content-Type, Accept, X-Mashape-Authorization' },
                }" class="dropzone">
                  <UploadIcon class="w-10 h-10 mx-auto -mt-8" />
                  <div class="text-lg font-medium">
                    Drop files here or click to upload.
                  </div>
                  <div class="text-gray-600 dark:text-white -mb-10">
                    <span class="font-medium">File PDF</span>.
                  </div>
                </Dropzone>
                <small v-if="isEdit">* Untuk Merubah File, HAPUS File terlebih dahulu</small>
              </div>
            </div>
          </div>
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/4">
              <label
                class="block text-center sm:text-left text-gray-600 dark:text-white font-bold md:text-left mb-1 md:mb-0 sm:pr-4"
                for="inline-full-name">
                Akun Media Sosial
              </label>
            </div>
            <div class="relative md:w-1/4">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LinkIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input v-model="input_web"
                class="w-full pl-10 text-left py-2 text-sm border-0 border-b-2 border-gray-400 rounded-md dark:border-white dark:text-black outline-none focus:border-blue-400"
                type="text" placeholder="Alamat Website" />
            </div>
            <div class="relative md:w-1/4">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FacebookIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input v-model="input_fb"
                class="w-full pl-10 text-left py-2 text-sm border-0 border-b-2 border-gray-400 rounded-md dark:border-white dark:text-black outline-none focus:border-blue-400"
                type="text" placeholder="Nama Akun Facebook" />
            </div>
            <div class="relative md:w-1/4">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <InstagramIcon class="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </div>
              <input v-model="input_ig"
                class="w-full pl-10 text-left py-2 text-sm border-0 border-b-2 border-gray-400 rounded-md dark:border-white dark:text-black outline-none focus:border-blue-400"
                type="text" placeholder="Nama Akun Instagram" />
            </div>
          </div>
        </div>
      </form>
    </ModalBody>
    <ModalFooter class="text-right">
      <button type="button" @click="resetModal()" class="btn btn-outline-secondary w-32 mr-1">
        Cancel
      </button>
      <button type="submit" form="DataForm" class="btn btn-primary w-32">
        Simpan
      </button>
    </ModalFooter>
  </Modal> -->

  <Modal backdrop="static" size="modal-md" :show="ModalDetail" @hidden="ModalDetail = false">
    <ModalHeader>
      <h2 v-if="isEdit" class="font-medium text-base mr-auto">Edit Detail {{
        moment(more_edit.periode_bulanan).format("MMM, YYYY")
      }} - {{ more_edit.id_region }}</h2>
      <h2 v-else class="font-medium text-base mr-auto">Tambah Detail</h2>
    </ModalHeader>
    <ModalBody class="">
      <form @submit.prevent="!isEdit ? addDetail() : updateDetail()" id="DetailForm">
        <label for="date-picker" class="form-label">Bulan / Waktu</label>
        <div id="date-picker" class="relative w-full mx-auto mb-5">
          <div
            class="absolute rounded-l w-10 h-full flex items-center justify-center bg-slate-100 border text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400">
            <CalendarIcon class="w-4 h-4" />
          </div>
          <Litepicker v-model="date_bulanan" ref-key="monthDetailSelect2" :options="{
            autoApply: true,
            showWeekNumbers: true,
            dropdowns: {
              minYear: new Date(Date.now()).getFullYear() - 10,
              maxYear: null,
              months: true,
              years: true,
            },
          }" class="form-control pl-12" />
        </div>
        <label for="regular-form-1" class="form-label">Total Anggota</label>
        <input v-model="anggota_bulanan" id="regular-form-1" type="number" class="form-control"
          placeholder="Jumlah Total Anggota" />
      </form>
    </ModalBody>
    <ModalFooter class="text-right">
      <button type="button" @click="resetModal()" class="btn btn-outline-secondary w-32 mr-1">
        Cancel
      </button>
      <button type="submit" form="DetailForm" class="btn btn-primary w-32">
        Simpan
      </button>
    </ModalFooter>
  </Modal>

  <ModalDatabaseError ref="modalErrorRef" />
</template>

<script setup>
import DataList from "./DataList.vue"
import ChildList from "./ChildList.vue"
import $ from "jquery";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import ModalDatabaseError from "@/components/modal-error/Main.vue";
import { createIcons, icons } from "lucide";
import dom from "@left4code/tw-starter/dist/js/dom";
import { useDashboardStore } from "@/stores/dashboard";
import { ref, provide, onMounted, watch, reactive } from "vue";
import moment from "moment";
import { useAuthStore } from "@/stores/auth";
const Auth = useAuthStore();
const isLoading = ref(false);
const tableRef = ref();
const tabulator = ref();
const filter = reactive({
  field: "noid_produk",
  type: "like",
  value: "",
});
var subTable

const ModalData = ref(false);
const ModalDetail = ref(false);
const isEdit = ref(false);
const data_utama = ref(false);
const deleteConfirmationModal = ref(false);
const publicPath = import.meta.env.VITE_APP_BASE_API;
const Dashboard = useDashboardStore();
const dropzoneMultipleRef = ref();
const dropzoneSingleRef = ref();
const monthDetailSelect = ref();
const monthDetailSelect2 = ref();

const modalErrorRef = ref();
const date_select = ref(moment(new Date().setDate(1)).format("D MMM, YYYY"));
const data = ref([]);
const data_select = ref(localStorage.getItem("data_region") ? localStorage.getItem("data_region") : "JTG-01")

const date_bulanan = ref(moment(new Date().setDate(1)).format("D MMM, YYYY"));
const anggota_bulanan = ref()
const more_edit = ref("")
const itemDel = ref("")
const id_utama = ref("")
const input_kota_kabupaten = ref("")
const input_alamat = ref("")
const input_nomer = ref("")
const file_upload = ref([])
const start_jabatan = ref("")
const end_jabatan = ref("")
const sk_file = ref()
const input_web = ref("")
const input_fb = ref("")
const input_ig = ref("")

const resetModal = () => {
  isLoading.value = false;
  ModalData.value = false;
  ModalDetail.value = false;
  isEdit.value = false;
  data_utama.value = false;
  deleteConfirmationModal.value = false;
  date_select.value = moment(new Date().setDate(1)).format("D MMM, YYYY");

  date_bulanan.value = moment(new Date().setDate(1)).format("D MMM, YYYY");
  anggota_bulanan.value = 0
  more_edit.value = ""
  itemDel.value = ""

  id_utama.value = ""
  input_kota_kabupaten.value = ""
  input_alamat.value = ""
  input_nomer.value = ""
  file_upload.value = []
  start_jabatan.value = ""
  end_jabatan.value = ""
  sk_file.value = ""
  input_web.value = ""
  input_fb.value = ""
  input_ig.value = ""
}
watch(data_select, async (e) => {
  Dashboard.getData(e, date_select.value)
  localStorage.setItem("data_region", e);
});

watch(date_select, async (e) => {
  Dashboard.getDetail(e, Dashboard.items[0].id_utama)
});

const openDataModal = () => {
  if (Dashboard.items.length == 0) {
    input_kota_kabupaten.value = data_select.value
    ModalData.value = true;
  } else {
    alert("Data Utama Telah dibuat Hapus untuk membuat ulang")
  }
}
const addData = () => {
  Dashboard.addData(input_kota_kabupaten.value,
    input_alamat.value,
    input_nomer.value,
    file_upload.value[0],
    file_upload.value[1],
    file_upload.value[2],
    sk_file.value,
    moment(new Date(start_jabatan.value)).format("YYYY-MM-DD"),
    moment(new Date(end_jabatan.value)).format("YYYY-MM-DD"),
    input_web.value,
    input_fb.value,
    input_ig.value,
  );
  resetModal();
}
const getUrl = (data) => {
  if (data) {
    var images = data.data.map((b) => String.fromCharCode(b)).join("");
    return new URL(`${publicPath}gambar_kantor/${images}`).href;
  } else {
    return `${new URL(window.location.origin)}` + " 404.png";
  }
};
const getUrlSurat = (data) => {
  if (data) {
    var surat = data.data.map((b) => String.fromCharCode(b)).join("");
    return new URL(`${publicPath}file_sk/${surat}`).href;
  } else {
    return `${new URL(window.location.origin)}` + " 404.png";
  }
};

const initTabulator = () => {
  tabulator.value = new Tabulator(tableRef.value, {
    data: Dashboard.items,
    printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel Dashboard<h1>`,
    printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(
      Date.now()
    ).format("DD MMM YYYY HH:SS")}<h2>`,
    printAsHtml: true,
    printStyled: true,
    addRowPos: true,
    height: "60vh",
    height: "100%",
    pagination: "remote",
    paginationSize: 10,
    // paginationCounter:"pages",
    paginationSizeSelector: [10, 20, 30, 40, 50, 100],
    layout: "fitColumns",
    responsiveLayout: "collapse",
    placeholder: "Tida ada Data di temukan",
    columnDefaults: {
      resizable: true,
      tooltip: function (e, cell) {
        var el = document.createElement("div");
        el.style.backgroundColor = "white smoke";
        el.innerText = cell.getColumn().getField() + " - " + cell.getValue();
        return el;
      },
    },
    columns: [
      {
        formatter: "responsiveCollapse",
        width: 40,
        minWidth: 30,
        hozAlign: "center",
        resizable: false,
        headerSort: false,
      },

      // For HTML table
      {
        title: "ID",
        minWidth: 200,
        responsive: 0,
        field: "noid_produk",
        vertAlign: "middle",
        hozAlign: "left",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().noid_produk
            }</div>
              </div>`;
        },
      },
      {
        title: "PAKET",
        minWidth: 200,
        responsive: 0,
        field: "paket",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().paket
            }</div>
              </div>`;
        },
      },
      {
        title: "NAMA TRAVEL",
        minWidth: 200,
        responsive: 0,
        field: "nama_travel",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().nama_travel
            }</div>
              </div>`;
        },
      },
      {
        title: "JUMLAH",
        minWidth: 200,
        responsive: 0,
        field: "jumlah",
        headerHozAlign: "center",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().jumlah
            }</div>
              </div>`;
        },
      },
      {
        title: "MUTOWIF",
        minWidth: 200,
        responsive: 0,
        field: "mutowif",
        headerHozAlign: "center",
        vertAlign: "middle",
        hozAlign: "center",
        print: false,
        download: false,
        formatter(cell) {
          return `<div>
                <div class="font-medium whitespace-nowrap">${cell.getData().mutowif
            }</div>
              </div>`;
        },
      },
      {
        title: "ACTIONS",
        headerHozAlign: "center",
        minWidth: 200,
        field: "actions",
        responsive: 1,
        hozAlign: "center",
        vertAlign: "middle",
        print: false,
        download: false,
        formatter(cell) {
          const a = dom(`<div class="flex lg:justify-center items-center">
                <a id="edit" class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                </a>
                <a id="delete" class="flex items-center text-danger" href="javascript:;">
                  <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
                </a>
              </div>`);
          dom(a).on("click", "a", function (e) {
            if (e.id === "edit") {
              const barang = cell.getData();
              inputIdDashboard.value = barang.noid_produk;
              inputNamaDashboard.value = barang.nama_travel;
              isEdit.value = true;
              modalDashboard.value = true;
            } else {
              inputIdDashboard.value = cell.getData().noid_produk;
              inputNamaDashboard.value = cell.getData().nama_travel;
              deleteConfirmationModal.value = true;
            }
          });

          return a[0];
        },
      },

      // For print format
      {
        title: "ID",
        field: "noid_produk",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "NAMA PAKET",
        field: "paket",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "NAMA TRAVEL",
        field: "nama_travel",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "JUMLAH",
        field: "jumlah",
        visible: false,
        print: true,
        download: true,
      },
      {
        title: "MUTOWIF",
        field: "mutowif",
        visible: false,
        print: true,
        download: true,
      },
    ]
  });
  tabulator.value.on("renderComplete", function () {
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });

  tabulator.value.on("cellClick", function (e, row) {
    console.log("cellClick", row);
    const data = row.getData();
    Dashboard.getDetail(data)
  });
};
const updateData = () => {
  Dashboard.updateData(id_utama.value, input_kota_kabupaten.value,
    input_alamat.value,
    input_nomer.value,
    file_upload.value,
    sk_file.value,
    moment(new Date(start_jabatan.value)).format("YYYY-MM-DD"),
    moment(new Date(end_jabatan.value)).format("YYYY-MM-DD"),
    input_web.value,
    input_fb.value,
    input_ig.value,
  );
  resetModal();
}

const openModalRemoveData = (item) => {
  itemDel.value = item;
  data_utama.value = true;
  deleteConfirmationModal.value = true;
};
const removeData = (e) => {
  Dashboard.removeData(e)
  resetModal();
}
//----------------------------------------------------------------
const openDetailModal = () => {
  ModalDetail.value = true;
}
const addDetail = () => {
  Dashboard.addDetail(moment(new Date(date_bulanan.value)).format("YYYY-MM-DD"), anggota_bulanan.value, Dashboard.items[0].id_utama)
    .then((data) => {
      resetModal();
      date_select.value = moment(data).format("D MMM, YYYY")
    }).catch((e) => {
      alert("Add Detail Error: " + e);
    });
}

const openupdateTotalAnggota = (detail) => {
  more_edit.value = detail
  date_bulanan.value = moment(new Date(detail.periode_bulanan).setDate(1)).format("D MMM, YYYY")
  anggota_bulanan.value = detail.jumlah_anggota
  isEdit.value = true;
  ModalDetail.value = true;
};
const updateDetail = () => {
  Dashboard.updateDetail(moment(new Date(date_bulanan.value)).format("YYYY-MM-DD"), anggota_bulanan.value)
    .then((data) => {
      resetModal();
      date_select.value = moment(data).format("D MMM, YYYY")
    }).catch((e) => {
      alert("Add Detail Error: " + e);
    });
}

const openModalRemove = (detail) => {
  itemDel.value = detail;
  deleteConfirmationModal.value = true;
};
const removeItem = (e) => {
  Dashboard.removeDetail(e);
  resetModal();
}

// Redraw table onresize
const reInitOnResizeWindow = () => {
  window.addEventListener("resize", () => {
    tabulator.value.redraw();
    createIcons({
      icons,
      "stroke-width": 1.5,
      nameAttr: "data-lucide",
    });
  });
};

// Filter function
const onFilter = () => {
  tabulator.value.setFilter(filter.field, filter.type, filter.value);
};

// On reset filter
const onResetFilter = () => {
  filter.field = "noid_produk";
  filter.type = "like";
  filter.value = "";
  onFilter();
};

// Export
const onExportCsv = () => {
  tabulator.value.download("csv", "data.csv");
};

const onExportXlsx = () => {
  const win = window;
  win.XLSX = xlsx;
  tabulator.value.download("xlsx", "data.xlsx", {
    sheetName: "Products",
  });
};
// Print
const onPrint = () => {
  tabulator.value.print();
};

onMounted(async function () {


  try {
    isLoading.value = true;
    data.value = await Dashboard.readItem(date_select.value, data_select.value);
    initTabulator();
    reInitOnResizeWindow();
    isLoading.value = false;
  } catch (error) {
    console.error(error);
    isLoading.value = false;
    modalErrorRef.value.errorDatabaseModal = true;
  }
});

</script>
