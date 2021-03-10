<template>
  <form>
    <div class="user" v-if="showLoginData">
      <label for="name">Nome</label>
      <input type="text" name="name" id="name" v-model="name" />

      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="email" />

      <label for="password">Senha</label>
      <input type="password" name="password" id="password" v-model="password" />
    </div>
    <label for="zipcode">CEP</label>
    <input type="text" name="zipcode" id="zipcode" v-model="zipcode" @keyup="fillAddress" />

    <label for="street">Rua/Av.</label>
    <input type="text" name="street" id="street" v-model="street" />

    <label for="streetNumber">Número</label>
    <input type="text" name="streetNumber" id="streetNumber" v-model="streetNumber" />

    <label for="neighborhood">Bairro</label>
    <input type="text" name="neighborhood" id="neighborhood" v-model="neighborhood" />

    <label for="city">Cidade</label>
    <input type="text" name="city" id="city" v-model="city" />

    <label for="state">Estado</label>
    <input type="text" name="state" id="state" v-model="state" />
    <div class="btn">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import { mapFields } from "@/helpers.js";
import { getZipCode } from "@/services.js";

export default {
  name: "UserForm",
  computed: {
    ...mapFields({
      fields: [
        "name",
        "email",
        "password",
        "zipcode",
        "street",
        "streetNumber",
        "neighborhood",
        "city",
        "state"
      ],
      base: "user",
      mutation: "UPDATE_USER"
    }),
    showLoginData() {
      return !this.$store.state.logged || this.$route.name === "ProfileEdit";
    }
  },
  methods: {
    fillAddress() {
      const zipcode = this.zipcode.replace(/\D/g, "");
      if (zipcode.length === 8) {
        getZipCode(zipcode).then(r => {
          this.street = r.data.logradouro;
          this.neighborhood = r.data.bairro;
          this.city = r.data.localidade;
          this.state = r.data.uf;
        });
      }
    }
  }
};
</script>

<style scoped>
form,
.user {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.user {
  grid-column: 1/3;
}
.btn {
  margin-top: 10px;
  grid-column: 2;
}

.btn .button {
  max-width: 100%;
}
</style>