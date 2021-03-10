<template>
  <section>
    <div v-if="product" class="product">
      <ul class="photos" v-if="product.fotos">
        <li v-for="(photo, index) in product.fotos" :key="index">
          <img :src="photo.src" :alt="photo.titulo" />
        </li>
      </ul>
      <div class="information">
        <h1>{{product.nome}}</h1>
        <p class="product-price">{{product.preco | currency}}</p>
        <p class="product-description">{{product.descricao}}</p>
        <transition mode="out-in" v-if="product.vendido === 'false'">
          <button class="button" v-if="!conclude" @click="conclude = true">Comprar</button>
          <Checkout v-else :product="product" />
        </transition>
        <button class="button" v-else disabled>Produto Vendido</button>
      </div>
    </div>
    <Loader v-else />
  </section>
</template>

<script>
import { api } from "@/services.js";
import Checkout from "@/components/Products/Checkout";

export default {
  name: "Product",
  props: ["id"],
  components: {
    Checkout
  },
  data() {
    return {
      product: null,
      conclude: false
    };
  },
  methods: {
    getProduct() {
      api.get(`/produto/${this.id}`).then(r => {
        this.product = r.data;
      });
    }
  },
  created() {
    this.getProduct();
  }
};
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px 20px;
  margin: 0 auto;
}

.product-price {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.product-description {
  font-size: 1.2rem;
}

.button {
  margin-top: 60px;
  width: 200px;
}
</style>