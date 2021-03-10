<template>
  <div id="app">
    <Header />
    <main id="main">
      <transition mode="out-in">
        <router-view />
      </transition>
    </main>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer
  }
};
</script>
>

<style>
/* reset */
*,
*::after {
  box-sizing: border-box;
}

body,
ul,
li,
p,
h1,
h2 {
  margin: 0px;
  padding: 0px;
}

ul {
  list-style: none;
}
/* end reset */

body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #345;
  background: url("./assets/pattern.svg") repeat top;
}

a {
  color: #345;
  text-decoration: none;
}

img {
  max-width: 100%;
  display: block;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
#main {
  flex: 1;
}

.button {
  display: block;
  padding: 10px 30px;
  border-radius: 4px;
  background: #87f;
  color: #ffffff;
  text-align: center;
  font-size: 1rem;
  transition: all 0.3s;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.button:hover {
  background: #65d;
  transform: scale(1.1);
}

label {
  margin-bottom: 5px;
}

input,
textarea {
  border-radius: 4px;
  border: 1px solid #ffffff;
  padding: 15px;
  box-shadow: 0px 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  font-size: 1rem;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-bottom: 15px;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  outline: none;
  border-color: #87f;
  box-shadow: 0px 6px 12px rgba(30, 60, 90, 0.2);
}

.v-enter {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.3s;
}
</style>
