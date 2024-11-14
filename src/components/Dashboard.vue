<script setup>
  import { ref } from 'vue';
  import { auth } from '../firebase';

  const isLockerOpen = ref(false);

  const openLocker = () => {
    isLockerOpen.value = true;
    alert('Locker opened successfully!');
  };

  const closeLocker = () => {
    isLockerOpen.value = false;
    alert('Locker closed successfully!');
  };
</script>

<template>
  <div class="dashboard">
    <h2>Locker Controls</h2>
    <button @click="openLocker" :disabled="isLockerOpen">Open Locker</button>
    <button @click="closeLocker" :disabled="!isLockerOpen">Close Locker</button>
    <!-- Insert the LogoutButton component -->
  </div>
</template>

<style scoped>
  /* Add styles for the dashboard */
  .dashboard {
    text-align: center;
    padding: 2rem;
  }

  button {
    margin: 1rem;
  }
</style>
