import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/login.vue";
import User from "../views/User.vue";
import Post from "../views/Post.vue";
import Hotel from "../views/Hotel.vue";
import DesginCompany from "../views/DesginCompany.vue";
import sendMessage from "../views/sendMessage.vue";


import store from "../store/index";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/users",
    name: "User",
    component: User,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/posts",
    name: "Post",
    component: Post,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/hotels",
    name: "Hotel",
    component: Hotel,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/companies",
    name: "DesginCompany",
    component: DesginCompany,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/notifications",
    name: "sendMessage",
    component: sendMessage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requireNotLogin: true,
    }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// حتى اول مطب ع رابط يحولك ع لوكن
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireNotLogin)) {
    if (store.getters.isLoggedIn) {
      next("/");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
