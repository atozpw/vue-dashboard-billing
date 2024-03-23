<script setup>
  import { ref } from 'vue';
  import { numberFormat } from '@/helpers/numberFormat';
  import { getStorage } from '@/helpers/getStorage';

  const currentAmount = ref(0);
  const lastAmount = ref(0);
  const percent = ref(0);
  const indicatorStatus = ref('text-success');
  const indicatorArrow = ref('bi-arrow-up-short');

  function getPaymentEfficientStorage() {
    const paymentEfficients = getStorage('_paymentEfficients');

    currentAmount.value = 0;
    if (paymentEfficients) {
      paymentEfficients.forEach(bill => {
        currentAmount.value += bill.amount;
      });
    }
  }

  function getPaymentEfficientLastStorage() {
    const paymentEfficients = getStorage('_paymentEfficientTotalLastMonths');

    lastAmount.value = 0;
    if (paymentEfficients) {
      lastAmount.value = paymentEfficients.amount;
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

  getPaymentEfficientStorage();
  getPaymentEfficientLastStorage();
  getPercentage();

  setInterval(() => {
    getPaymentEfficientStorage();
    getPaymentEfficientLastStorage();
    getPercentage();
  }, 2500);
</script>

<template>
  <div class="card border-0">
    <div class="card-body">
      <div class="fw-lighter">Efisiensi Penerimaan</div>
      <span class="fs-3 fw-bold">
        {{ numberFormat(currentAmount) }}
        <div :class="indicatorStatus" class="fs-5 fw-semibold"><i :class="indicatorArrow"></i> {{ numberFormat(percent, 2) }}%</div>
      </span>
    </div>
  </div>
</template>
