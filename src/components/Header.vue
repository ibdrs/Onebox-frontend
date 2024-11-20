<script>
  export default {
    computed: {
      currentUser() {
        return this.$store.state.auth.user;
      }
    },
    methods: {
      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      }
    }
  };
</script>

<template>
  <header class="header">
    <router-link class="logo" to="/">
      <img src="@/assets/images/logo.svg" alt="Onebox Logo" />
      <h1 class="brand">Onebox</h1>
    </router-link>

    <div class="navigation">
      <router-link class="nav" to="/">Home</router-link>
      <router-link class="nav" to="/about">Over ons</router-link>
      <router-link v-if="currentUser" class="nav" to="/dashboard">Uw box</router-link>
    </div>

    <div class="navigation right">
      <router-link v-if="!currentUser" class="nav" to="/login"> Inloggen</router-link>
      <a v-if="currentUser" class="nav" @click.prevent="logOut">Uitloggen</a>
  </div>
  </header>
</template>
