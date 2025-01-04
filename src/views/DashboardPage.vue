<script setup>
  import { ref, onMounted } from 'vue';
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';

  const stateLocked = ref(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const userID = user.data.customerID;

  const fetchBoxState = async () => {
    try {
      const response = await fetch(`https://localhost:7230/api/Box/${userID}/state`, {
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
    return fetch(`https://localhost:7230/api/Box/${userID}/unlock`, {
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
    return fetch(`https://localhost:7230/api/Box/${userID}/lock`, {
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
</script>

<script>
  export default {
    name: 'Dashboard',
    computed: {
      currentUser() {
        return this.$store.state.auth.user.data;
      }
    },
    mounted() {
      if (!this.currentUser) {
        this.$router.push('/login');
      }
    }
  };

  onMounted(() => {
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
