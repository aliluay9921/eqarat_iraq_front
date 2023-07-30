import Vue from "vue";
import axios from "axios";

const post = {
    namespaced: true,
    state: () => ({
        posts: [],
        posts_state: "done",
        table_loading: false,
        postQuery: "",
        pageCount: 1,
        params: {
            dropdown: true,
            page: 1,
            itemsPerPage: 3,
        },
    }),
    getters: {},
    mutations: {
        posts_success(state, posts) {
            state.posts.splice(0, state.posts.length)
            posts.forEach(element => {
                state.posts.push(element)
            });
            state.posts_state = "done"
            state.table_loading = false

        },
        posts_request(state) {
            state.posts_state = "loading";
        },

        posts_error(state) {
            state.posts_state = "error";
        },

        delete_post(state, post) {
            let index = state.posts.findIndex((e) => e.id == post.id);
            state.posts.splice(index, 1)
            state.posts_state = "done";
            state.table_loading = false;
        },


    },
    actions: {
        async resetFields({ state }) {
            state.posts_state = "done";
            state.posts = [];
            state.table_loading = false;
            state.params = {
                dropdown: true,
                page: 1,
                itemsPerPage: 10,
            };
        },
        async getPosts({ commit, state, dispatch, rootState }) {
            if (state.posts_state != "done") return -1;
            state.table_loading = true;
            console.log("here")
            let data = state.params;

            let skip = (data.page - 1) * data.itemsPerPage;
            let limit = data.itemsPerPage;
            let query = "";
            if (
                state.postQuery != undefined &&
                state.postQuery != null &&
                state.postQuery.length > 0
            ) query = `&query=${state.postQuery}`;
            return new Promise((resolve, reject) => {

                axios({
                    url: `${rootState.server}` + "/api/get_posts" + "?skip=" + skip +
                        "&limit=" +
                        limit +
                        query,
                    method: "GET",
                }).then(resp => {

                    state.table_loading = false;
                    state.pageCount = resp.data.count;
                    commit('posts_success', resp.data.result)
                    dispatch("snackbarToggle", { toggle: true, text: resp.data.message }, { root: true });
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    reject(err);
                    commit("posts_error");
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: err.response.data.message },
                        { root: true }
                    );
                    console.warn(err);
                });
            })

        },

        async deletePost({ commit, state, dispatch, rootState }, data) {
            state.table_loading = true
            return new Promise((resolve) => {
                commit("posts_request");
                axios({
                    url: `${rootState.server}` + "/api/delete_post",
                    data: { post_id: data.id },
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "delete",
                }).then(resp => {
                    state.table_loading = false;
                    // console.log(resp)
                    commit("delete_post", data);
                    dispatch(
                        "snackbarToggle",
                        { toggle: true, text: resp.data.message },
                        { root: true }
                    );
                    resolve(resp);
                }).catch((err) => {
                    state.table_loading = false;
                    commit("posts_error");
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
export default post;
