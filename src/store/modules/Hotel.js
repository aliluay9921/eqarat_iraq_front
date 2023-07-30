import Vue from "vue";
import axios from "axios";

const hotel = {
    namespaced: true,
    state: () => ({
        hotels: [],
        hotels_state: "done",
        table_loading: false,
        hotelQuery: "",
        pageCount: 1,
        params: {
            dropdown: true,
            page: 1,
            itemsPerPage: 3,
        },
    }),
    getters: {},
    mutations: {
        hotels_success(state, hotels) {
            state.hotels.splice(0, state.hotels.length)
            hotels.forEach(element => {
                state.hotels.push(element)
            });
            state.hotels_state = "done"
            state.table_loading = false

        },
        hotels_request(state) {
            state.hotels_state = "loading";
        },

        hotels_error(state) {
            state.hotels_state = "error";
        },

        delete_hotel(state, hotel) {
            let index = state.hotels.findIndex((e) => e.id == hotel.id);
            state.hotels.splice(index, 1)
            state.hotels_state = "done";
            state.table_loading = false;
        },


    },
    actions: {
        async resetFields({ state }) {
            state.hotels_state = "done";
            state.hotels = [];
            state.table_loading = false;
            state.params = {
                dropdown: true,
                page: 1,
                itemsPerPage: 10,
            };
        },
        async getHotels({ commit, state, dispatch, rootState }) {
            if (state.hotels_state != "done") return -1;
            state.table_loading = true;
            console.log("here")
            let data = state.params;

            let skip = (data.page - 1) * data.itemsPerPage;
            let limit = data.itemsPerPage;
            let query = "";
            if (
                state.hotelQuery != undefined &&
                state.hotelQuery != null &&
                state.hotelQuery.length > 0
            ) query = `&query=${state.hotelQuery}`;
            return new Promise((resolve, reject) => {

                axios({
                    url: `${rootState.server}` + "/api/get_hotels" + "?skip=" + skip +
                        "&limit=" +
                        limit +
                        query,
                    method: "GET",
                }).then(resp => {

                    state.table_loading = false;
                    state.pageCount = resp.data.count;
                    commit('hotels_success', resp.data.result)
                    dispatch("snackbarToggle", { toggle: true, text: resp.data.message }, { root: true });
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    reject(err);
                    commit("hotels_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );
                    console.warn(err);
                });
            })

        },

        async deleteHotel({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve) => {
                commit("hotels_request");
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
                    commit("hotels_error");
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
export default hotel;
