import { createWebHistory, createRouter } from "vue-router";
import routes from './routes';
import appConfig from "../../app.config";
import APIService from "../helpers/ApiService";


/* eslint-disable */

const router = createRouter({
  history: createWebHistory(import.meta.BASE_URL),
  routes,
  // Use the HTML5 history API (i.e. normal-looking routes)
  // instead of routes with hashes (e.g. example.com/#/about).
  // This may require some server configuration in production:
  // https://router.vuejs.org/en/essentials/history-mode.html#example-server-configurations
  mode: 'history',
  // Simulate native-like scroll behavior when navigating to a new
  // route and using back/forward buttons.
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, left: 0 };
    }
  },
});


router.beforeEach(async (routeTo, routeFrom, next) => {
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired);
  if (!authRequired) return next();
  try {
    var data = await APIService.get("user/validate-token");
    if(data.status == 200){
      return next();
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      next({ name: 'login', query: { redirectFrom: routeTo.fullPath } });
    }
  } catch (error) {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    next({ name: 'login', query: { redirectFrom: routeTo.fullPath } });
  }
});



router.beforeEach((routeTo, routeFrom, next) => {
  const publicPages = ['/login', '/register', '/forgot-password'];
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired);
  const loggedUser = localStorage.getItem('user');
  const accessToken = localStorage.getItem('accessToken');
  
  // Nếu route không yêu cầu xác thực hoặc route là trang công khai, cho phép truy cập mà không cần đăng nhập
  if (!authRequired || publicPages.includes(routeTo.path)) {
    return next();
  }
  
  // Nếu người dùng đã đăng nhập, cho phép truy cập
  if (loggedUser && accessToken) {
    return next();
  }

  // Nếu người dùng chưa đăng nhập, chuyển hướng đến trang đăng nhập
  return next('/login');
});

router.beforeResolve(async (routeTo, routeFrom, next) => {
  try {
    for (const route of routeTo.matched) {
      await new Promise((resolve, reject) => {
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
            if (args.length) {
              next(...args);
              reject(new Error('Redirected'));
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    }
  } catch (error) {
    return;
  }
  document.title = routeTo.meta.title + ' | ' + appConfig.title;
  next();
});

export default router;
