import Vue from "vue";
import axios from "axios";

const user = {
    namespaced: true,
    state: () => ({
        users: [],
        users_state: "done",
        table_loading: false,
        userQuery: "",
        pageCount: 1,
        params: {
            dropdown: true,
            page: 1,
            itemsPerPage: 3,
        },
    }),
    getters: {},
    mutations: {
        users_success(state, users) {
            state.users.splice(0, state.users.length)
            users.forEach(element => {
                state.users.push(element)
            });
            state.users_state = "done"
            state.table_loading = false

        },
        users_request(state) {
            state.users_state = "loading";
        },

        users_error(state) {
            state.users_state = "error";
        },

        active_user(state, user) {
            let index = state.users.findIndex((e) => e.id === user.id);
            Vue.set(state.users, index, user);
            state.users_state = "done";
            state.table_loading = false;
        },


    },
    actions: {
        async resetFields({ state }) {
            state.users_state = "done";
            state.users = [];
            state.table_loading = false;
            state.params = {
                dropdown: true,
                page: 1,
                itemsPerPage: 10,
            };
        },
        async getUsers({ commit, state, dispatch, rootState }) {
            if (state.users_state != "done") return -1;
            state.table_loading = true;
            console.log("here")
            let data = state.params;

            let skip = (data.page - 1) * data.itemsPerPage;
            let limit = data.itemsPerPage;
            let query = "";
            if (
                state.userQuery != undefined &&
                state.userQuery != null &&
                state.userQuery.length > 0
            ) query = `&query=${state.userQuery}`;
            return new Promise((resolve, reject) => {

                axios({
                    url: `${rootState.server}` + "/api/get_all_users" + "?skip=" + skip +
                        "&limit=" +
                        limit +
                        query,
                    method: "GET",
                }).then(resp => {

                    state.table_loading = false;
                    state.pageCount = resp.data.count;
                    commit('users_success', resp.data.result)
                    dispatch("snackbarToggle", { toggle: true, text: resp.data.message }, { root: true });
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    reject(err);
                    commit("users_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );
                    console.warn(err);
                });
            })

        },

        async activeUser({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve) => {
                commit("users_request");
                axios({
                    url: `${rootState.server}` + "/api/change_active_user",
                    data: { id: data.id },
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "PUT",
                }).then(resp => {
                    state.table_loading = false;
                    // console.log(resp)
                    commit("active_user", resp.data.result[0]);
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    commit("users_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );

                    console.warn(err);
                });
            });
        },



    }

}
export default user;
