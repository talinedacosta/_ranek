<template>
  <section class="userProfile">
    <nav class="sidenav">
      <ul>
        <li>
          <router-link :to="{name: 'User'}">Produtos</router-link>
        </li>
        <li>
          <router-link :to="{name: 'Purchased'}">Compras</router-link>
        </li>
        <li>
          <router-link :to="{name: 'Sales'}">Vendas</router-link>
        </li>
        <li>
          <router-link :to="{name: 'ProfileEdit'}">Editar usuário</router-link>
        </li>
        <li>
          <button class="btn" @click.prevent="logout">Deslogar</button>
        </li>
      </ul>
    </nav>
    <transition mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: "UserProfile",
  methods: {
    logout() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.userProfile {
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  max-width: 900px;
  margin: 40px auto;
  grid-gap: 30px;
  padding: 20px;
}

.sidenav li a,
.sidenav button {
  padding: 10px;
  display: block;
  background: #f4f7fc;
  margin-bottom: 10px;
  border-radius: 4px;
}

.sidenav li a.router-link-exact-active,
.sidenav a:hover,
.sidenav button:hover {
  background: #87f;
  color: #fff;
}

.sidenav button {
  color: #345;
  border: none;
  width: 100%;
  font-size: 1rem;
  text-align: left;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  cursor: pointer;
}

@media screen and (max-width: 500px) {
  .userProfile {
    grid-template-columns: 1fr;
    margin: 0 auto;
  }
}
</style>