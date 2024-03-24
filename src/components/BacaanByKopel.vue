<script setup>
  import { ref } from 'vue';
  import { numberFormat } from '@/helpers/numberFormat';
  import { getStorage } from '@/helpers/getStorage';

  const data = ref([]);
  const dataKopel = ref([]);
  const dataMeter = ref([]);
  const dataPemair = ref([]);
  const dataPemair0 = ref([]);
  const dataPemair1sd10 = ref([]);
  const dataPemairLebih10 = ref([]);
  const dataPemairBulanLalu = ref([]);
  const dataStatus = ref([]);

  const totalDsmlDiisi = ref(0);
  const totalDsmlTotal = ref(0);
  const totalPemairPersen0 = ref(0);
  const totalPemairRupiah0 = ref(0);
  const totalPemairPersen1 = ref(0);
  const totalPemairRupiah1 = ref(0);
  const totalPemairPersen2 = ref(0);
  const totalPemairRupiah2 = ref(0);
  const totalPemairKubik = ref(0);
  const totalPemairRupiah = ref(0);

  function refresh() {
    let item = [];

    totalDsmlDiisi.value = 0;
    totalDsmlTotal.value = 0;
    totalPemairPersen0.value = 0;
    totalPemairRupiah0.value = 0;
    totalPemairPersen1.value = 0;
    totalPemairRupiah1.value = 0;
    totalPemairPersen2.value = 0;
    totalPemairRupiah2.value = 0;
    totalPemairKubik.value = 0;
    totalPemairRupiah.value = 0;

    dataKopel.value = getStorage('_branches');
    dataMeter.value = getStorage('_meterCounts');
    dataPemair.value = getStorage('_waterUsageThisMonths');
    dataPemair0.value = getStorage('_waterUsageZeros');
    dataPemair1sd10.value = getStorage('_waterUsageOneToTens');
    dataPemairLebih10.value = getStorage('_waterUsageGreaterTens');
    dataPemairBulanLalu.value = getStorage('_waterUsageLastMonths');
    dataStatus.value = getStorage('_billReleaseStatuses');

    if (dataKopel) {
      for (let i in dataKopel.value) {
        let kopelId = dataKopel.value[i].id;
        let kopelNama = dataKopel.value[i].name;
        let dsmlDiisi = 0;
        let dsmlTotal = 0;
        let pemairPersen0 = 0;
        let pemairRupiah0 = 0;
        let pemairPersen1 = 0;
        let pemairRupiah1 = 0;
        let pemairPersen2 = 0;
        let pemairRupiah2 = 0;
        let pemairKubik = 0;
        let pemairRupiah = 0;
        let pemairRupiahLalu = 0;
        let status = false;

        if (dataMeter) {
          for (let j in dataMeter.value) {
            if (dataMeter.value[j].id === kopelId) {
              dsmlDiisi = dataMeter.value[j].fill;
              dsmlTotal = dataMeter.value[j].total;
            }
          }
        }

        if (dataPemair) {
          for (let j in dataPemair.value) {
            if (dataPemair.value[j].id === kopelId) {
              pemairKubik = dataPemair.value[j].usage;
              pemairRupiah = dataPemair.value[j].amount;
            }
          }
        }

        if (dataPemair0) {
          for (let j in dataPemair0.value) {
            if (dataPemair0.value[j].id === kopelId) {
              pemairRupiah0 = dataPemair0.value[j].amount;
              pemairPersen0 = (pemairRupiah0 * 100) / pemairRupiah;
            }
          }
        }

        if (dataPemair1sd10) {
          for (let j in dataPemair1sd10.value) {
            if (dataPemair1sd10.value[j].id === kopelId) {
              pemairRupiah1 = dataPemair1sd10.value[j].amount;
              pemairPersen1 = (pemairRupiah1 * 100) / pemairRupiah;
            }
          }
        }

        if (dataPemairLebih10) {
          for (let j in dataPemairLebih10.value) {
            if (dataPemairLebih10.value[j].id === kopelId) {
              pemairRupiah2 = dataPemairLebih10.value[j].amount;
              pemairPersen2 = (pemairRupiah2 * 100) / pemairRupiah;
            }
          }
        }

        if (dataPemairBulanLalu) {
          for (let j in dataPemairBulanLalu.value) {
            if (dataPemairBulanLalu.value[j].id === kopelId) {
              pemairRupiahLalu = dataPemairBulanLalu.value[j].amount;
            }
          }
        }

        if (dataStatus) {
          for (let j in dataStatus.value) {
            if (dataStatus.value[j].id === kopelId) {
              status = (dataStatus.value[j].count > 0) ? true : false;
            }
          }
        }

        totalDsmlDiisi.value += dsmlDiisi;
        totalDsmlTotal.value += dsmlTotal;
        totalPemairRupiah0.value += pemairRupiah0;
        totalPemairRupiah1.value += pemairRupiah1;
        totalPemairRupiah2.value += pemairRupiah2;
        totalPemairKubik.value += pemairKubik;
        totalPemairRupiah.value += pemairRupiah;

        item.push({
          kopelId: kopelId,
          kopelNama: kopelNama,
          dsmlDiisi: dsmlDiisi,
          dsmlTotal: dsmlTotal,
          pemairPersen0: pemairPersen0,
          pemairRupiah0: pemairRupiah0,
          pemairPersen1: pemairPersen1,
          pemairRupiah1: pemairRupiah1,
          pemairPersen2: pemairPersen2,
          pemairRupiah2: pemairRupiah2,
          pemairKubik: pemairKubik,
          pemairRupiah: pemairRupiah,
          pemairRupiahLalu: pemairRupiahLalu,
          status: status
        });
      }

      data.value = item.sort((a, b) => {return b.pemairRupiah - a.pemairRupiah});
    }

    totalPemairPersen0.value = (totalPemairRupiah0.value > 0) ? (totalPemairRupiah0.value * 100) / totalPemairRupiah.value : 0;
    totalPemairPersen1.value = (totalPemairRupiah1.value > 0) ? (totalPemairRupiah1.value * 100) / totalPemairRupiah.value : 0;
    totalPemairPersen2.value = (totalPemairRupiah2.value > 0) ? (totalPemairRupiah2.value * 100) / totalPemairRupiah.value : 0;
  }

  refresh();
  setInterval(() => {refresh()}, 2500);
