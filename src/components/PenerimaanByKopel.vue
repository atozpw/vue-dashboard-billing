<script setup>
  import { ref } from 'vue';
  import { numberFormat } from '@/helpers/numberFormat';
  import { getStorage } from '@/helpers/getStorage';

  const data = ref([]);
  const dataKopel = ref([]);
  const dataLppHarian = ref([]);
  const dataDrdBerjalan = ref([]);
  const dataDrdLalu = ref([]);
  const dataEfisiensi = ref([]);
  const dataEfektifitas = ref([]);
  const dataStatus = ref([]);

  function refresh() {
    let item = [];

    dataKopel.value = getStorage('_branches');
    dataLppHarian.value = getStorage('_paymentTodays');
    dataDrdBerjalan.value = getStorage('_billThisMonths');
    dataDrdLalu.value = getStorage('_billLastMonths');
    dataEfisiensi.value = getStorage('_paymentEfficients');
    dataEfektifitas.value = getStorage('_paymentEffectives');
    dataStatus.value = getStorage('_paymentStatuses');

    if (dataKopel) {
      for (let i in dataKopel.value) {
        let kopelId = dataKopel.value[i].id;
        let kopelNama = dataKopel.value[i].name;
        let lppLembar = 0;
        let lppRupiah = 0;
        let drdBerjalanLembar = 0;
        let drdBerjalanRupiah = 0;
        let drdLaluLembar = 0;
        let drdLaluRupiah = 0;
        let efisiensiPersen = 0;
        let efisiensiRupiah = 0;
        let efektifitasPersen = 0;
        let efektifitasRupiah = 0;
        let status = false;

        if (dataLppHarian) {
          for (let j in dataLppHarian.value) {
            if (dataLppHarian.value[j].id === kopelId) {
              lppLembar = dataLppHarian.value[j].count;
              lppRupiah = dataLppHarian.value[j].amount;
            }
          }
        }

        if (dataDrdBerjalan) {
          for (let j in dataDrdBerjalan.value) {
            if (dataDrdBerjalan.value[j].id === kopelId) {
              drdBerjalanLembar = dataDrdBerjalan.value[j].count;
              drdBerjalanRupiah = dataDrdBerjalan.value[j].amount;
            }
          }
        }

        if (dataDrdLalu) {
          for (let j in dataDrdLalu.value) {
            if (dataDrdLalu.value[j].id === kopelId) {
              drdLaluLembar = dataDrdLalu.value[j].count;
              drdLaluRupiah = dataDrdLalu.value[j].amount;
            }
          }
        }

        if (dataEfisiensi) {
          for (let j in dataEfisiensi.value) {
            if (dataEfisiensi.value[j].id === kopelId) {
              efisiensiRupiah = dataEfisiensi.value[j].amount;
              efisiensiPersen = (dataEfisiensi.value[j].amount * 100) / drdBerjalanRupiah;
            }
          }
        }

        if (dataEfektifitas) {
          for (let j in dataEfektifitas.value) {
            if (dataEfektifitas.value[j].id === kopelId) {
              efektifitasRupiah = dataEfektifitas.value[j].amount;
              efektifitasPersen = (dataEfektifitas.value[j].amount * 100) / drdBerjalanRupiah;
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

        item.push({
          kopelId: kopelId,
          kopelNama: kopelNama,
          lppLembar: lppLembar,
          lppRupiah: lppRupiah,
          drdBerjalanLembar: drdBerjalanLembar,
          drdBerjalanRupiah: drdBerjalanRupiah,
          drdLaluLembar: drdLaluLembar,
          drdLaluRupiah: drdLaluRupiah,
          efisiensiPersen: efisiensiPersen,
          efisiensiRupiah: efisiensiRupiah,
          efektifitasPersen: efektifitasPersen,
          efektifitasRupiah: efektifitasRupiah,
          status: status
        });
      }

      data.value = item.sort((a, b) => {return b.efisiensiPersen - a.efisiensiPersen});
    }
  }

  refresh();
  setInterval(() => {refresh()}, 2500);
</script>

<template>
  <div class="card border-0">
    <div class="card-body">
      <div class="mb-3">
        <div class="fs-5 fw-bold">DRD & Penerimaan Kota Pelayanan</div>
        <div class="fw-lighter text-body-tertiary">Data diurut berdasarkan persentase efisiensi terbesar</div>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th><small class="text-body-tertiary">KOTA PELAYANAN</small></th>
              <th class="text-end"><small class="text-body-tertiary">LPP</small></th>
              <th class="text-end"><small class="text-body-tertiary">DRD</small></th>
              <th class="text-end"><small class="text-body-tertiary">EFISIENSI</small></th>
              <th class="text-end"><small class="text-body-tertiary">EFEKTIFITAS</small></th>
              <th class="text-center"><small class="text-body-tertiary">STATUS</small></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in data" :key="item.kopelId">
              <td class="fw-semibold">{{ item.kopelNama }}</td>
              <td class="text-end fw-semibold">
                <div class="text-info">{{ numberFormat(item.lppLembar) }}</div>
                <div>{{ numberFormat(item.lppRupiah) }}</div>
              </td>
              <td class="text-end fw-semibold">
                <div class="text-info">{{ numberFormat(item.drdBerjalanLembar) }}</div>
                <div :class="item.drdBerjalanRupiah < item.drdLaluRupiah ? 'text-danger' : ''">{{ numberFormat(item.drdBerjalanRupiah) }}</div>
              </td>
              <td class="text-end fw-semibold">
                <div class="text-info">{{ numberFormat(item.efisiensiPersen, 2) }}</div>
                <div>{{ numberFormat(item.efisiensiRupiah) }}</div>
              </td>
              <td class="text-end fw-semibold">
                <div class="text-info">{{ numberFormat(item.efektifitasPersen, 2) }}</div>
                <div>{{ numberFormat(item.efektifitasRupiah) }}</div>
              </td>
              <td class="text-center align-middle">
                <div v-if="item.status === true" class="spinner-grow spinner-grow-sm text-success" role="status">
                  <span class="visually-hidden">Status</span>
                </div>
                <i v-else class="bi-circle-fill text-danger"></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
