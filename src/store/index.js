import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

import User from '../store/modules/User'
import Post from '../store/modules/Post'
import Hotel from '../store/modules/Hotel'
import DesginCompany from '../store/modules/DesginCompany'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    server: "http://backend.eqarat-iraq.com",
    // server: "http://127.0.0.1:8000",
    statistics: [],
    snackbar: false,
    textSnackbar: "",
    isLoggedIn: false,
    token: localStorage.token,
    status: "",
    user_type: localStorage.getItem("user_type"),
    full_name: localStorage.getItem("full_name"),

  },
  getters: {
    isLoggedIn: (state) => !!state.token,

  },
  mutations: {
    auth_success(state, token) {
      state.token = token;
      state.status = "done";
    },
    auth_request(state) {
      state.status = "loading";
    },
    auth_error(state) {
      state.status = "error";
    },
    get_statistics(state, data) {
      console.log(data)
      state.statistics.push(data);
    },
    logout(state) {
      state.status = null;
      state.token = null;
    },
  },
  actions: {
    async resetFields({ state }) {
      state.token = null;
      state.isLoggedIn = false;
      state.status = "";
      state.user_type = -1;

    },
    snackbarToggle: function ({ state }, data) {
      if (data.toggle == false) {
        state.snackbar = data.toggle;
      } else {
        state.snackbar = data.toggle;
        state.textSnackbar = data.text;
      }
    },
    login({ commit, state }, data) {
      console.log(data);
      return new Promise((resolve, reject) => {
        commit("auth_request");
        axios({
          url: `${state.server}` + "/api/login",
          data: data,
          method: "POST",
        })
          .then((resp) => {
            console.log(resp);
            const token = resp.data.token;
            localStorage.setItem("token", token);
            Vue.prototype.$http.defaults.headers.common["Authorization"] =
              "Bearer " + token;
            commit("auth_success", token);
            resolve(resp);
          })
          .catch((err) => {
            console.log(err);
            commit("auth_error");
            localStorage.removeItem("token");

            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        resolve();
      });
    },

    sendMessage({ commit, state, dispatch }, data) {
      return new Promise((resolve, reject) => {
        axios({
          url: `${state.server}` + "/api/sendNotification",
          data: data,
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        })
          .then((resp) => {
            dispatch(
              "snackbarToggle",
              { toggle: true, text: resp.data.message },
              { root: true }
            );
            resolve(resp);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
    // getStatistics({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     axios({
    //       url: `${state.server}` + "/api/get_statistics",
    //       method: "GET",
    //     })
    //       .then((resp) => {
    //         commit("get_statistics", resp.data.result);
    //         resolve(resp);
    //       })
    //       .catch((err) => {
    //         reject(err);
    //       });
    //   });
    // }
  },
  modules: {
    User,
    Post,
    Hotel,
    DesginCompany
  },
});
