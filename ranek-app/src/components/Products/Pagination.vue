<template>
  <ul v-if="productsTotal > 1">
    <li v-for="pagination in pagination" :key="pagination">
      <router-link :to="{query: query(pagination)}">{{pagination}}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ProductsPagination",
  props: {
    productsTotal: {
      type: Number,
      default: 1
    },
    productsPagination: {
      type: Number,
      default: 1
    }
  },
  computed: {
    totalPagination() {
      const total = this.productsTotal / this.productsPagination;
      return total !== Infinity ? Math.ceil(total) : 0;
    },
    pagination() {
      const current = Number(this.$route.query._page);
      const range = 6;
      const offset = Math.ceil(range / 2);
      const total = this.totalPagination;
      const paginationArray = [];

      for (let i = 1; i <= total; i++) {
        paginationArray.push(i);
      }

      paginationArray.splice(0, current - offset);
      paginationArray.splice(range, total);

      return paginationArray;
    }
  },
  methods: {
    query(pagination) {
      return {
        ...this.$route.query,
        _page: pagination
      };
    }
  }
};
</script>

<style scoped>
ul {
  grid-column: 1 / -1;
}
li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a.router-link-exact-active,
li a:hover {
  background: #87f;
  color: #ffffff;
}
</style>