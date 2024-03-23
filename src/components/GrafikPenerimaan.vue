<script setup>
  import { ref } from 'vue';
  import { numberFormat } from '@/helpers/numberFormat';
  import { getStorage } from '@/helpers/getStorage';

  const dateThisMonth = ref([]);
  const dataPenerimaan = ref([]);

  const series = ref([{name: 'Total', data: []}]);

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const days = new Date(year, month + 1, 0).getDate();

  function createDateThisMonth() {
    for (let day = 1; day <= days; day++) {
      dateThisMonth.value.push(new Date(year, month, day, 7, 0, 0).toISOString());
    }
  }

  function refresh() {
    let itemAmount = [];

    dataPenerimaan.value = getStorage('_paymentThisMonths');

    for (let day = 1; day <= days; day++) {
      let amount = 0;

      if (dataPenerimaan) {
        for (let i in dataPenerimaan.value) {
          const date = new Date(dataPenerimaan.value[i].date);
          if (date.getDate() === day) {
            amount = dataPenerimaan.value[i].amount;
          }
        }
      }

      itemAmount.push(amount);
    }

    series.value = [{name: 'Total', data: itemAmount}];
  }

  createDateThisMonth();
  refresh();

  setInterval(() => {
    refresh();
  }, 5000);

  const options = {
    chart: {
      height: 350,
      type: 'area',
      zoom: false,
      toolbar: false,
      foreColor: '#fff'
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    grid: {
      strokeDashArray: 5
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: dateThisMonth.value
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'dd/MM/yyyy'
      },
      y: {
        formatter: function(value) {
          return numberFormat(value)
        }
      }
    }
  };
</script>

<template>
  <div class="card border-0">
    <div class="card-body">
      <div class="mb-3">
        <div class="fs-5 fw-bold">Grafik Penerimaan</div>
        <div class="fw-lighter text-body-tertiary">Data total penerimaan harian bulan berjalan</div>
      </div>
      <div>
        <apexchart type="area" height="350" :options="options" :series="series"></apexchart>
      </div>
    </div>
  </div>
</template>
