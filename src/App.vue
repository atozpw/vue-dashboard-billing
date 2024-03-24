<script setup>
  import axios from 'axios'
  import { getStorage } from './helpers/getStorage'
  import { setStorage } from './helpers/setStorage'
  import { latestUpdate } from './helpers/latestUpdate'

  import LatestUpdate from './components/LatestUpdate.vue'
  import DrdBerjalan from './components/DrdBerjalan.vue'
  import EfisiensiPenerimaan from './components/EfisiensiPenerimaan.vue'
  import EfektifitasPenerimaan from './components/EfektifitasPenerimaan.vue'
  import ProyeksiPendapatan from './components/ProyeksiPendapatan.vue'
  import PenerimaanByKopel from './components/PenerimaanByKopel.vue'
  import BacaanByKopel from './components/BacaanByKopel.vue'
  import GrafikPenerimaan from './components/GrafikPenerimaan.vue'
  import GrafikBacaan from './components/GrafikBacaan.vue'

  axios.interceptors.response.use(function (response) {
    setStorage('_latestUpdate', latestUpdate());
    return response.data.data;
  }, function (error) {
    return Promise.reject(error);
  });

  function setHeaderToken() {
    const storage = getStorage('_accessToken');
    axios.defaults.headers.common['Authorization'] = storage.accessToken;
  }

  async function getAccessToken() {
    try {
      const response = await axios.post('/access-token', {appName: import.meta.env.VITE_API_ID});
      setStorage('_accessToken', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getBranch() {
    try {
      const response = await axios.get('/branches');
      setStorage('_branches', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getBillThisMonth() {
    try {
      const response = await axios.get('/bill-this-months');
      setStorage('_billThisMonths', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getBillLastMonth() {
    try {
      const response = await axios.get('/bill-last-months');
      setStorage('_billLastMonths', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getPaymentEfficient() {
    try {
      const response = await axios.get('/payment-efficients');
      setStorage('_paymentEfficients', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getPaymentEffective() {
    try {
      const response = await axios.get('/payment-effectives');
      setStorage('_paymentEffectives', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getPaymentToday() {
    try {
      const response = await axios.get('/payment-todays');
      setStorage('_paymentTodays', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getPaymentStatus() {
    try {
      const response = await axios.get('/payment-statuses');
      setStorage('_paymentStatuses', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getMeterCount() {
    try {
      const response = await axios.get('/meter-counts');
      setStorage('_meterCounts', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getWaterUsageThisMonth() {
    try {
      const response = await axios.get('/water-usage-this-months');
      setStorage('_waterUsageThisMonths', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getWaterUsageLastMonth() {
    try {
      const response = await axios.get('/water-usage-last-months');
      setStorage('_waterUsageLastMonths', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getWaterUsageZero() {
    try {
      const response = await axios.get('/water-usage-zeros');
      setStorage('_waterUsageZeros', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getWaterUsageOneToTen() {
    try {
      const response = await axios.get('/water-usage-one-to-tens');
      setStorage('_waterUsageOneToTens', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getWaterUsageGreaterTen() {
    try {
      const response = await axios.get('/water-usage-greater-tens');
      setStorage('_waterUsageGreaterTens', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getBillReleaseStatus() {
    try {
      const response = await axios.get('/bill-release-statuses');
      setStorage('_billReleaseStatuses', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getPaymentThisMonth() {
    try {
      const response = await axios.get('/payment-this-months');
      setStorage('_paymentThisMonths', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getReadingThisMonth() {
    try {
      const response = await axios.get('/reading-this-months');
      setStorage('_readingThisMonths', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getPaymentEffectiveTotalLastMonth() {
    try {
      const response = await axios.get('/payment-effective-total-last-months');
      setStorage('_paymentEffectiveTotalLastMonths', response);
    } catch (error) {
      console.error(error);
    }
  }

  async function getPaymentEfficientTotalLastMonth() {
    try {
      const response = await axios.get('/payment-efficient-total-last-months');
      setStorage('_paymentEfficientTotalLastMonths', response);
    } catch (error) {
      console.error(error);
    }
  }

  getAccessToken();
  setTimeout(() => { setHeaderToken() }, 1000);

  setTimeout(() => {
    getBranch();
    getBillThisMonth();
    getBillLastMonth();
    getPaymentEfficient();
    getPaymentEffective();
    getPaymentToday();
    getPaymentStatus();
    getPaymentThisMonth();
    getPaymentEffectiveTotalLastMonth();
    getPaymentEfficientTotalLastMonth();
  }, 1500);

  setTimeout(() => {
    getMeterCount();
    getWaterUsageZero();
    getWaterUsageOneToTen();
    getWaterUsageGreaterTen();
    getWaterUsageThisMonth();
    getWaterUsageLastMonth();
    getBillReleaseStatus();
    getReadingThisMonth();
  }, 3000);

  setInterval(() => {
    getPaymentEfficient();
    getPaymentEffective();
    getPaymentToday();
    getPaymentStatus();
  }, 60 * 1000);

  setInterval(() => {
    getMeterCount();
    getWaterUsageZero();
    getWaterUsageOneToTen();
    getWaterUsageGreaterTen();
    getWaterUsageThisMonth();
    getBillReleaseStatus();
  }, 5 * 60 * 1000);

  setInterval(() => {
    getBranch();
    getBillThisMonth();
    getBillLastMonth();
    getWaterUsageLastMonth();
    getPaymentThisMonth();
    getReadingThisMonth();
    getPaymentEffectiveTotalLastMonth();
    getPaymentEfficientTotalLastMonth();
    getAccessToken();
    setHeaderToken();
  }, 30 * 60 * 1000);
</script>

<template>
  <main class="container-fluid my-3">
    <div class="row g-3">
      <div class="col-lg-12">
        <div class="card border-0">
          <div class="card-body py-2">
            <div class="row">
              <div class="col-md-12 col-lg-6 fs-4">
                <div class="d-none d-lg-block"><a href="./" class="text-decoration-none text-white"><i class="bi-activity me-2"></i> Dashboard Billing System</a></div>
                <div class="d-lg-none text-center"><a href="./" class="text-decoration-none text-white"><i class="bi-activity me-2"></i> Dashboard Billing System</a></div>
              </div>
              <div class="col-md-12 col-lg-6 fw-lighter d-flex align-items-center justify-content-end d-none d-lg-flex">
                <LatestUpdate />
              </div>
              <div class="col-md-12 col-lg-6 fw-lighter d-flex align-items-center justify-content-center d-lg-none">
                <LatestUpdate />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-3">
        <DrdBerjalan />
      </div>
      <div class="col-lg-3">
        <EfisiensiPenerimaan />
      </div>
      <div class="col-lg-3">
        <EfektifitasPenerimaan />
      </div>
      <div class="col-lg-3">
        <ProyeksiPendapatan />
      </div>
      <div class="col-lg-6">
        <PenerimaanByKopel />
      </div>
      <div class="col-lg-6">
        <BacaanByKopel />
      </div>
      <div class="col-lg-6">
        <GrafikPenerimaan />
      </div>
      <div class="col-lg-6">
        <GrafikBacaan />
      </div>
    </div>
  </main>
</template>
