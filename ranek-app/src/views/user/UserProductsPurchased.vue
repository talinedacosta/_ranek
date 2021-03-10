<template>
  <section>
    <div v-if="purchased">
      <h2>Compras</h2>
      <div
        class="products-wrapper"
        v-for="(purchase, index) in purchased"
        :key="index"
      >
        <Item v-if="purchase.product" :product="purchase.product">
          <p class="seller">
            <span>Vendedor:</span>
            {{ purchase.seller_id }}
          </p>
        </Item>
      </div>
    </div>
    <div v-else>
      <h3>Você não comprou nada ainda</h3>
    </div>
  </section>
</template>

<script>
import { api } from "@/services.js";
import { mapState } from "vuex";

import Item from "@/components/Products/Item";

export default {
  name: "UserProductsPurchased",
  components: {
    Item,
  },
  data() {
    return {
      purchased: null,
    };
  },
  computed: {
    ...mapState(["user", "logged"]),
  },
  methods: {
    getPurchase() {
      api.get(`/transacao?purchaser_id=${this.user.id}`).then((r) => {
        this.purchased = r.data;
      });
    },
  },
  watch: {
    logged() {
      this.getPurchase();
    },
  },
  created() {
    if (this.logged) {
      this.getPurchase();
    }
  },
};
</script>

<style scoped>
.product-wrapper {
  margin-bottom: 40px;
}

.seller {
  grid-column: 2/3;
}
.seller span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>