import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import { mutations } from './mutations'
import { getters } from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
    // 相关定义的初始属性
    state:{

    },
    actions,
    mutations,
    getters,
})