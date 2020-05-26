// 树形节点相关
export default {
  state: {
    nodes: [] // 树形节点数据
  },
  getters: {
    // 获取树形节点数据
    getNodes (state) {
      return state.nodes
    }
  },
  mutations: {
    // 设置树形节点数据
    setNodes (state, nodes) {
      state.nodes = nodes
    }
  },
  actions: {
    // 更新树形节点数据
    updateNodes ({
      commit
    }, nodes) {
      commit('setNodes', nodes)
    }
  }
}
