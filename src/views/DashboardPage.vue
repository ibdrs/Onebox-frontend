<script setup>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
  import { ref } from 'vue';

  const stateOpened = ref(false);

  const unlockBox = () => {
    //let user = localStorage.get('user');
    //console.log(user);
    return fetch('https://192.168.152.36/onebox_api/box/unlock/1', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(() => {
      stateOpened.value = true;
    });
  };

  const lockBox = () => {
    //let user = localStorage.get('user');
    //console.log(user);
    return fetch('https://192.168.152.36/onebox_api/box/lock/1', {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(() => {
      stateOpened.value = false;
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
</script>
<template>
  <Header />

  <main class="page_container">
    <div class="page_inner_container">
      <h2>Onebox</h2>
      <button @click="unlockBox" :disabled="stateOpened">Open Onebox</button>
      <button @click="lockBox" :disabled="!stateOpened">Sluit Onebox</button>
      <!-- Insert the LogoutButton component -->
    </div>
  </main>

  <Footer />
</template>

<style scoped>

</style>
