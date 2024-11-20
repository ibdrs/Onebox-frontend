import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.Vue';
import AboutPage from './views/AboutPage.Vue';
import LoginPage from './views/LoginPage.vue';
import DashboardPage from './views/DashboardPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/about', component: AboutPage },
  { path: '/login', component: LoginPage },
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true }, },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login', '/about'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired) {
    if (localStorage.getItem('user')) {
      let data = JSON.parse(localStorage.getItem('user'));
      if (!data.accessToken) {
        next('/login');
      } else {
        next();
      }
    } else {
      next('/login');
    }

  } else {
    next();
  }
});

export default router;
