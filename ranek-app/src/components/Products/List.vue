<template>
  <section class="products-list">
    <transition mode="out-in">
      <!-- -->
      <div key="products" class="products" v-if="products && products.length">
        <div class="product" v-for="(product, index) in products" :key="index">
          <router-link :to="{name: 'Product', params: { id: product.id } }">
            <img v-if="product.fotos" :src="product.fotos[0].src" :alt="product.fotos[0].titulo" />
            <p class="product-price">{{ product.preco | currency }}</p>
            <h2 class="product-title">{{ product.nome }}</h2>
            <p class="product-description">{{ product.descricao }}</p>
          </router-link>
        </div>
        <Pagination :productsTotal="productsTotal" :productsPagination="productsPagination" />
      </div>
      <div key="no-result" class="no-result" v-else-if="products && products.length === 0">
        <p>Busca sem resultados.</p>
      </div>
      <Loader v-else key="loader" />
      <!--  -->
    </transition>
  </section>
</template>

<script>
import { api } from "@/services.js";
import { serialize } from "@/helpers.js";
import Pagination from "./Pagination.vue";

export default {
  name: "ProductsList",
  components: {
    Pagination
  },
  data() {
    return {
      products: null,
      productsTotal: 0,
      productsPagination: 9
    };
  },
  computed: {
    url() {
      const query = serialize(this.$route.query);
      return `/produto?_limit=${this.productsPagination}${query}`;
    }
  },
  methods: {
    getProducts() {
      this.products = null;
      api.get(this.url).then(r => {
        this.productsTotal = Number(r.headers["x-total-count"]);
        this.products = r.data;
      });
    }
  },
  watch: {
    url() {
      this.getProducts();
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style scoped>
.products-list {
  max-width: 1000px;
  margin: 0 auto;
}

.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.product {
  box-shadow: 0px 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.product:hover {
  box-shadow: 0px 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.product img {
  border-radius: 4px;
  margin-bottom: 4px;
}

.product-title {
  margin-bottom: 10px;
}

.product-price {
  font-weight: bold;
  color: #e80;
}

.no-result {
  text-align: center;
}
</style>
