import { createStore } from "vuex";

export default createStore({
  state: {
    token: JSON.parse(localStorage.getItem("token")),
  },
  getters: {},
  mutations: {
    // 登录
    Login(state, token) {
      state.token = {
        level: token.level,
        loginNo: token.loginNo,
      };
      localStorage.setItem("token", JSON.stringify(state.token));
    },

    // 注销
    Logout(state) {
      localStorage.removeItem("token");
    },
  },
  actions: {},
  modules: {},
});
