<script setup>
  import { ref } from 'vue';
  import { numberFormat } from '@/helpers/numberFormat';
  import { getStorage } from '@/helpers/getStorage';

  const currentAmount = ref(0);
  const lastAmount = ref(0);
  const percent = ref(0);
  const indicatorStatus = ref('text-success');
  const indicatorArrow = ref('bi-arrow-up-short');

  function getBillThisMonthStorage() {
    const billLastMonths = getStorage('_billThisMonths');

    currentAmount.value = 0;
    if (billLastMonths) {
      billLastMonths.forEach(bill => {
        currentAmount.value += bill.amount;
      });
    }
  }

  function getBillLastMonthStorage() {
    const billLastMonths = getStorage('_billLastMonths');

    lastAmount.value = 0;
    if (billLastMonths) {
      billLastMonths.forEach(bill => {
        lastAmount.value += bill.amount;
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
      percent.value = ((currentAmount.value - lastAmount.value) * 100) / lastAmount.value;
      indicatorStatus.value = 'text-success';
      indicatorArrow.value = 'bi-arrow-up-short';
    }
  }

  getBillThisMonthStorage();
  getBillLastMonthStorage();
  getPercentage();

  setInterval(() => {
    getBillThisMonthStorage();
    getBillLastMonthStorage();
    getPercentage();
  }, 2500);
</script>

<template>
  <div class="card border-0">
    <div class="card-body">
      <div class="fw-lighter">DRD Berjalan</div>
      <span class="fs-3 fw-bold">
        {{ numberFormat(currentAmount) }}
        <div :class="indicatorStatus" class="fs-5 fw-semibold"><i :class="indicatorArrow"></i> {{ numberFormat(percent, 2) }}%</div>
      </span>
    </div>
  </div>
</template>
