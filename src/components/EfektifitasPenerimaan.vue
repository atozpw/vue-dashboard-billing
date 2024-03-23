<script setup>
  import { ref } from 'vue';
  import { numberFormat } from '@/helpers/numberFormat';
  import { getStorage } from '@/helpers/getStorage';

  const currentAmount = ref(0);
  const lastAmount = ref(0);
  const percent = ref(0);
  const indicatorStatus = ref('text-success');
  const indicatorArrow = ref('bi-arrow-up-short');

  function getPaymentEffectiveStorage() {
    const paymentEffectives = getStorage('_paymentEffectives');

    currentAmount.value = 0;
    if (paymentEffectives) {
      paymentEffectives.forEach(bill => {
        currentAmount.value += bill.amount;
      });
    }
  }

  function getPaymentEffectiveLastStorage() {
    const paymentEffectives = getStorage('_paymentEffectiveTotalLastMonths');
  
    lastAmount.value = 0;
    if (paymentEffectives) {
      lastAmount.value = paymentEffectives.amount;
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

  getPaymentEffectiveStorage();
  getPaymentEffectiveLastStorage();
  getPercentage();

  setInterval(() => {
    getPaymentEffectiveStorage();
    getPaymentEffectiveLastStorage();
    getPercentage();
  }, 2500);
</script>

<template>
  <div class="card border-0">
    <div class="card-body">
      <div class="fw-lighter">Efektifitas Penerimaan</div>
      <span class="fs-3 fw-bold">
        {{ numberFormat(currentAmount) }}
        <div :class="indicatorStatus" class="fs-5 fw-semibold"><i :class="indicatorArrow"></i> {{ numberFormat(percent, 2) }}%</div>
      </span>
    </div>
  </div>
</template>
