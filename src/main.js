import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from './plugins/vuetify'
import Axios from 'axios'
Vue.config.productionTip = false;
Vue.prototype.$http = Axios;
Vue.use(require('vue-moment'));
import LottieAnimation from "lottie-vuejs/src/LottieAnimation.vue"; // import lottie-vuejs
Vue.use(LottieAnimation); // add lottie-animation to your global scope
const token = localStorage.getItem("token");
if (token) {
  Vue.prototype.$http.defaults.headers.common["Authorization"] =
    "Bearer " + token;
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount("#app");
