<template>
  <div class="mt-5 intro-x">
    <div class="box zoom-in">
      <div class="intro-y col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
        <div class="box">
          <div class="p-5">
            <div
              class="h-[200px] before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black/90 before:to-black/10 image-fit">
              <img alt="Midone Tailwind HTML Admin Template" class="rounded-t-md" :src="getUrl(detail)" />
              <div class="absolute bottom-0 text-white px-5 pb-6 z-10">
                <a href="" class="block font-medium text-xl uppercase mb-3">
                  {{ detail.nama_travel }}
                </a>
                <span class="bg-white/20 px-2 py-1 rounded">{{ lokasi }}</span>
              </div>
            </div>
            <div class="text-slate-600 dark:text-slate-500 mt-5">
              <div class="flex items-center">
                <MapIcon class="ml-4 w-4 h-4 mr-2" />Wilayah : <p class="inline-block ml-auto mr-4">
                  {{ detail.nama_region }}
                </p>
              </div>
              <div class="flex items-center mt-2">
                <CalendarRangeIcon class="ml-4 w-4 h-4 mr-2" /> Periode Bulan : <p class="inline-block ml-auto mr-4">
                  {{ moment(detail.periode_bulanan).format("MMMM YYYY") }}
                </p>
              </div>
              <div class="flex items-center mt-2">
                <UsersIcon class="ml-4 w-4 h-4 mr-2" /> Total Jumlah Anggota : <p class="inline-block ml-auto mr-4">
                  {{ detail.jumlah_anggota }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="flex justify-center lg:justify-end items-center p-5 border-t border-slate-200/60 dark:border-darkmode-400">
            <a class="flex items-center text-xs text-primary mr-auto" href="javascript:;">
              Diedit: {{ moment(detail.tanggal_update).format("DD/MM/YYYY HH:SS") }}
            </a>
            <a class="flex items-center mr-3" href="javascript:;" @click="update(detail)" v-show="data.role !== 'Admin'">
              <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
            </a>
            <a class="flex items-center text-danger" href="javascript:;" @click="openModal_Remove(detail)"
              v-show="data.role !== 'Admin'">
              <Trash2Icon class="w-4 h-4 mr-1" /> Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { useDashboardStore } from "@/stores/dashboard";
export default {
  setup() {
    const Dashboard = useDashboardStore();
    return { Dashboard, moment };
  },
  props: {
    detail: { type: Object, required: true },
    data: { type: Object, required: true },
  },
  computed: {
    lokasi: (data) => {
      const item = data.detail
      if (item.flag_md == 1 && item.flag_mk == 1) {
        if (item.pulang) {
          return "KEPULANGAN " + "| " + moment(item.pulang).format("DD MMM YYYY HH:SS")
        } else {
          return "MADINAH " + "| " + moment(item.in_md).format("DD MMM") + " - " + moment(item.out_md).format("DD MMM YYYY")
        }
      } else if (item.flag_md == 0 && item.flag_mk == 1) {
        return "MEKKAH " + "| " + moment(item.in_mk).format("DD MMM") + " - " + moment(item.out_mk).format("DD MMM YYYY")
      } else {
        return "KEBERANGKATAN " + "| " + moment(item.tanggal).format("DD MMM YYYY HH:SS")
      }
    },
  },
  data() {
    return {
      isi: 'getSel'
    }
  },
  watch: {
    isi(e) {
      console.log("ini props nya", e)
    },
  },
  emits: ["openModalRemove", "updateTotalAnggota"],
  methods: {
    async update(detail) {
      this.$emit("updateTotalAnggota", detail);
    },
    openModal_Remove(detail) {
      this.$emit("openModalRemove", detail);
    },
    getDaerah(detail) {
      console.log("getDaerah", detail);
    },
    getUrl(item) {
      if (item.flag_md == 1 && item.flag_mk == 1) {
        if (item.pulang) {
          return `${new URL(window.location.origin)}` + "404.png";
        } else {
          return `${new URL(window.location.origin)}` + "404.png";
        }
      } else if (item.flag_md == 0 && item.flag_mk == 1) {
        return `${new URL(window.location.origin)}` + "404.png";
      } else {
        return `${new URL(window.location.origin)}` + "404.png";
      }
    }
  },
};
</script>