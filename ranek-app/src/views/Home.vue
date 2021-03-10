<template>
  <section class="home">
    <h1>👍 Compre ou Venda 👎</h1>
    <Search />
    <List />
  </section>
</template>

<script>
import List from "@/components/Products/List.vue";
import Search from "@/components/Products/Search.vue";

export default {
  name: "Home",
  components: {
    List,
    Search
  }
};
</script>

<style scoped>
h1 {
  color: #87f;
  margin-top: 40px;
  font-size: 2rem;
  text-align: center;
}
</style>
