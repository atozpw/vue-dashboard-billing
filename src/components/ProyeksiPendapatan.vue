<script setup>
  import { ref } from 'vue';
  import { numberFormat } from '@/helpers/numberFormat';
  import { getStorage } from '@/helpers/getStorage';

  const currentAmount = ref(0);
  const lastAmount = ref(0);
  const percent = ref(0);
  const indicatorStatus = ref('text-success');
  const indicatorArrow = ref('bi-arrow-up-short');

  function getProjectionThisMonthStorage() {
    const projectionThisMonths = getStorage('_waterUsageThisMonths');

    currentAmount.value = 0;
    if (projectionThisMonths) {
      projectionThisMonths.forEach(projection => {
        currentAmount.value += projection.amount;
      });
    }
  }

  function getProjectionLastMonthStorage() {
    const projectionLastMonths = getStorage('_waterUsageLastMonths');

    lastAmount.value = 0;
    if (projectionLastMonths) {
      projectionLastMonths.forEach(projection => {
        lastAmount.value += projection.amount;
      });
    }
  }

  function getPercentage() {
    if (lastAmount.value > currentAmount.value) {
      percent.value = ((lastAmount.value - currentAmount.value) * 100) / lastAmount.value;
      indicatorStatus.value = 'text-danger';
      indicatorArrow.value = 'bi-arrow-down-short';
    }

    if (currentAmount.value > lastAmount.value) {
      percent.value = ((currentAmount.value - lastAmount.value) * 100) / currentAmount.value;
      indicatorStatus.value = 'text-success';
      indicatorArrow.value = 'bi-arrow-up-short';
    }
  }

  getProjectionThisMonthStorage();
  getProjectionLastMonthStorage();
  getPercentage();

  setInterval(() => {
    getProjectionThisMonthStorage();
    getProjectionLastMonthStorage();
    getPercentage();
  }, 2500);
</script>

<template>
  <div class="card border-0">
    <div class="card-body">
      <div class="fw-lighter">Proyeksi Pendapatan</div>
      <span class="fs-3 fw-bold">
        {{ numberFormat(currentAmount) }}
        <div :class="indicatorStatus" class="fs-5 fw-semibold"><i :class="indicatorArrow"></i> {{ numberFormat(percent, 2) }}%</div>
      </span>
    </div>
  </div>
</template>
