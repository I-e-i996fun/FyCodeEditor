// 通用
export default {
  state: {
    theme: 'vs' // 默认主题
  },
  getters: {
    // 获取当前主题信息
    getTheme (state) {
      return state.theme
    }
  },
  mutations: {
    // 设置主题
    setTheme (state, theme) {
      state.theme = theme
      return new Promise((resolve, reject) => {
        resolve()
      })
    }
  },
  actions: {
    // 更新主题
    updateTheme ({ commit }, theme) {
      commit('setTheme', theme)
    }
  }
}
