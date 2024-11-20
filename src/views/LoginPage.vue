<script setup>
  import Header from '../components/Header.vue';
  import Footer from '../components/Footer.vue';
</script>
<script>
  import { Form, Field, ErrorMessage } from "vee-validate";
  import * as yup from "yup";

  export default {
    name: "Login",
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      const schema = yup.object().shape({
        username: yup.string().required("Username is required!"),
        password: yup.string().required("Password is required!"),
      });

      return {
        loading: false,
        message: "",
        schema,
      };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    created() {
      if (this.loggedIn) {
        this.$router.push("/dashboard");
      }
    },
    methods: {
      handleLogin(user) {
        this.loading = true;
        this.message = null;

        this.$store.dispatch("auth/login", user).then(
          () => {
            this.$router.push("/dashboard");
          },
          (error) => {
            this.loading = false;
            this.message =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
          }
        );
      },
    },
  };
</script>

<template>
  <Header />

  <main class="page_container">
    <div class="card">
      <Form @submit="handleLogin" :validation-schema="schema">
        <div class="card_body">
          <h2 class="heading">Login</h2>
          <div class="form_group">
            <label for="username">Gebruikersnaam</label>
            <Field name="username" type="text" class="form_control" />
            <ErrorMessage name="username" class="form_feedback" />
          </div>
          <div class="form_group">
            <label for="password">Wachtwoord</label>
            <Field name="password" type="password" class="form_control" />
            <ErrorMessage name="password" class="form_feedback" />
          </div>

          <div class="form_group">
            <button class="login" @click="fetchTracking" :disabled="loading">Login</button>
          </div>

          <div class="message">
            <div v-if="loading">Bezig met inloggen opvragen...</div>
            <div v-if="message" class="alert alert-danger" role="alert">{{ message }}</div>
          </div>
        </div>
      </Form>
    </div>
  </main>

  <Footer />
</template>
