<template>
  <section>
    <h2>Adicionar produtos</h2>
    <AddProducts></AddProducts>
    <h2>Seus produtos</h2>
    <transition-group v-if="userProducts" name="list" tag="ul">
      <li v-for="product in userProducts" :key="product.id">
        <ProductItem :product="product">
          <p>{{product.descricao}}</p>
          <button class="deleteButton" @click.prevent="deleteProduct(product.id)">Deletar</button>
        </ProductItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { api } from "@/services.js";

import AddProducts from "@/components/Products/Add.vue";
import ProductItem from "@/components/Products/Item.vue";

export default {
  name: "UserProducts",
  components: {
    AddProducts,
    ProductItem
  },
  computed: {
    ...mapState(["logged", "user", "userProducts"])
  },
  methods: {
    ...mapActions(["getUserProducts"]),
    deleteProduct(id) {
      const confirm = window.confirm("Deseja remover este produto?");
      if (confirm) {
        api
          .delete(`/produto/${id}`)
          .then(() => {
            this.getUserProducts();
          })
          .catch(error => {
            console.log(error.r);
          });
      }
    }
  },
  watch: {
    logged() {
      this.getUserProducts();
    }
  },
  created() {
    if (this.logged) {
      this.getUserProducts();
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.deleteButton {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url("../../assets/remove.svg") no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -140px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>