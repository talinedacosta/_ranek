import Vue from 'vue'
import Vuex from 'vuex'
import { api } from '@/services.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    logged: false,
    user: {
      id: "",
      name: "",
      email: "",
      password: "",
      zipcode: "",
      street: "",
      streetNumber: "",
      neighborhood: "",
      city: "",
      state: ""
    },
    userProducts: null
  },
  mutations: {
    UPDATE_LOGGED(state, payload) {
      state.logged = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = Object.assign(state.user, payload);
      // state.user = { ...state.user, ...payload }
    },
    UPDATE_USER_PRODUCTS(state, payload) {
      state.userProducts = payload
    },
    ADD_USER_PRODUCTS(state, payload) {
      state.userProducts.unshift(payload)
    },
  },
  actions: {
    getUser(context, payload) {
      return api.get(`/usuario/${payload}`)
        .then(r => {
          context.commit("UPDATE_USER", r.data)
          context.commit("UPDATE_LOGGED", true)
        })
    },
    createUser(context, payload) {
      context.commit("UPDATE_USER", { id: payload.email })
      return api.post("/usuario", payload)
    },
    logoutUser(context) {
      context.commit("UPDATE_USER", {
        id: "",
        name: "",
        email: "",
        password: "",
        zipcode: "",
        street: "",
        streetNumber: "",
        neighborhood: "",
        city: "",
        state: ""
      })
      context.commit("UPDATE_LOGGED", false)
    },
    getUserProducts(context) {
      api.get(`/produto?usuario_id=${context.state.user.id}`)
        .then(r => {
          context.commit("UPDATE_USER_PRODUCTS", r.data)
        })
    }
  },
  modules: {
  }
})
