<template>
  <div class="product-item" v-if="product">
    <router-link :to="{name: 'Product', params: {id: product.id}}">
      <img
        class="image"
        v-if="product.fotos"
        :src="product.fotos[0].src"
        :alt="product.fotos[0].titulo"
      />
      <p>Ver produto</p>
    </router-link>
    <div class="information">
      <p>{{product.preco | currency}}</p>
      <h2>{{product.nome}}</h2>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "ProductItem",
  props: ["product"]
};
</script>

<style scoped>
.product-item {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
  position: relative;
}

.information {
  align-self: end;
}

.image {
  border-radius: 40px;
  overflow: hidden;
  height: 100px;
}
</style>