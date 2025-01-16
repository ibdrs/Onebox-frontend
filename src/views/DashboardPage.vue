<script setup>
  import { ref, onMounted } from 'vue';
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';

  const stateLocked = ref(true);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const user = JSON.parse(localStorage.getItem('user'));
  const userID = user.data.klantID;

  const fetchBoxState = async () => {
    try {
      const response = await fetch(`${API_URL}Box/${userID}/state`, {
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
    return fetch(`${API_URL}Box/${userID}/unlock`, {
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
    return fetch(`${API_URL}Box/${userID}/lock`, {
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
    fetchBoxState();
  });
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
      <h2 class="title">
        Onebox
      </h2><!-- Action Buttons -->
      <div class="button_group">
        <button @click="unlockBox" :disabled="stateLocked">Open Onebox</button>
        <button @click="lockBox" :disabled="!stateLocked">Sluit Onebox</button>
      </div>

      <div class="status_display">
        <div class="status"
             :class="{ locked: stateLocked, unlocked: !stateLocked }">
          <i class="status_icon"
             :class="stateLocked ? 'fas fa-lock' : 'fas fa-unlock-alt'"></i>
          <p class="status_text">
            {{ stateLocked ? 'De Onebox is ontgrendeld' : 'De Onebox is vergrendeld' }}
          </p>
        </div>
      </div>

    </div>
  </main>

  <Footer />
</template>

<style scoped>
  .page_container {
    font-family: Arial, sans-serif;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .page_inner_container {
    text-align: center;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    background: var(--color-background-soft);
    padding: 13px;
    border-radius: 10px;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.6);
  }

  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #fff;
  }

  .status_display {
    margin: 20px 0;
  }

  <style scoped >
  .status {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 10px 20px;
    border-radius: 8px;
    font-size: 1.5rem;
    font-weight: bold;
    color: #fff; /* The color of the text */
    background: transparent; /* Remove the background */
    text-shadow: 0 0 10px rgba(231, 76, 60, 0.8), 0 0 20px rgba(231, 76, 60, 0.6); /* Default glow for locked */
    transition: text-shadow 0.3s ease, transform 0.2s ease;
  }

  /* Locked state glow */
  .status.locked {
    text-shadow: 0 0 10px rgba(231, 76, 60, 0.8), 0 0 15px rgba(231, 76, 60, 0.6), 0 0 30px rgba(231, 76, 60, 0.4); /* Red glow for locked */
  }

  /* Unlocked state glow */
  .status.unlocked {
    text-shadow: 0 0 10px rgba(46, 204, 113, 0.8), 0 0 15px rgba(46, 204, 113, 0.6), 0 0 30px rgba(46, 204, 113, 0.4); /* Green glow for unlocked */
  }


  .status_icon {
    font-size: 1.8rem;
  }

  .status_text {
    margin: 0;
  }


  .button_group {
    display: flex;
    gap: 10px;
    justify-content: center;
  }

  .button_group button {
    font-size: 1rem;
    padding: 15px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }
</style>
