<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-5">
    <h2 class="text-lg font-medium mr-auto">Jurnal Akuntansi</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button
        class="btn btn-primary shadow-md mb-3 mr-2 pr-5"
        @click="modal_utama = true"
        :disabled="auth.role != 'Admin'"
      >
        <PlusIcon class="w-4 h-4 mr-2" />
        Baru
      </button>
      <!-- BEGIN: Modal Content -->
      <a
        href="javascript:history.go(0)"
        class="ml-auto sm:ml-0 btn px-2 h-10 box flex items-center text-primary"
      >
        <RefreshCcwIcon class="w-4 h-4 sm:mr-3 sm:m-0 m-2" />
        <p class="sm:block hidden">Reload Data</p>
      </a>
    </div>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="intro-y box p-5 mt-2">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
            >Field</label
          >
          <select
            id="tabulator-html-filter-field"
            v-model="filter.field"
            class="form-select w-full 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
          >
            <option value="id_user">No Perkiraan</option>
            <option value="username">Nama Perkiraan</option>
            <option value="role">Role</option>
            <option value="nama_region">Region</option>
            <option value="email_user">Level Laporan</option>
            <option value="password">Password</option>
          </select>
        </div>
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
            >Type</label
          >
          <select
            id="tabulator-html-filter-type"
            v-model="filter.type"
            class="form-select w-full mt-2 sm:mt-0 sm:w-auto"
          >
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
          <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
            >Value</label
          >
          <input
            id="tabulator-html-filter-value"
            v-model="filter.value"
            type="text"
            class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
            placeholder="Search..."
          />
        </div>
        <div class="mt-2 xl:mt-0">
          <button
            id="tabulator-html-filter-go"
            type="button"
            class="btn btn-primary w-full sm:w-16"
            @click="onFilter"
          >
            Go
          </button>
          <button
            id="tabulator-html-filter-reset"
            type="button"
            class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1"
            @click="onResetFilter"
          >
            Reset
          </button>
        </div>
      </form>
      <div class="flex mt-5 sm:mt-0">
        <button
          id="tabulator-print"
          class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2"
          @click="onPrint"
        >
          <PrinterIcon class="w-4 h-4 mr-2" /> Print
        </button>
        <button
          id="tabulator-print"
          class="btn btn-outline-secondary w-1/2 sm:w-auto"
          @click="modal_bukuBesar = true"
        >
          <ShuffleIcon class="w-4 h-4 mr-2" /> Pind BK
        </button>
      </div>
    </div>
    <div
      v-show="isLoading"
      wire:loading
      class="fixed top-0 left-0 right-0 bottom-0 w-full h-[50vw] z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center"
    >
      <Loader2Icon
        class="motion-safe:animate-spin stroke-[10px] text-white h-12 w-12 mb-4"
      />
      <h2 class="text-center text-white text-xl font-semibold">Loading...</h2>
      <p class="w-1/3 text-center text-white">
        Ini mungkin memakan waktu beberapa detik, tolong jangan tutup halaman
        ini.
      </p>
    </div>
    <div class="overflow-auto">
      <div
        id="tabulator"
        ref="tableRef"
        class="mt-5 table-report table-report--tabulator sm:h-96"
      ></div>
    </div>
  </div>
  <Modal
    backdrop="static"
    :show="modal_bukuBesar"
    @hidden="modal_bukuBesar = false"
  >
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">
        <p>Overbooking</p>
      </h2>
    </ModalHeader>
    <ModalBody>
      <div class="p-4 border border-black relative mt-2 rounded-md">
        <h2 class="absolute -top-[10%] translate-y-1/2 bg-white">Simpanan</h2>
        <div class="w-full">
          <div class="md:flex md:items-center my-4">
            <div class="md:w-1/4">
              <label
                class="block md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                No Perkiraan
              </label>
            </div>
            <div class="md:w-3/4">
              <input
                id="pos-form-1"
                type="text"
                class="form-control flex-1"
                placeholder="Masukan No Perkiraan"
              />
            </div>
          </div>
          <div class="md:flex md:items-center my-4">
            <div class="md:w-1/4">
              <label
                class="block md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Nama
              </label>
            </div>
            <div class="md:w-3/4">
              <input
                id="pos-form-1"
                type="text"
                class="form-control flex-1"
                disabled
              />
            </div>
          </div>
          <div class="md:flex md:items-center my-4">
            <div class="md:w-1/4">
              <label
                class="block md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Jumlah
              </label>
            </div>
            <div class="md:w-3/4">
              <input
                id="pos-form-1"
                type="text"
                class="form-control flex-1"
                placeholder="Masukan Jumlah"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 border border-black relative mt-12 rounded-md">
        <h2 class="absolute -top-[30%] translate-y-1/2 bg-white">
          Overbooking
        </h2>
        <div class="w-full">
          <div class="md:flex md:items-center">
            <div class="md:w-1/4">
              <label
                class="block md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Tujuan
              </label>
            </div>
            <div class="md:w-3/4">
              <TomSelect class="w-full form-control flex-1" required>
                <option value="kosong" disabled>
                  --&gt; Pilih No Perkiraan &lt;--
                </option>
                <!-- <option
                  v-for="varian in Penjualan.varians"
                  :key="varian.id_varian"
                  :varian="varian"
                  :value="varian.id_varian"
                >
                  {{ varian.id_barang }} - {{ varian.nama_barang }} |
                  {{ varian.id_varian }} -
                  {{ varian.nama_varian }}
                </option> -->
              </TomSelect>
            </div>
          </div>
        </div>
      </div>
    </ModalBody>
    <ModalFooter class="text-right">
      <button
        type="button"
        @click="resetModal"
        class="btn btn-outline-secondary w-32 mr-1"
      >
        Cancel
      </button>
      <button type="submit" form="userForm" class="btn btn-primary w-32">
        Simpan
      </button>
    </ModalFooter>
  </Modal>

  <Modal
    backdrop="static"
    :show="modal_utama"
    size="modal-xl"
    @hidden="modal_utama = false"
  >
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto w-full">
        <p class="mx-auto" v-if="isEdit">Edit Jurnal Akuntansi {{ id_user }}</p>
        <p class="mx-auto" v-else>Tambah Jurnal Akuntansi</p>
      </h2>
    </ModalHeader>
    <ModalBody>
      <div class="flex flex-col sm:flex-row sm:items-end xl:items-start mb-2">
        <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto">
          <div class="sm:flex items-center sm:mr-4">
            <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
              >Field</label
            >
            <select
              id="tabulator-html-filter-field"
              v-model="filter.field"
              class="form-select w-full 2xl:w-full mt-2 sm:mt-0 sm:w-auto"
            >
              <option value="id_user">No Perkiraan</option>
              <option value="username">Nama Perkiraan</option>
              <option value="role">Role</option>
              <option value="nama_region">Region</option>
              <option value="email_user">Level Laporan</option>
              <option value="password">Password</option>
            </select>
          </div>
          <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
            <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
              >Type</label
            >
            <select
              id="tabulator-html-filter-type"
              v-model="filter.type"
              class="form-select w-full mt-2 sm:mt-0 sm:w-auto"
            >
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
            <label class="w-12 flex-none xl:w-auto xl:flex-initial mr-2"
              >Value</label
            >
            <input
              id="tabulator-html-filter-value"
              v-model="filter.value"
              type="text"
              class="form-control sm:w-40 2xl:w-full mt-2 sm:mt-0"
              placeholder="Search..."
            />
          </div>
          <div class="mt-2 xl:mt-0">
            <button
              id="tabulator-html-filter-reset"
              type="button"
              class="btn btn-secondary w-full sm:w-16 mt-2 sm:mt-0 sm:ml-1"
              @click="onResetFilter"
            >
              Reset
            </button>
          </div>
        </form>
        <div class="flex mt-5 sm:mt-0">
          <button
            id="tabulator-print"
            class="btn btn-outline-secondary w-1/2 sm:w-auto mr-2"
            @click="onPrint"
          >
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
      <form
        @submit.prevent="isEdit ? updateUser() : addUser()"
        id="userForm"
        class="grid grid-cols-2 gap-2 bg-green-200 rounded-lg dark:bg-transparent mb-3"
      >
        <div class="overflow-auto col-span-2 p-2">
          <div class="intro-y box">
            <div class="overflow-auto">
              <div
                id="tabulatorBukuBesar"
                ref="tableRefBukuBesar"
                class="mx-2 table-report table-report--tabulator sm:h-72"
              ></div>
            </div>
          </div>
        </div>
        <div class="col-start-2 mb-1 p-2 -mt-3">
          <div class="md:flex md:items-center">
            <div class="md:w-1/3">
              <label
                class="block md:text-right mb-1 md:mb-0 pr-4"
                for="inline-full-name"
              >
                Balance
              </label>
            </div>
            <div class="md:w-2/3">
              <input
                class="form-control flex-1"
                id="inline-full-name"
                type="number"
                placeholder="0"
                readonly
              />
            </div>
          </div>
        </div>
      </form>
      <div class="flex-1 mt-0">
        <div class="grid grid-cols-12 gap-x-2 sm:gap-x-3">
          <div class="hidden sm:block col-span-4 mb-5">
            <label for="pos-form-1" class="form-label">Tanggal</label>
            <input
              id="pos-form-1"
              type="text"
              class="form-control flex-1"
              placeholder="Masukan Tanggal"
              readonly
            />
          </div>
          <div class="sm:col-span-8 col-span-12 mb-5">
            <label for="pos-form-1" class="form-label">No. Perkiraan </label>
            <div class="flex w-full">
              <TomSelect class="w-full" required>
                <option value="kosong" disabled>
                  --&gt; Pilih No Perkiraan &lt;--
                </option>
                <!-- <option
                  v-for="varian in Penjualan.varians"
                  :key="varian.id_varian"
                  :varian="varian"
                  :value="varian.id_varian"
                >
                  {{ varian.id_barang }} - {{ varian.nama_barang }} |
                  {{ varian.id_varian }} -
                  {{ varian.nama_varian }}
                </option> -->
              </TomSelect>
            </div>
          </div>
          <div class="col-span-12 sm:col-span-6 mb-5">
            <label for="pos-form-1" class="form-label">Debet</label>
            <input
              id="pos-form-1"
              type="text"
              class="form-control flex-1"
              placeholder="Masukan Debet"
              required
            />
          </div>
          <div class="col-span-12 sm:col-span-6 mb-5">
            <label for="pos-form-1" class="form-label">Kredit</label>
            <input
              id="pos-form-1"
              type="text"
              class="form-control flex-1"
              placeholder="Masukan Kredit"
              required
            />
          </div>
          <div class="col-span-12 sm:col-span-6 sm:mb-0 mb-5">
            <label for="pos-form-1" class="form-label">Bukti</label>
            <input
              id="pos-form-1"
              type="text"
              class="form-control flex-1"
              placeholder="Masukan Bukti"
              required
            />
          </div>
          <div class="col-span-12 sm:col-span-6 mb-5 sm:-mb-5">
            <label for="pos-form-1" class="form-label">Keterangan</label>
            <textarea
              id="pos-form-1"
              type="text"
              class="form-control flex-1 h-20"
              placeholder="Masukan Keterangan"
              required
            ></textarea>
          </div>
        </div>
        <button type="button" class="btn btn-primary w-20">Tambah</button>
      </div>
    </ModalBody>
    <ModalFooter class="text-right">
      <button
        type="button"
        @click="resetModal"
        class="btn btn-outline-secondary w-32 mr-1"
      >
        Cancel
      </button>
      <button type="submit" form="userForm" class="btn btn-primary w-32">
        Simpan
      </button>
    </ModalFooter>
  </Modal>
  <Modal
    :show="deleteConfirmationModal"
    @hidden="deleteConfirmationModal = false"
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">Apakah Anda Yakin ?</div>
        <div class="text-slate-500 mt-2">
          Anda yakin ingin menghapus data <b>{{ username }}</b> ? <br />Data
          yang telah dihapus tidak bisa kembali.
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="deleteConfirmationModal = false"
          class="btn btn-outline-secondary w-24 mr-1"
        >
          Batal
        </button>
        <button
          type="button"
          class="btn btn-danger w-24"
          @click="
            (e) => {
              e.preventDefault();
              deleteUser(id_user);
            }
          "
        >
          Hapus
        </button>
      </div>
    </ModalBody>
  </Modal>
  <!-- END: HTML Table Data -->
  <ModalDatabaseError ref="modalErrorRef" />
