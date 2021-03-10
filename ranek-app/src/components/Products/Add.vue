<template>
  <form class="product-add">
    <label for="name">Nome</label>
    <input type="text" name="name" id="name" v-model="product.nome" />
    <label for="price">Preço R$</label>
    <input type="number" name="price" id="price" v-model="product.preco" />
    <label for="photos">Fotos</label>
    <input type="file" name="photos" id="photos" ref="photos" />
    <label for="description">Descrição</label>
    <textarea name="description" id="description" v-model="product.descricao" />
    <input type="button" class="button" value="Adicionar produto" @click.prevent="addProduct" />
  </form>
</template>

<script>
import { api } from "@/services.js";
export default {
  name: "AddProducts",
  data() {
    return {
      product: {
        nome: "",
        preco: "",
        descricao: "",
        fotos: null,
        vendido: "false"
      }
    };
  },
  methods: {
    formatProduct() {
      this.product.usuario_id = this.$store.state.user.id;
    },
    addProduct() {
      this.formatProduct();
      api.post("/produto", this.product).then(() => {
        this.$store.dispatch("getUserProducts");
      });
    }
  }
};
</script>

<style scoped>
.product-add {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 40px;
}

.button {
  grid-column: 2;
}
</style>