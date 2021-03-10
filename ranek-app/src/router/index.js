import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../components/Products/Product';
import Login from '../views/Login.vue';
import UserProfile from '../views/user/UserProfile.vue';
import UserProducts from '../views/user/UserProducts.vue';
import UserProductsPurchased from '../views/user/UserProductsPurchased.vue';
import UserProductsSales from '../views/user/UserProductsSales.vue';
import UserProfileEdit from '../views/user/UserProfileEdit.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/produto/:id",
    name: "Product",
    component: Product,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/usuario',
    component: UserProfile,
    children: [
      {
        path: "",
        name: "User",
        component: UserProducts
      },
      {
        path: "compras",
        name: "Purchased",
        component: UserProductsPurchased
      },
      {
        path: "vendas",
        name: "Sales",
        component: UserProductsSales
      },
      {
        path: "editarperfil",
        name: "ProfileEdit",
        component: UserProfileEdit
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return window.scrollTo({ top: 0, behavior: "smooth" })
  }
})

export default router
