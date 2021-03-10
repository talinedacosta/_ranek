<template>
  <section>
    <UserForm>
      <button class="button" @click.prevent="updateUser">Atualizar usuário</button>
    </UserForm>
  </section>
</template>

<script>
import UserForm from "@/components/UserForm";
import { api } from "@/services.js";
export default {
  name: "UserProfileEdit",
  components: {
    UserForm
  },
  methods: {
    updateUser() {
      api
        .put(`/usuario/${this.$store.state.user.id}`, this.$store.state.user)
        .then(() => {
          this.$store.dispatch("getUser");
          this.$router.push({ name: "User" });
        })
        .catch(error => {
          console.log(error.r);
        });
    }
  }
};
</script>

<style>
</style>