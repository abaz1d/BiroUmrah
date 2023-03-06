<template>
  <div class="mt-5 intro-x">
    <div class="box zoom-in">
      <div class="intro-y col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
        <div class="box">
          <div class="p-5">
            <div
              class="h-[200px] before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black/90 before:to-black/10 image-fit rounded-md">
              <img alt="Midone Tailwind HTML Admin Template" class="rounded-md" :src="getUrl(detail)" />
              <div class="absolute bottom-0 text-white px-5 pb-6 z-10">
                <a href="" class="block font-medium text-xl uppercase mb-3">
                  {{ detail.nama_travel }}
                </a>
                <span class="bg-white/20 px-2 py-1 rounded">{{ lokasi }}</span>
              </div>
            </div>
            <div class="text-slate-600 dark:text-slate-500 mt-5">
              <div class="flex items-center">
                <PlaneIcon class="ml-4 w-4 h-4 mr-2" />Nama Travel : <p class="inline-block ml-auto mr-4 capitalize">
                  {{ detail.nama_travel }}
                </p>
              </div>
              <hr>
              <div class="flex items-center mt-2">
                <PocketIcon class="ml-4 w-4 h-4 mr-2" /> Paket Layanan : <p class="inline-block ml-auto mr-4">
                  {{ detail.paket }}
                </p>
              </div>
              <hr>
              <div class="flex items-center mt-2">
                <ContactIcon class="ml-4 w-4 h-4 mr-2" /> Nama Mutowif : <p class="inline-block ml-auto mr-4">
                  {{ detail.mutowif }}
                </p>
              </div>
              <hr>
              <div class="flex items-center mt-2">
                <MapIcon class="ml-4 w-4 h-4 mr-2" /> Rute Perjalanan : <p class="inline-block ml-auto mr-4">
                  {{ detail.rute }}
                </p>
              </div>
              <hr>
              <div class="flex items-center mt-2">
                <HomeIcon class="ml-4 w-4 h-4 mr-2" /> Room : <p class="inline-block ml-auto mr-4">
                  {{ detail.room }}
                </p>
              </div>
              <hr>
              <div class="flex items-center mt-2">
                <CalendarRangeIcon class="ml-4 w-4 h-4 mr-2" /> Tanggal Berangkat & Pulang : <p
                  class="inline-block ml-auto mr-4">
                  {{ moment(detail.tanggal).format("DD MMM") + " - " + moment(detail.pulang).format("DD MMM YYYY") }}
                </p>
              </div>
              <hr>
              <div class="flex items-center mt-2">
                <UsersIcon class="ml-4 w-4 h-4 mr-2" /> Total Jumlah Jamaah : <p class="inline-block ml-auto mr-4">
                  {{ detail.jumlah }} Orang
                </p>
              </div>
              <hr>
              <div class="box my-2 border-dashed border-2 border-primary dark:border-white/50">
                <div class="flex items-center mt-2">
                  <MapPinIcon class="ml-4 w-4 h-4 mr-2" /> Status Mekkah : <p class="inline-block ml-auto mr-4">
                    <input type="checkbox" id="jack" :checked="detail.flag_mk" disabled>
                  </p>
                </div>
                <div class="flex items-center mt-2">
                  <BuildingIcon class="ml-4 w-4 h-4 mr-2" /> Hotel Mekkah : <p class="inline-block ml-auto mr-4">
                    {{ detail.hotel_mekah }}
                  </p>
                </div>
                <div class="flex items-center my-2">
                  <CalendarRangeIcon class="ml-4 w-4 h-4 mr-2" /> IN & OUT Mekkah : <p class="inline-block ml-auto mr-4">
                    {{ moment(detail.in_mk).format("DD MMM") + " - " + moment(detail.out_mk).format("DD MMM YYYY") }}
                  </p>
                </div>
              </div>
              <hr>
              <div class="box my-2 border-dashed border-2 border-primary dark:border-white/50">
                <div class="flex items-center mt-2">
                  <MapPinIcon class="ml-4 w-4 h-4 mr-2" /> Status Madinah : <p class="inline-block ml-auto mr-4">
                    <input type="checkbox" id="jack" :checked="detail.flag_md" disabled>
                  </p>
                </div>
                <div class="flex items-center mt-2">
                  <BuildingIcon class="ml-4 w-4 h-4 mr-2" /> Hotel Madinah : <p class="inline-block ml-auto mr-4">
                    {{ detail.hotel_madinah }}
                  </p>
                </div>
                <div class="flex items-center my-2">
                  <CalendarRangeIcon class="ml-4 w-4 h-4 mr-2" /> IN & OUT Madinah : <p class="inline-block ml-auto mr-4">
                    {{ moment(detail.in_md).format("DD MMM") + " - " + moment(detail.out_md).format("DD MMM YYYY") }}
                  </p>
                </div>
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
import indonesia from "@/assets/images/indonesia.png";
import mekkah from "@/assets/images/mekkah.jpeg";
import madhinah from "@/assets/images/madhinah.jpeg"; 
import saudiarabia from "@/assets/images/saudiarabia.png"; 
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
        if (item.status_pulang == 1) {
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
        if (item.status_pulang == 1) {
          return indonesia;
        } else {
          return madhinah;
        }
      } else if (item.flag_md == 0 && item.flag_mk == 1) {
        return mekkah;
      } else {
        return saudiarabia;
      }
    }
  },
};
</script>