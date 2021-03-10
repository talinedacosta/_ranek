<template>
  <section class="login">
    <h1>Login</h1>
    <form action>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email" />
      <label for="password">Senha</label>
      <input type="password" name="password" id="password" v-model="login.password" />
      <button class="button" @click.prevent="signIn">Entrar</button>
    </form>
    <p class="lost-password">
      <a href="/" target="_blank">Perdeu a senha? Clique aqui.</a>
    </p>
    <SignUp />
  </section>
</template>

<script>
import SignUp from "@/components/SignUp.vue";

export default {
  name: "Login",
  components: {
    SignUp
  },
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signIn() {
      this.$store.dispatch("getUser", this.login.email);
      this.$router.push("/usuario");
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  color: #87f;
}

form {
  display: grid;
}

.button {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.lost-password {
  text-align: center;
  margin: 20px auto 0 auto;
}

.lost-password a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>