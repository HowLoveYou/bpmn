const app = {
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    }
  },
  actions: {
    async getToken({
      commit
    }, token) {
      setTimeout(() => {
        commit('SET_TOKEN', token)
      }, 500)
    },
  }
}
export default app;