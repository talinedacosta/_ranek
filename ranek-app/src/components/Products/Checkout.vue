<template>
  <section>
    <h2>Endereço de envio</h2>
    <UserForm>
      <button class="button" @click.prevent="checkout">Finalizar compra</button>
    </UserForm>
  </section>
</template>

<script>
import { api } from "@/services.js";
import { mapState } from "vuex";

import UserForm from "@/components/UserForm";

export default {
  name: "Checkout",
  props: ["product"],
  components: {
    UserForm
  },
  computed: {
    ...mapState(["user"]),
    purchase() {
      return {
        purchaser_id: this.user.email,
        seller_id: this.product.usuario_id,
        product: this.product,
        address: {
          zipcode: this.user.zipcode,
          street: this.user.street,
          streetNumber: this.user.streetNumber,
          neighborhood: this.user.neighborhood,
          city: this.user.city,
          state: this.user.state
        }
      };
    }
  },
  methods: {
    createTransaction() {
      return api.post("/transacao", this.purchase).then(() => {
        this.$router.push({ name: "Purchased" });
      });
    },
    checkout() {
      if (this.$store.state.logged) {
        this.createTransaction();
      } else {
        this.createUser();
      }
    },
    async createUser() {
      try {
        await this.$store.dispatch("createUser", this.$store.state.user);
        await this.$store.dispatch("getUser", this.$store.state.user.email);
        await this.createTransaction();
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.button {
  background: #e80;
}
</style>