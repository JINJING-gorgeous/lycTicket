import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //记录当前是否已登录
    //应该去sessionStorage中找isLogin  若=1则改为true，否则初始化为false
    isLogin:sessionStorage.getItem('isLogin')==1,  
    userInfo:sessionStorage.getItem('userInfo')?JSON.parse(sessionStorage.getItem('userInfo')):"",
  },
  mutations: {
    //表示登录成功，可以在此修改isLogin的状态为true
    //state是vuex在执行loginSuccess方法时自动传入的状态对象
    //$store.commit('loginSuccess',自定参数)
    loginSuccess(state,userInfo,isVip){
      state.isLogin = true;//把登录状态改为true即可
      state.userInfo = userInfo;
    }
  },
  actions: {
  },
  modules: {
  }
})
