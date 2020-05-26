import Vue from 'vue'
import Vuex from 'vuex'

import base from './module/base'
import tree from './module/tree'

Vue.use(Vuex)

export default function () {
  const Store = new Vuex.Store({
    modules: { base, tree }
  })
  return Store
}
