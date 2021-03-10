<template>
  <section>
    <h2>Crie sua conta</h2>
    <transition mode="out-in">
      <button v-if="!createAccount" class="button" @click="createAccount = true">Criar conta</button>
      <UserForm v-else>
        <button class="button" @click.prevent="createUser">Criar usuário</button>
      </UserForm>
    </transition>
  </section>
</template>

<script>
import UserForm from "@/components/UserForm.vue";

export default {
  name: "SignUp",
  components: {
    UserForm
  },
  data() {
    return {
      createAccount: false
    };
  },
  methods: {
    async createUser() {
      try {
        await this.$store.dispatch("createUser", this.$store.state.user);
        await this.$store.dispatch("getUser", this.$store.state.user.email);
        this.$router.push("/usuario");
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.button {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
</style>