<script setup>
  import TrackAndTrace from './TrackAndTrace.vue';
</script>

<template>
  <div class="homepage-container">
    <!-- Header Section -->
    <header class="header">
      <div class="logo-section">
        <img src="@/assets/images/logo.svg" alt="Onebox Logo" class="logo" />
        <h1 class="brand-name">Onebox</h1>
      </div>

      <!-- Login Button -->
      <div class="login-btn">
        <router-link to="/login">
          <button class="login-button">Login</button>
        </router-link>
      </div>
    </header>

    <!-- Main Content Section -->
    <main class="main-content">
      <TrackAndTrace />
    </main>

    <!-- Footer Section -->
    <footer class="footer">
      <div class="footer-content">
        <!-- Legal Links -->
        <div class="legal-links">
          <a href="/privacy">Privacy Policy</a> |
          <a href="/terms">Terms of Use</a> |
          <a href="/cookie">Cookie Policy</a>
        </div>

        <!-- Contact Information -->
        <div class="contact-info">
          <p><strong>Contact Us:</strong></p>
          <p>Phone: +123 456 7890</p>
          <p>Email: <a href="mailto:contact@onebox.com">contact@onebox.com</a></p>
        </div>

        <!-- Copyright Section -->
        <div class="copyright">
          <p>&copy; 2024 Onebox. All rights reserved.</p>
          <p>Powered by Onebox Tech</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
  @use "../assets/main.scss";

  .homepage-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--color-background);
  }

  .header {
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    background-color: var(--color-background-soft);
    border-bottom: 1px solid var(--color-border);
  }

  .logo-section {
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    padding: 1rem;
  }

  .logo {
    width: 50px;
    height: 50px;
    margin-right: 1rem;
  }

  .brand-name {
    font-size: 1.5rem;
    color: var(--color-heading);
    font-weight: bold;
  }

  .main-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background-color: var(--color-background-soft);
  }

  .footer {
    padding: 2rem;
    background-color: var(--color-background-soft);
    border-top: 1px solid var(--color-border);
    color: var(--color-text);
    font-size: 0.875rem;
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .legal-links {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .legal-links a {
    text-decoration: none;
    color: var(--color-text);
  }

  .legal-links a:hover {
    color: #646cff; /* Adjust hover color */
  }

  .contact-info {
    text-align: center;
    margin-bottom: 1.5rem;
  }


  a {
    color: var(--color-text);
    text-decoration: none;

    &:hover {
      color: #646cff; /* Adjust hover color */
    }
  }

  .copyright {
    text-align: center;
  }

  .copyright p {
    margin: 0.5rem 0;
  }

  .login-btn {
    position: absolute;
    right: 1rem;
    top: 1rem;
  }

  .login-button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: var(--color-primary);
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }

  .login-button:hover {
    background-color: var(--color-primary-dark);
  }
</style>
