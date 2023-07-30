import Vue from "vue";
import axios from "axios";

const desginCompany = {
    namespaced: true,
    state: () => ({
        companies: [],
        companies_state: "done",
        table_loading: false,
        companyQuery: "",
        pageCount: 1,
        params: {
            dropdown: true,
            page: 1,
            itemsPerPage: 3,
        },
    }),
    getters: {},
    mutations: {
        companies_success(state, companies) {
            state.companies.splice(0, state.companies.length)
            companies.forEach(element => {
                state.companies.push(element)
            });
            state.companies_state = "done"
            state.table_loading = false

        },
        companies_request(state) {
            state.companies_state = "loading";
        },

        companies_error(state) {
            state.companies_state = "error";
        },

        delete_hotel(state, hotel) {
            let index = state.companies.findIndex((e) => e.id == hotel.id);
            state.companies.splice(index, 1)
            state.companies_state = "done";
            state.table_loading = false;
        },


    },
    actions: {
        async resetFields({ state }) {
            state.companies_state = "done";
            state.companies = [];
            state.table_loading = false;
            state.params = {
                dropdown: true,
                page: 1,
                itemsPerPage: 10,
            };
        },
        async getCompanies({ commit, state, dispatch, rootState }) {
            if (state.companies_state != "done") return -1;
            state.table_loading = true;
            console.log("here")
            let data = state.params;

            let skip = (data.page - 1) * data.itemsPerPage;
            let limit = data.itemsPerPage;
            let query = "";
            if (
                state.companyQuery != undefined &&
                state.companyQuery != null &&
                state.companyQuery.length > 0
            ) query = `&query=${state.companyQuery}`;
            return new Promise((resolve, reject) => {

                axios({
                    url: `${rootState.server}` + "/api/get_services" + "?skip=" + skip +
                        "&limit=" +
                        limit +
                        query,
                    method: "GET",
                }).then(resp => {

                    state.table_loading = false;
                    state.pageCount = resp.data.count;
                    commit('companies_success', resp.data.result)
                    dispatch("snackbarToggle", { toggle: true, text: resp.data.message }, { root: true });
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    reject(err);
                    commit("companies_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );
                    console.warn(err);
                });
            })

        },

        async deleteCompany({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve) => {
                commit("companies_request");
                axios({
                    url: `${rootState.server}` + "/api/delete_hotel",
                    data: { hotel_id: data.id },
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "delete",
                }).then(resp => {
                    state.table_loading = false;
                    // console.log(resp)
                    commit("delete_hotel", data);
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    commit("companies_error");
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
export default desginCompany;
