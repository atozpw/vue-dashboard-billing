<script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  import { numberFormat } from '@/helpers/numberFormat';
import { getStorage } from '@/helpers/getStorage';

  const dateThisMonth = ref([]);
  const dataBacaan = ref([]);

  const series = ref([{name: 'Jumlah', data: []}]);

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const days = new Date(year, month + 1, 0).getDate();

  function createDateThisMonth() {
    for (let day = 1; day <= days; day++) {
      dateThisMonth.value.push(new Date(year, month, day, 7, 0, 0).toISOString());
    }
  }

  function refresh() {
    let itemCount = [];

    dataBacaan.value = getStorage('_readingThisMonths');

    for (let day = 1; day <= days; day++) {
      let count = 0;

      if (dataBacaan) {
        for (let i in dataBacaan.value) {
          const date = new Date(dataBacaan.value[i].date);
          if (date.getDate() === day) {
            count = dataBacaan.value[i].count;
          }
        }
      }

      itemCount.push(count);
    }

    series.value = [{name: 'Jumlah', data: itemCount}];
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
        <div class="fs-5 fw-bold">Grafik Isi Koreksi DSML</div>
        <div class="fw-lighter text-body-tertiary">Periode Maret 2024</div>
      </div>
      <div>
        <apexchart type="area" height="350" :options="options" :series="series"></apexchart>
      </div>
    </div>
  </div>
</template>
