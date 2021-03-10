<template>
  <section>
    <div v-if="sold">
      <h2>Vendas</h2>
      <div class="products-wrapper" v-for="(sales, index) in sold" :key="index">
        <Item v-if="sales.product" :product="sales.product">
          <p class="purchaser">
            <span>Comprador:</span>
            {{ sales.purchaser_id }}
          </p>
        </Item>
        <div class="clientAddress">
          <h3>Entrega:</h3>
          <ul v-if="sales.address">
            <li>CEP: {{ sales.address.zipcode }}</li>
            <li>
              Endereço: {{ sales.address.street }},
              {{ sales.address.streetNumber }}
            </li>
            <li>Bairro: {{ sales.address.neighborhood }}</li>
            <li>
              Cidade: {{ sales.address.city }} - {{ sales.address.state }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <h2>Você não vendeu nada ainda!</h2>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
import { mapState } from "vuex";

import Item from "@/components/Products/Item";

export default {
  name: "UserProductsSales",
  components: {
    Item,
  },
  data() {
    return {
      sold: null,
    };
  },
  computed: {
    ...mapState(["user", "logged"]),
  },
  methods: {
    getSales() {
      api.get(`/transacao?seller_id=${this.user.id}`).then((r) => {
        this.sold = r.data;
      });
    },
  },
  watch: {
    logged() {
      this.getSales();
    },
  },
  created() {
    if (this.logged) {
      this.getSales();
    }
  },
};
</script>

<style scoped>
.product-wrapper {
  margin-bottom: 40px;
}

.purchaser {
  grid-column: 2/3;
}

.purchaser span {
  color: #e80;
}

.clientAddress {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  margin: 0;
  justify-self: end;
}
</style>