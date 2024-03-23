<script setup>
  import { ref } from 'vue';
  import { getStorage } from '@/helpers/getStorage';

  const isOnline = ref(true);
  const latestUpdate = ref('00/00/0000, 00:00:00');

  function getLatestUpdate() {
    const storage = getStorage('_latestUpdate');
    latestUpdate.value = storage;

    isOnline.value = (window.navigator.onLine) ? true : false;
  }

  setInterval(() => {getLatestUpdate()}, 1000);
</script>

<template>
  <span class="me-3">Update Terakhir: {{ latestUpdate }}</span>
  <div v-if="isOnline" class="spinner-grow spinner-grow-sm text-success" role="status">
    <span class="visually-hidden">Online</span>
  </div>
  <i v-else class="bi-circle-fill text-danger"></i>
</template>
