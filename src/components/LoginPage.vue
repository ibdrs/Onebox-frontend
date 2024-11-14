<script setup>
import { ref } from 'vue';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const login = async () => {
  try {
    error.value = '';
    await signInWithEmailAndPassword(auth, email.value, password.value);
    router.push('/dashboard');
  } catch (e) {
    error.value = e.message;
  }
};
</script>

<template>
  <div class="login-page">
    <h2>Login</h2>
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="login">Log In</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
  .login-page {
    text-align: center;
    padding: 2rem;
  }

  .error {
    color: red;
  }
</style>
