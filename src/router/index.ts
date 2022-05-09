import { createRouter, createWebHistory } from 'vue-router';
import nprogress from 'nprogress';
import routes from '~pages';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(() => {
  nprogress.start();
  return true;
});

router.afterEach(() => {
  nprogress.done();
});

export default router;
