import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Loader from '@/components/Loader.vue';

Vue.config.productionTip = false
Vue.component("Loader", Loader)

Vue.filter("currency", value => {
  value = Number(value)
  if (!isNaN(value)) {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
  } else {
    return ""
  }

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