</template>

<script>
import { useUserStore } from "@/stores/user";
import ModalDatabaseError from "@/components/modal-error/Main.vue";
import { useAuthStore } from "@/stores/auth";
import { ref, reactive } from "vue";
import xlsx from "xlsx";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import dom from "@left4code/tw-starter/dist/js/dom";
import moment from "moment";
const modal_utama = ref(false);
const isLoading = ref(false);
const id_user = ref("");
const username = ref("");
const role = ref("role");
const region = ref("id_region");
const email_user = ref("");
const password = ref("");
const password_baru = ref("");
const modal_bukuBesar = ref(false);
const deleteConfirmationModal = ref(false);
const isEdit = ref(false);
const passEdit = ref(false);
const tabulator = ref();
const tabulatorBukuBesar = ref();
const auth = ref();
const filter = reactive({
  field: "id_user",
  type: "like",
  value: "",
});
export default {
  setup() {
    const User = useUserStore();
    const Auth = useAuthStore();
    return { User, moment, Auth };
  },
  components: {
    ModalDatabaseError,
  },
  data() {
    return {
      modal_utama,
      deleteConfirmationModal,
      id_user,
      username,
      role,
      auth,
      region,
      email_user,
      password,
      password_baru,
      isLoading,
      tabulator,
      tabulatorBukuBesar,
      filter,
      isEdit,
      passEdit,
      modal_bukuBesar,
    };
  },
  methods: {
    resetModal() {
      modal_utama.value = false;
      deleteConfirmationModal.value = false;
      modal_bukuBesar.value = false;
      isEdit.value = false;
      passEdit.value = false;
      id_user.value = "";
      username.value = "";
      role.value = "role";
      region.value = "id_region";
      email_user.value = "";
      password.value = "";
      password_baru.value = "";
    },
    addUser() {
      try {
        this.User.addItem(
          username.value,
          role.value,
          region.value,
          email_user.value,
          password.value
        ).then(() => {
          this.resetModal();
          this.initTabulator();
        });
      } catch (error) {
        alert("Gagal Tambah Data" + error);
      }
    },
    updateUser() {
      try {
        let finalPassword;
        if (this.passEdit) {
          if (this.password_baru != "") {
            finalPassword = password_baru.value;
          } else {
            alert("Password Baru tidak boleh kosong");
          }
        } else {
          finalPassword = "";
        }
        this.User.updateItem({
          id_user: this.id_user,
          username: this.username,
          role: this.role,
          id_region: this.region,
          email_user: this.email_user,
          password: finalPassword,
        }).then(() => {
          this.initTabulator();
          this.resetModal();
        });
      } catch (error) {
        alert(`Gagal Update data ${id_user.value}` + error);
      }
    },
    deleteUser(id_user) {
      try {
        this.User.removeItem(id_user).then(() => {
          this.initTabulator();
          this.resetModal();
        });
      } catch (error) {
        alert(`Gagal Delete User ${id_user}` + error);
      }
    },

    initTabulator() {
      this.tabulator = new Tabulator(this.$refs.tableRef, {
        printAsHtml: true,
        printStyled: true,
        printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel User<h1>`,
        printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(
          Date.now()
        ).format("DD MMM YYYY HH:SS")}<h2>`,
        data: this.User.items,
        pagination: "remote",
        paginationSize: 10,
        paginationSizeSelector: [10, 20, 30, 40, 50],
        layout: "fitColumns",
        responsiveLayout: "collapse",
        placeholder: "Tida ada Data di temukan",
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
            title: "TANGGAL",
            // minWidth: 200,
            minWidth: 100,
            responsive: 0,
            field: "id_user",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().id_user
                }</div>
              </div>`;
            },
          },
          {
            title: "BUKTI",
            headerHozAlign: "center",
            responsive: 1,
            minWidth: 100,
            field: "username",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            editor: "input",
            editable: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().username
                }</div>
              </div>`;
            },
          },
          {
            title: "NOPER",
            minWidth: 150,
            headerHozAlign: "center",
            field: "role",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            editor: "textarea",
            editable: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().role
                }</div>
              </div>`;
            },
          },
          {
            title: "KETERANGAN",
            minWidth: 300,
            headerHozAlign: "center",
            field: "id_region",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            editor: "textarea",
            editable: false,
            download: false,
            formatter(cell) {
              if (cell.getData().role != "Admin") {
                return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().id_region
                } - ${cell.getData().nama_region}</div>
              </div>`;
              } else {
                return `<div class="font-medium whitespace-nowrap">---</div>`;
              }
            },
          },
          {
            title: "JUMLAH",
            minWidth: 200,
            headerHozAlign: "center",
            field: "email_user",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            editor: "textarea",
            editable: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().email_user
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
              const a =
                auth.value.role == "Admin"
                  ? dom(`<div class="flex lg:justify-center items-center">
                <a id="edit" class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                </a>
                <a id="delete" class="flex items-center text-danger" href="javascript:;">
                  <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
                </a>
              </div>`)
                  : dom(`<div class="flex lg:justify-center items-center">
                <a id="edit" class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                </a>
              </div>`);
              dom(a).on("click", "a", function (e) {
                if (e.id === "edit") {
                  id_user.value = cell.getData().id_user;
                  username.value = cell.getData().username;
                  email_user.value = cell.getData().email_user;
                  role.value = cell.getData().role;
                  region.value = cell.getData().id_region;
                  password.value = cell.getData().password;
                  isEdit.value = true;
                  modal_utama.value = true;
                } else {
                  id_user.value = cell.getData().id_user;
                  username.value = cell.getData().username;
                  deleteConfirmationModal.value = true;
                }
              });
              return a[0];
            },
          },
          // For print format
          {
            title: "TANGGAL",
            field: "id_user",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "BUKTI",
            field: "username",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "NOPER",
            field: "ro5",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "KETERANGAN",
            field: "id_region",
            visible: false,
            print: true,
            download: true,
            formatter(cell) {
              if (cell.getData().role != "Admin") {
                return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().id_region
                } - ${cell.getData().nama_region}</div>
              </div>`;
              } else {
                return `<div class="font-medium whitespace-nowrap">-</div>`;
              }
            },
          },
          {
            title: "JUMLAH",
            field: "email_user",
            visible: false,
            print: true,
            download: true,
          },
        ],
      });
      this.tabulator.on("renderComplete", function () {
        createIcons({
          icons,
          "stroke-width": 1.5,
          nameAttr: "data-lucide",
        });
      });
    },
    initBukuBesar() {
      this.tabulatorBukuBesar = new Tabulator(this.$refs.tableRefBukuBesar, {
        printAsHtml: true,
        printStyled: true,
        printHeader: `<h1 class='text-2xl p-2 m-2 text-center border-y-2 border-black'>Tabel User<h1>`,
        printFooter: `<h2 class='p-2 m-2 text-center mt-4'>${moment(
          Date.now()
        ).format("DD MMM YYYY HH:SS")}<h2>`,
        data: this.User.items,
        pagination: "remote",
        paginationSize: 10,
        paginationSizeSelector: [10, 20, 30, 40, 50],
        layout: "fitColumns",
        responsiveLayout: "collapse",
        placeholder: "Tida ada Data di temukan",
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
            title: "NOPER",
            // minWidth: 200,
            minWidth: 100,
            responsive: 0,
            field: "id_user",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().id_user
                }</div>
              </div>`;
            },
          },
          {
            title: "KETERANGAN",
            headerHozAlign: "center",
            minWidth: 150,
            field: "username",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            editor: "input",
            editable: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().username
                }</div>
              </div>`;
            },
          },
          {
            title: "DEBET",
            minWidth: 150,
            headerHozAlign: "center",
            field: "role",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            editor: "textarea",
            editable: false,
            download: false,
            formatter(cell) {
              return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().role
                }</div>
              </div>`;
            },
          },
          {
            title: "KREDIT",
            minWidth: 160,
            headerHozAlign: "center",
            field: "id_region",
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            editor: "textarea",
            editable: false,
            download: false,
            formatter(cell) {
              if (cell.getData().role != "Admin") {
                return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().id_region
                } - ${cell.getData().nama_region}</div>
              </div>`;
              } else {
                return `<div class="font-medium whitespace-nowrap">---</div>`;
              }
            },
          },
          {
            title: "ACTIONS",
            headerHozAlign: "center",
            minWidth: 100,
            field: "actions",
            responsive: 1,
            hozAlign: "center",
            vertAlign: "middle",
            print: false,
            download: false,
            formatter(cell) {
              const a =
                auth.value.role == "Admin"
                  ? dom(`<div class="flex lg:justify-center items-center">
                <a id="edit" class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                </a>
                <a id="delete" class="flex items-center text-danger" href="javascript:;">
                  <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete
                </a>
              </div>`)
                  : dom(`<div class="flex lg:justify-center items-center">
                <a id="edit" class="flex items-center mr-3" href="javascript:;">
                  <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit
                </a>
              </div>`);
              dom(a).on("click", "a", function (e) {
                if (e.id === "edit") {
                  id_user.value = cell.getData().id_user;
                  username.value = cell.getData().username;
                  email_user.value = cell.getData().email_user;
                  role.value = cell.getData().role;
                  region.value = cell.getData().id_region;
                  password.value = cell.getData().password;
                  isEdit.value = true;
                  modal_utama.value = true;
                } else {
                  id_user.value = cell.getData().id_user;
                  username.value = cell.getData().username;
                  deleteConfirmationModal.value = true;
                }
              });
              return a[0];
            },
          },
          // For print format
          {
            title: "NOPER",
            field: "id_user",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "KETERANGAN",
            field: "username",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "DEBET",
            field: "ro5",
            visible: false,
            print: true,
            download: true,
          },
          {
            title: "KREDIT",
            field: "id_region",
            visible: false,
            print: true,
            download: true,
            formatter(cell) {
              if (cell.getData().role != "Admin") {
                return `<div>
                <div class="font-medium whitespace-nowrap">${
                  cell.getData().id_region
                } - ${cell.getData().nama_region}</div>
              </div>`;
              } else {
                return `<div class="font-medium whitespace-nowrap">-</div>`;
              }
            },
          },
        ],
      });
      this.tabulator.on("renderComplete", function () {
        createIcons({
          icons,
          "stroke-width": 1.5,
          nameAttr: "data-lucide",
        });
      });
    },
    reInitOnResizeWindow() {
      window.addEventListener("resize", () => {
        this.tabulator.redraw();
        this.tabulatorBukuBesar.redraw();
        createIcons({
          icons,
          "stroke-width": 1.5,
          nameAttr: "data-lucide",
        });
      });
    },
    onFilter() {
      this.tabulator.setFilter(
        this.filter.field,
        this.filter.type,
        this.filter.value
      );
    },

    onResetFilter() {
      this.filter.field = "id_user";
      this.filter.type = "like";
      this.filter.value = "";
      this.onFilter();
    },

    // Export
    onExportCsv() {
      this.tabulator.download("csv", "data.csv");
    },
    onExportXlsx() {
      const win = window;
      win.XLSX = xlsx;
      this.tabulator.download("xlsx", "data.xlsx", {
        sheetName: "Data User",
      });
    },
    // Print
    onPrint() {
      this.tabulator.print();
    },
  },
  beforeCreate() {
    isLoading.value = true;
    auth.value = this.Auth.items;
    this.User.readItem()
      .then(() => {
        this.initTabulator();
        this.initBukuBesar();
        this.reInitOnResizeWindow();
        this.$refs.modalErrorRef.errorDatabaseModal = false;
        isLoading.value = false;
      })
      .catch((error) => {
        isLoading.value = false;
        console.error(error);
        this.$refs.modalErrorRef.errorDatabaseModal = true;
      });
  },
};
</script>