</script>

<template>
  <div class="card border-0">
    <div class="card-body">
      <div class="mb-3">
        <div class="fs-5 fw-bold">Proyeksi Pendapatan</div>
        <div class="fw-lighter text-body-tertiary">Data diurutkan berdasarkan proyeksi pendapatan tertinggi</div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th><small class="text-body-tertiary">UNIT LAYANAN</small></th>
              <th class="text-end"><small class="text-body-tertiary">DSML</small></th>
              <th class="text-end"><small class="text-body-tertiary">PEMAIR 0</small></th>
              <th class="text-end"><small class="text-body-tertiary">PEMAIR 1 - 10</small></th>
              <th class="text-end"><small class="text-body-tertiary">PEMAIR > 10</small></th>
              <th class="text-end"><small class="text-body-tertiary">PEMAIR</small></th>
              <th class="text-center"><small class="text-body-tertiary">STATUS</small></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.kopelId">
              <td class="fw-semibold">{{ item.kopelNama }}</td>
              <td class="text-end fw-semibold">
                <div>{{ numberFormat(item.dsmlDiisi) }}</div>
                <div>{{ numberFormat(item.dsmlTotal) }}</div>
              </td>
              <td class="text-end fw-semibold">
                <div class="text-info">{{ numberFormat(item.pemairPersen0, 2) }}</div>
                <div>{{ numberFormat(item.pemairRupiah0) }}</div>
              </td>
              <td class="text-end fw-semibold">
                <div class="text-info">{{ numberFormat(item.pemairPersen1, 2) }}</div>
                <div>{{ numberFormat(item.pemairRupiah1) }}</div>
              </td>
              <td class="text-end fw-semibold">
                <div class="text-info">{{ numberFormat(item.pemairPersen2, 2) }}</div>
                <div>{{ numberFormat(item.pemairRupiah2) }}</div>
              </td>
              <td class="text-end fw-semibold">
                <div class="text-info">{{ numberFormat(item.pemairKubik) }}</div>
                <div :class="item.pemairRupiah < item.pemairRupiahLalu ? 'text-danger' : ''">{{ numberFormat(item.pemairRupiah) }}</div>
              </td>
              <td class="text-center align-middle">
                <div v-if="item.status === true" class="spinner-grow spinner-grow-sm text-success" role="status">
                  <span class="visually-hidden">Status</span>
                </div>
                <i v-else class="bi-circle-fill text-danger"></i>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <th><small class="text-body-tertiary">TOTAL</small></th>
            <th class="text-end fw-semibold">
              <div class="pb-0">{{ numberFormat(totalDsmlDiisi) }}</div>
              <div class="pt-0">{{ numberFormat(totalDsmlTotal) }}</div>
            </th>
            <th class="text-end fw-semibold">
              <div class="text-info pb-0">{{ numberFormat(totalPemairPersen0, 2) }}</div>
              <div class="pt-0">{{ numberFormat(totalPemairRupiah0) }}</div>
            </th>
            <th class="text-end fw-semibold">
              <div class="text-info pb-0">{{ numberFormat(totalPemairPersen1, 2) }}</div>
              <div class="pt-0">{{ numberFormat(totalPemairRupiah1) }}</div>
            </th>
            <th class="text-end fw-semibold">
              <div class="text-info pb-0">{{ numberFormat(totalPemairPersen2, 2) }}</div>
              <div class="pt-0">{{ numberFormat(totalPemairRupiah2) }}</div>
            </th>
            <th class="text-end fw-semibold">
              <div class="text-info pb-0">{{ numberFormat(totalPemairKubik) }}</div>
              <div class="pt-0">{{ numberFormat(totalPemairRupiah) }}</div>
            </th>
            <th>&nbsp;</th>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>