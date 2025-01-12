<script setup>
  import { ref, onMounted } from 'vue';
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';

  const stateLocked = ref(true);
  const apiURL = import.meta.env.VITE_API_BASE_URL;

  const user = JSON.parse(localStorage.getItem('user'));
  const userID = user.data.customerID;

  const fetchBoxState = async () => {
    try {
      const response = await fetch(`${apiURL}Box/${userID}/state`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });

      const state = await response.json();
      stateLocked.value = state === 'locked';
    } catch (error) {
      console.error('Error fetching box state:', error);
    }
  };

  const unlockBox = () => {
    //let user = localStorage.getItem('user');
    //console.log(user);
    return fetch(`${apiURL}Box/${userID}/unlock`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then((data) => {
      stateLocked.value = true;
      console.log('Box unlocked:', data);
    });
  };

  const lockBox = () => {
    //let user = localStorage.getItem('user');
    //console.log(user);
    return fetch(`${apiURL}Box/${userID}/lock`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then((data) => {
      stateLocked.value = false;
      console.log('Box locked:', data);
    });
  };

  onMounted(() => {
    if (!user) {
      console.error('User not found in localStorage');
      
      window.location.href = '/login';
      return;
    }
    fetchBoxState();
  });
</script>

<template>
  <Header />

  <main class="page_container">
    <div class="page_inner_container">
      <h2>Onebox</h2>
      <button @click="unlockBox" :disabled="stateLocked">Open Onebox</button>
      <button @click="lockBox" :disabled="!stateLocked">Sluit Onebox</button>
      <!-- Insert the LogoutButton component -->
    </div>
  </main>

  <Footer />
</template>

<style scoped>

</style>
